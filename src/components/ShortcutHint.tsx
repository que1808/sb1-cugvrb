import React from 'react';
import { Command } from 'lucide-react';

interface ShortcutHintProps {
  isMac?: boolean;
}

const ShortcutHint: React.FC<ShortcutHintProps> = ({ isMac = false }) => {
  const cmdKey = isMac ? '⌘' : 'Ctrl';

  const shortcuts = [
    { key: 'H', description: 'Home' },
    { key: 'S', description: 'Stats' },
    { key: 'M', description: 'Mood' },
    { key: ',', description: 'Settings' }
  ];

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-purple-100">
        <div className="flex items-center gap-2 mb-3">
          <Command className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">Keyboard Shortcuts</span>
        </div>
        <div className="space-y-2">
          {shortcuts.map(({ key, description }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
                  {cmdKey}
                </kbd>
                <span>+</span>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
                  {key}
                </kbd>
              </div>
              <span className="text-sm text-gray-600">{description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortcutHint;