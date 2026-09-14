import Link from 'next/link';
import { AlertTriangle, Clock, ChevronRight } from 'lucide-react';

export default function EscalationsPage() {
  return (
    <div className="p-8 h-full overflow-y-auto bg-background">
      <h1 className="text-2xl font-bold text-white mb-6">Active Escalations</h1>
      
      <div className="space-y-4 max-w-4xl">
        {/* Escalation Item */}
        <div className="bg-status-danger/10 border border-status-danger/30 rounded-xl p-5 flex items-center justify-between hover:bg-status-danger/20 transition-colors">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-status-danger/20 text-status-danger rounded-lg shrink-0">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-white">Double charged on invoice #9021</h3>
                <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded font-bold uppercase">Gold Tier</span>
              </div>
              <p className="text-sm text-text-secondary mb-2">Customer: Michael Chen • Assigned to: Human Queue</p>
              <div className="flex items-center gap-2 text-xs text-status-danger font-medium">
                <Clock className="w-3 h-3" /> Escalated 15m ago • Triggered by threat keywords
              </div>
            </div>
          </div>
          
          <Link href="/agent/ticket/1" className="bg-surface hover:bg-white/10 text-white px-4 py-2 rounded border border-border transition-colors font-medium text-sm flex items-center gap-2">
            View Ticket <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
