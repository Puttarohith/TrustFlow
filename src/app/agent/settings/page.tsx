import { Settings, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 h-full overflow-y-auto bg-background">
      <h1 className="text-2xl font-bold text-white mb-6">Agent Settings</h1>
      
      <div className="max-w-2xl bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Routing Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="rounded border-border bg-background text-primary focus:ring-primary" />
            <span className="text-text-secondary">Auto-assign high urgency tickets to me</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="rounded border-border bg-background text-primary focus:ring-primary" />
            <span className="text-text-secondary">Play sound on new escalation</span>
          </label>
        </div>
        
        <button className="mt-8 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded font-medium flex items-center gap-2 transition-colors">
          <Save className="w-4 h-4" /> Save Preferences
        </button>
      </div>
    </div>
  );
}
