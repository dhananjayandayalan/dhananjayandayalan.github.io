import { motion } from 'framer-motion';

interface TabSwitchProps {
  tabs: { id: string; name: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabSwitch = ({ tabs, activeTab, onTabChange }: TabSwitchProps) => {
  return (
    <div className='flex justify-center mb-8'>
      <div className='inline-flex bg-brutal-white dark:bg-brutal-black rounded-none p-2 gap-2 border-4 border-brutal-black dark:border-brutal-white shadow-brutal-sm dark:shadow-brutal-sm-light'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-6 py-2.5 rounded-none text-sm font-black transition-brutal ${
              activeTab === tab.id
                ? 'bg-brutal-pink border-3 border-brutal-black dark:border-brutal-white shadow-brutal-sm dark:shadow-brutal-sm-light'
                : 'text-brutal-black! dark:text-brutal-white bg-brutal-white dark:bg-brutal-black border-3 border-transparent hover:bg-brutal-cyan hover:text-brutal-black'
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
