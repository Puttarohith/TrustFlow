'use client';

import { useState, useEffect } from 'react';

export type Ticket = {
  id: string;
  customer: string;
  tier: string;
  subject: string;
  intent: string;
  sentiment: string;
  urgency: string;
  score: number;
  time: string;
  agent: string;
  status: 'open' | 'in_progress' | 'escalated' | 'resolved';
  messages: Array<{
    id: string;
    sender: 'customer' | 'ai' | 'human';
    agentType?: string;
    content: string;
    timestamp: string;
    widget?: 'order_tracking' | 'refund_selector' | 'none';
    analysis?: {
      intent: string;
      urgency: string;
      sentiment: string;
      routingReason: string;
    };
  }>;
};

const DEFAULT_TICKETS: Ticket[] = [
  { 
    id: '1', 
    customer: 'Sarah Jenkins', 
    tier: 'Platinum', 
    subject: 'Missing Order #4521', 
    intent: 'Orders', 
    sentiment: 'Frustrated', 
    urgency: 'High', 
    score: 72, 
    time: '2m ago', 
    agent: 'Orders AI', 
    status: 'escalated',
    messages: [
      {
        id: 'msg_1',
        sender: 'ai',
        agentType: 'Orders AI',
        content: 'Hello Sarah! I see you are a Platinum member. I am TrustFlow\'s Orders Specialist. How can I assist you with your purchases today?',
        timestamp: '10:00 AM'
      },
      {
        id: 'msg_track',
        sender: 'customer',
        content: 'Where is my order #9021?',
        timestamp: '10:01 AM'
      },
      {
        id: 'msg_track_ai',
        sender: 'ai',
        agentType: 'Orders AI',
        content: 'I have checked our logistics provider. Your package is currently out for delivery and should arrive today!',
        timestamp: '10:01 AM',
        widget: 'order_tracking'
      }
    ] 
  },
  { 
    id: '2', 
    customer: 'Michael Chen', 
    tier: 'Gold', 
    subject: 'Double charged on invoice', 
    intent: 'Billing', 
    sentiment: 'Angry', 
    urgency: 'Critical', 
    score: 95, 
    time: '15m ago', 
    agent: 'Billing AI', 
    status: 'open',
    messages: [
      {
        id: 'msg_2',
        sender: 'customer',
        content: 'Hello, I just checked my bank statement and I was charged twice for the Sony headphones I bought last week! This is ridiculous, please fix this immediately or I am calling my credit card company.',
        timestamp: '10:00 AM'
      },
      {
        id: 'msg_3',
        sender: 'ai',
        agentType: 'Billing AI',
        content: 'I am so sorry to hear that you were charged twice, Michael. I understand how frustrating that is. I have checked our internal ledger for order #9021, but I am only seeing a single successful capture of $348.00.\n\nSince you are seeing two charges on your bank statement, I am escalating this immediately to a human Billing Specialist to investigate the payment gateway logs. They will be with you shortly.',
        timestamp: '10:01 AM'
      },
      {
        id: 'msg_4',
        sender: 'human',
        agentType: 'Human Agent',
        content: 'Hi Michael, I have confirmed the double charge via Stripe. I am initiating a refund for the duplicate amount immediately. How would you like to receive your refund?',
        timestamp: '10:05 AM',
        widget: 'refund_selector'
      }
    ] 
  }
];

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(DEFAULT_TICKETS);

  // Load initially and listen for tab sync
  useEffect(() => {
    const loadTickets = () => {
      const stored = localStorage.getItem('trustflow_tickets');
      if (stored) {
        setTickets(JSON.parse(stored));
      } else {
        localStorage.setItem('trustflow_tickets', JSON.stringify(DEFAULT_TICKETS));
        setTickets(DEFAULT_TICKETS);
      }
    };

    loadTickets();
    window.addEventListener('storage', loadTickets);
    // Custom event for same-tab updates
    window.addEventListener('trustflow_sync', loadTickets);

    return () => {
      window.removeEventListener('storage', loadTickets);
      window.removeEventListener('trustflow_sync', loadTickets);
    };
  }, []);

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    const stored = JSON.parse(localStorage.getItem('trustflow_tickets') || '[]');
    const updated = stored.map((t: Ticket) => t.id === id ? { ...t, ...updates } : t);
    localStorage.setItem('trustflow_tickets', JSON.stringify(updated));
    window.dispatchEvent(new Event('trustflow_sync'));
  };

  const createTicket = (ticket: Omit<Ticket, 'id' | 'time'>) => {
    const stored = JSON.parse(localStorage.getItem('trustflow_tickets') || '[]');
    const newTicket = {
      ...ticket,
      id: Date.now().toString(),
      time: 'Just now'
    };
    const updated = [newTicket, ...stored];
    localStorage.setItem('trustflow_tickets', JSON.stringify(updated));
    window.dispatchEvent(new Event('trustflow_sync'));
    return newTicket.id;
  };

  return { tickets, updateTicket, createTicket };
}
