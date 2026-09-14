import Link from 'next/link';
import { Search, Database, FileText, ChevronRight } from 'lucide-react';

export default function InvestigationsPage() {
  return (
    <div className="p-8 h-full overflow-y-auto bg-background">
      <h1 className="text-2xl font-bold text-white mb-6">Automated Investigations</h1>
      <p className="text-text-secondary mb-8">AI-driven root cause analysis across telemetry, databases, and logs.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
        {/* Investigation Item */}
        <div className="bg-surface border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-md font-bold text-white">Payment Webhook Race Condition</h3>
                <p className="text-xs text-text-secondary">Related to Ticket #1</p>
              </div>
            </div>
            <span className="text-[10px] bg-status-success/20 text-status-success border border-status-success/30 px-2 py-0.5 rounded font-bold uppercase">Completed</span>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Database className="w-4 h-4 text-purple-400" /> Scanned 4,500 Stripe logs
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <FileText className="w-4 h-4 text-green-400" /> Identified HTTP 504 Gateway Timeout
            </div>
          </div>
          
          <Link href="/agent/ticket/2" className="w-full justify-center bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded transition-colors font-medium text-sm flex items-center gap-2">
            View Root Cause Report <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Investigation Item */}
        <div className="bg-surface border border-border rounded-xl p-6 opacity-60">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-500/20 text-orange-400 rounded-lg shrink-0">
                <Search className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-md font-bold text-white">Inventory Sync Failure</h3>
                <p className="text-xs text-text-secondary">System-wide check</p>
              </div>
            </div>
            <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded font-bold uppercase">Scanning...</span>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Database className="w-4 h-4 text-purple-400" /> Analyzing ERP warehouse tables...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
