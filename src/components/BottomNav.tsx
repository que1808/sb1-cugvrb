import React from 'react';
import { Home, BarChart2, Activity, Calendar, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'stats', icon: BarChart2, label: 'Insights' },
    { id: 'sensory', icon: Activity, label: 'Sensory' },
    { id: 'routine', icon: Calendar, label: 'Routine' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 px-4 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="relative flex flex-col items-center justify-center w-16 h-full"
          >
            <Icon
              size={24}
              className={currentTab === id ? 'text-purple-600' : 'text-gray-400'}
            />
            <span className="text-xs mt-1 text-gray-600">
              {label}
            </span>
            {currentTab === id && (
              <motion.div
                layoutId="bottomNav"
                className="absolute bottom-0 w-12 h-0.5 bg-purple-600"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;