'use client';

import Link from 'next/link';
import { AlertTriangle, Clock, ChevronRight } from 'lucide-react';
import { useTickets } from '@/hooks/use-tickets';

export default function EscalationsPage() {
  const { tickets } = useTickets();
  const escalatedTickets = tickets.filter(t => t.status === 'escalated');

  return (
    <div className="p-8 h-full overflow-y-auto bg-background">
      <h1 className="text-2xl font-bold text-white mb-6">Active Escalations</h1>
      
      <div className="space-y-4 max-w-4xl">
        {escalatedTickets.length === 0 ? (
          <div className="text-text-secondary text-sm">No active escalations.</div>
        ) : (
          escalatedTickets.map(ticket => (
            <div key={ticket.id} className="bg-status-danger/10 border border-status-danger/30 rounded-xl p-5 flex items-center justify-between hover:bg-status-danger/20 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-status-danger/20 text-status-danger rounded-lg shrink-0">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">{ticket.subject}</h3>
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded font-bold uppercase">{ticket.tier} Tier</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">Customer: {ticket.customer} • Assigned to: Human Queue</p>
                  <div className="flex items-center gap-2 text-xs text-status-danger font-medium">
                    <Clock className="w-3 h-3" /> {ticket.time} • Triggered by keyword criteria
                  </div>
                </div>
              </div>
              
              <Link href={`/agent/ticket/${ticket.id}`} className="bg-surface hover:bg-white/10 text-white px-4 py-2 rounded border border-border transition-colors font-medium text-sm flex items-center gap-2">
                View Ticket <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
