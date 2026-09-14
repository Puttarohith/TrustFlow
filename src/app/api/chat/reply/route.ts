import { NextResponse } from 'next/server';
import { callAI } from '@/lib/ai';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { message, ticketId, customerId, agentType } = await req.json();

    if (!message || !ticketId || !customerId || !agentType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Fetch Mock Context (In a real app, this would be a complex Supabase query)
    const context = {
      name: "Sarah Jenkins",
      tier: "Platinum",
      lifetime_value: 2400.00,
      orders_json: JSON.stringify([
        { order_number: "#4521", status: "delayed", items: ["iPhone 15 Pro"], amount: 999.00 }
      ]),
      kb_articles: "Standard shipping takes 3-5 days. Returns accepted within 30 days.",
      history: "Customer: Where is my order?"
    };

    // 2. Select Agent Persona
    let systemPrompt = "";
    switch(agentType) {
      case 'orders_agent':
        systemPrompt = `You are TrustFlow's Orders Specialist — friendly, proactive, and logistics-focused. You have access to the customer's real order history below. Always reference specific order numbers, dates, and statuses in your replies. Never give generic answers. If an order is delayed, acknowledge it specifically and offer concrete solutions (refund, replacement, or priority reship). Keep responses under 150 words. Be warm and solution-focused.
        
Customer: ${context.name}, Tier: ${context.tier}, Lifetime Value: $${context.lifetime_value}
Orders: ${context.orders_json}
Relevant Policies: ${context.kb_articles}
Conversation History: ${context.history}`;
        break;
      // ... Add others (Billing, Tech, Account)
      default:
        systemPrompt = "You are a helpful TrustFlow support assistant.";
    }

    // 3. Generate Reply
    const aiReply = await callAI(systemPrompt, message);

    // 4. Save to DB
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('mock.supabase')) {
      await supabase.from('messages').insert({
        ticket_id: ticketId,
        sender_type: 'ai',
        agent_type: agentType,
        content: aiReply
      });
    }

    // 5. Check Escalation Trigger (Mock condition for demo)
    const isEscalationTriggered = message.toLowerCase().includes('unacceptable') || message.toLowerCase().includes('cancel my account');

    if (isEscalationTriggered) {
      // Trigger escalation logic
      const escalationPrompt = "Generate an escalation briefing JSON: {customer_summary, issue_summary, what_ai_tried, recommended_approach, urgency_reason}";
      const briefingRes = await callAI(escalationPrompt, message, 0.2);
      
      let briefing;
      try {
        const cleaned = briefingRes.replace(/```json/g, '').replace(/```/g, '').trim();
        briefing = JSON.parse(cleaned);
      } catch(e) {
        briefing = { customer_summary: "High risk customer." };
      }

      if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('mock.supabase')) {
        await supabase.from('escalations').insert({
          ticket_id: ticketId,
          reason: "Customer triggered hard escalation keywords.",
          trigger_type: "keyword",
          ...briefing
        });

        await supabase.from('tickets').update({ status: 'escalated' }).eq('id', ticketId);
      }

      return NextResponse.json({ reply: aiReply, escalated: true, briefing });
    }

    return NextResponse.json({ reply: aiReply, escalated: false });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
