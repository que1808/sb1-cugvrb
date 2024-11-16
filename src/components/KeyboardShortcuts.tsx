import React, { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onTabChange: (tab: string) => void;
  onMoodSelect?: (mood: any) => void;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ onTabChange, onMoodSelect }) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if no input/textarea is focused
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'h':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onTabChange('home');
          }
          break;
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onTabChange('stats');
          }
          break;
        case 'm':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onTabChange('mood');
          }
          break;
        case ',':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onTabChange('settings');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onTabChange]);

  return null;
};

export default KeyboardShortcuts;