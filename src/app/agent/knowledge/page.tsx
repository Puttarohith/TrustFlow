'use client';

import { useState } from 'react';
import { BookOpen, Search, Book } from 'lucide-react';

const ARTICLES = [
  { title: "Return Policy 2026", cat: "Policies" },
  { title: "Handling Missing Orders", cat: "SOPs" },
  { title: "Platinum Member Benefits", cat: "Loyalty" },
  { title: "Stripe Double Charge Mitigation", cat: "Billing" },
  { title: "Escalation Matrix", cat: "SOPs" }
];

export default function KnowledgeBasePage() {
  const [query, setQuery] = useState('');

  const filtered = ARTICLES.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.cat.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-8 h-full overflow-y-auto bg-background">
      <h1 className="text-2xl font-bold text-white mb-6">Knowledge Base</h1>
      <div className="relative max-w-2xl mb-8">
        <Search className="absolute left-3 top-3 h-5 w-5 text-text-secondary" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, policies, and guidelines..." 
          className="w-full bg-surface border border-border rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <Book className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-white">{article.title}</h3>
            </div>
            <span className="text-[10px] bg-white/5 text-text-secondary px-2 py-0.5 rounded uppercase tracking-wider">{article.cat}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-text-secondary col-span-3 text-center py-10">No articles found matching "{query}"</p>
        )}
      </div>
    </div>
  );
}
