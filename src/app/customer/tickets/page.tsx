'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, CreditCard, Shield, Wrench, MessageCircle, Star } from 'lucide-react';

const MOCK_TICKETS = [
  {
    id: '1',
    subject: 'Where is my order? #4521',
    status: 'In Progress',
    intent: 'Orders',
    urgency: 'High',
    lastMessage: "I am escalating this immediately to a human Billing Specialist...",
    timeAgo: '10m ago',
    rating: null
  },
  {
    id: '2',
    subject: 'Return request for order #4510',
    status: 'Resolved',
    intent: 'Orders',
    urgency: 'Medium',
    lastMessage: "Your return label has been generated and sent to your email.",
    timeAgo: '2d ago',
    rating: 5
  },
  {
    id: '3',
    subject: 'Payment failed on checkout',
    status: 'Resolved',
    intent: 'Billing',
    urgency: 'Low',
    lastMessage: "The issue with the payment gateway has been resolved.",
    timeAgo: '5d ago',
    rating: 4
  }
];

export default function CustomerTicketsPage() {
  const [filter, setFilter] = useState('All');

  const filteredTickets = MOCK_TICKETS.filter(ticket => 
    filter === 'All' ? true : ticket.status === filter
  );

  const getIntentIcon = (intent: string) => {
    switch(intent) {
      case 'Orders': return <Box className="w-4 h-4" />;
      case 'Billing': return <CreditCard className="w-4 h-4" />;
      case 'Technical': return <Wrench className="w-4 h-4" />;
      case 'Account': return <Shield className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'Critical': return 'border-l-status-danger';
      case 'High': return 'border-l-urgency-high';
      case 'Medium': return 'border-l-urgency-medium';
      default: return 'border-l-urgency-low';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return 'bg-status-info/10 text-status-info border-status-info/20';
      case 'In Progress': return 'bg-primary/10 text-primary border-primary/20';
      case 'Resolved': return 'bg-status-success/10 text-status-success border-status-success/20';
      default: return 'bg-surfaceLight text-text-secondary border-border';
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-8 border-b border-border bg-surface/30">
        <h1 className="text-3xl font-bold text-white mb-6">My Support Tickets</h1>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 bg-surface p-1 rounded-lg w-max border border-border">
          {['All', 'Open', 'In Progress', 'Resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === tab 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="flex-grow p-8 overflow-y-auto">
        {filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-surface border-2 border-dashed border-border flex items-center justify-center text-4xl">
              🎫
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No tickets yet</h3>
            <p className="text-text-secondary mb-6 max-w-md">
              Having an issue with an order or your account? Start a chat with our AI agent and we'll help you right away!
            </p>
            <Link 
              href="/customer/chat"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg"
            >
              Start Chat
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {filteredTickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className={`glass-card p-6 rounded-xl border-l-4 flex flex-col h-full ${getUrgencyColor(ticket.urgency)}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white line-clamp-1 flex-grow pr-4">{ticket.subject}</h3>
                  <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded border flex-shrink-0 ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold bg-surface border border-border px-2 py-1 rounded text-text-secondary">
                    {getIntentIcon(ticket.intent)} {ticket.intent}
                  </span>
                  <span className="text-xs text-text-secondary">
                    • {ticket.timeAgo}
                  </span>
                </div>

                <div className="bg-surface/50 rounded-lg p-3 border border-border mb-6 flex-grow">
                  <p className="text-sm text-text-secondary line-clamp-2 italic">
                    "{ticket.lastMessage}"
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  {ticket.rating ? (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < ticket.rating! ? 'fill-yellow-500 text-yellow-500' : 'fill-surface text-border'}`} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-text-secondary">In Progress...</div>
                  )}
                  
                  <Link 
                    href="/customer/chat"
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                  >
                    {ticket.status === 'Resolved' ? 'View Transcript' : 'Continue Chat'} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
