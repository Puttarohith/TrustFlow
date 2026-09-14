'use client';

import { useState } from 'react';
import { Settings, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-background">
      <h1 className="text-2xl font-bold text-white mb-6">Agent Settings</h1>
      
      <div className="max-w-2xl bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Routing Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-border bg-background text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
            <span className="text-text-secondary select-none">Auto-assign high urgency tickets to me</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-border bg-background text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
            <span className="text-text-secondary select-none">Play sound on new escalation</span>
          </label>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={saving || saved}
          className="mt-8 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded font-medium flex items-center gap-2 transition-colors disabled:opacity-80"
        >
          {saving ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : 
           saved ? <Check className="w-4 h-4" /> : 
           <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}
