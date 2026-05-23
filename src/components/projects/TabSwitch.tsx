import { motion } from 'framer-motion';

interface TabSwitchProps {
  tabs: { id: string; name: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabSwitch = ({ tabs, activeTab, onTabChange }: TabSwitchProps) => {
  return (
    <div className="mb-8 flex justify-center">
      <div className="inline-flex gap-2 rounded-full border border-[color:var(--border-primary)] bg-[color:var(--bg-secondary)] p-1.5 shadow-soft-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-smooth ${
              activeTab === tab.id
                ? 'bg-accent-primary text-foreground-inverse shadow-soft-sm'
                : 'bg-transparent text-foreground-muted hover:bg-[color:var(--bg-elevated)] hover:text-foreground-primary dark:text-foreground-subtle dark:hover:text-foreground-inverse'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSwitch;
