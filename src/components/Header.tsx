import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-purple-600" />
          <span className="text-xl font-bold text-gray-900">{title}</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;