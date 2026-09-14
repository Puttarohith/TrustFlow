'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, CreditCard, Shield, Wrench, MessageCircle, Star } from 'lucide-react';
import { useTickets } from '@/hooks/use-tickets';

export default function CustomerTicketsPage() {
  const [filter, setFilter] = useState('All');
  const { tickets } = useTickets();

  // Filter to only show customer's tickets. In a real app we'd filter by customer ID.
  const myTickets = tickets.filter(t => t.customer === 'Michael Chen' || t.customer === 'Sarah Jenkins');

  const filteredTickets = myTickets.filter(ticket => {
    if (filter === 'All') return true;
    if (filter === 'Open') return ticket.status !== 'resolved';
    if (filter === 'Resolved') return ticket.status === 'resolved';
    return true;
  });

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
    switch(status.toLowerCase()) {
      case 'open': return 'bg-status-info/10 text-status-info border-status-info/20';
      case 'in progress': return 'bg-primary/10 text-primary border-primary/20';
      case 'resolved': return 'bg-status-success/10 text-status-success border-status-success/20';
      default: return 'bg-surfaceLight text-text-secondary border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">My Support Tickets</h1>
            <p className="text-sm text-text-secondary">View and manage your recent customer service requests.</p>
          </div>
          <Link href="/customer/chat" className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/20 whitespace-nowrap">
            New Support Request
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 bg-surface p-1.5 rounded-xl border border-border w-fit">
          <button 
            onClick={() => setFilter('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'All' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            All Tickets
          </button>
          <button 
            onClick={() => setFilter('Open')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'Open' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            Open & Active
          </button>
          <button 
            onClick={() => setFilter('Resolved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'Resolved' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            Resolved
          </button>
        </div>

        {/* Tickets Grid */}
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
                    • {ticket.time}
                  </span>
                </div>

                <div className="bg-surface/50 rounded-lg p-3 border border-border mb-6 flex-grow">
                  <p className="text-sm text-text-secondary line-clamp-2 italic">
                    "{ticket.messages[ticket.messages.length - 1]?.content || 'Ticket opened.'}"
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  {ticket.status === 'resolved' ? (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < 5 ? 'fill-yellow-500 text-yellow-500' : 'fill-surface text-border'}`} 
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-primary font-medium flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" /> 
                      {ticket.messages.length} messages
                    </span>
                  )}
                  
                  <Link 
                    href="/customer/chat"
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                  >
                    {ticket.status === 'resolved' ? 'View Transcript' : 'Continue Chat'} →
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
