import { NextResponse } from 'next/server';
import { callAI } from '@/lib/ai';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { message, ticketId, customerId } = await req.json();

    if (!message || !ticketId || !customerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const systemPrompt = `You are a customer support classifier for an e-commerce platform. Analyze the customer message and return ONLY a JSON object with these exact fields: intent (orders/billing/technical/account/general), urgency (low/medium/high/critical), sentiment (positive/neutral/frustrated/angry), urgency_score (0-100), frustration_score (0-100), complexity_score (0-100), assigned_agent (orders_agent/billing_agent/technical_agent/account_agent), issue_label (short 3-5 word description of the issue), routing_reasoning (one sentence explaining why this agent was chosen), churn_risk (low/medium/high). Return raw JSON only, no markdown, no explanation.`;

    // Call AI
    const qwenResponse = await callAI(systemPrompt, message, 0.1);
    
    // Parse JSON safely
    let analysis;
    try {
      const cleaned = qwenResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      analysis = JSON.parse(cleaned);
    } catch (e) {
      console.error("Failed to parse Qwen JSON:", qwenResponse);
      return NextResponse.json({ error: 'AI returned invalid JSON' }, { status: 500 });
    }

    // Update Ticket in Supabase
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('mock.supabase')) {
      const { error: updateError } = await supabase
        .from('tickets')
        .update({
          intent: analysis.intent,
          urgency: analysis.urgency,
          sentiment: analysis.sentiment,
          urgency_score: analysis.urgency_score,
          frustration_score: analysis.frustration_score,
          complexity_score: analysis.complexity_score,
          assigned_agent: analysis.assigned_agent,
          issue_label: analysis.issue_label,
          routing_reasoning: analysis.routing_reasoning,
          churn_risk: analysis.churn_risk,
          updated_at: new Date().toISOString()
        })
        .eq('id', ticketId);

      if (updateError) {
        console.error("Supabase update error:", updateError);
        // Non-blocking for the demo
      }
    }

    return NextResponse.json(analysis);

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
