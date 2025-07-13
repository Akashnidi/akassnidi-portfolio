import React from 'react';

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`
            px-6 py-3 rounded-full font-semibold transition-all duration-300
            ${activeTab === tab
              ? 'bg-gray-800 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;