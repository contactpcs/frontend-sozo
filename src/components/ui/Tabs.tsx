'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  children: React.ReactNode[];
  defaultTab?: string;
}

export function Tabs({ tabs, children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex gap-1 border-b border-neutral-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white border border-b-white border-neutral-200 text-orange-500 -mb-px'
                : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {children[activeIndex] ?? null}
    </div>
  );
}
