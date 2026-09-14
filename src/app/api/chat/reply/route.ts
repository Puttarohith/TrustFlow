import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const msg = message.toLowerCase();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // High-Fidelity Simulation Logic based on keywords
    if (msg.includes('unacceptable') || msg.includes('human') || msg.includes('agent') || msg.includes('angry')) {
      return NextResponse.json({ 
        reply: "I understand you're frustrated. I am escalating this immediately to a human agent. They will join this chat momentarily.", 
        escalated: true,
        briefing: {
          customer_summary: "High value customer experiencing significant friction.",
          issue_summary: "Customer requested human escalation.",
          what_ai_tried: "Attempted standard routing.",
          recommended_approach: "De-escalate and resolve manually.",
          urgency_reason: "Keyword trigger: Angry/Human requested."
        }
      });
    }

    if (msg.includes('where') || msg.includes('track') || msg.includes('status')) {
      return NextResponse.json({
        reply: "I've located your order! It is currently out for delivery and should arrive at your shipping address by 8:00 PM today. Here is the live tracking timeline:",
        widget: 'order_tracking',
        escalated: false
      });
    }

    if (msg.includes('refund') || msg.includes('cancel') || msg.includes('return')) {
      return NextResponse.json({
        reply: "I can absolutely help you process a return or refund for this item. Would you prefer the refund to be issued as Store Credit (with a 10% bonus) or returned to your original payment method?",
        widget: 'refund_selector',
        escalated: false
      });
    }

    // Default intelligent response
    return NextResponse.json({
      reply: "I can certainly help you with that! As a Platinum member, your requests are automatically prioritized. Could you provide a bit more detail so I can resolve this for you immediately?",
      escalated: false
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
