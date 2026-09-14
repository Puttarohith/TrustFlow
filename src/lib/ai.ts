const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'mock-gemini-key';

export async function callAI(systemPrompt: string, userMessage: string, temperature = 0.7) {
  if (GEMINI_API_KEY === 'mock-gemini-key' || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.warn("Using mock AI API. Set GEMINI_API_KEY to use real API.");
    return generateMockResponse(systemPrompt, userMessage);
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [{
          parts: [{ text: userMessage }]
        }],
        generationConfig: {
          temperature: temperature,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("AI API Error:", error);
    throw error;
  }
}

// Helper to simulate AI responses if no API key is provided
function generateMockResponse(systemPrompt: string, userMessage: string) {
  if (systemPrompt.includes("classifier for an e-commerce platform")) {
    return JSON.stringify({
      intent: "orders",
      urgency: "medium",
      sentiment: "frustrated",
      urgency_score: 75,
      frustration_score: 65,
      complexity_score: 40,
      assigned_agent: "orders_agent",
      issue_label: "Order delivery delay",
      routing_reasoning: "Customer is asking about an order status and expressing frustration.",
      churn_risk: "medium"
    });
  }
  
  if (systemPrompt.includes("escalation briefing JSON")) {
    return JSON.stringify({
      customer_summary: "Sarah is a Platinum tier customer with $2,400 lifetime value.",
      issue_summary: "Order #4521 is delayed. Customer contacted support 3 times.",
      what_ai_tried: "Checked order status, offered standard apology.",
      recommended_approach: "Offer full refund + 20% voucher. Escalate to logistics.",
      urgency_reason: "High churn risk customer threatening to cancel account."
    });
  }

  return "I understand your issue. I've checked the system and I can help you with that.";
}
