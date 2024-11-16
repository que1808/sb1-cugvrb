import React from 'react';
import { Keyboard } from 'lucide-react';

interface MoodShortcutGuideProps {
  shortcuts: Array<{
    key: string;
    mood: string;
    emoji: string;
  }>;
}

const MoodShortcutGuide: React.FC<MoodShortcutGuideProps> = ({ shortcuts }) => {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="bg-white rounded-2xl shadow-lg p-4 border border-purple-100">
        <div className="flex items-center gap-2 mb-3">
          <Keyboard className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">Keyboard Shortcuts</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {shortcuts.map(({ key, mood, emoji }) => (
            <div key={key} className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
                {key}
              </kbd>
              <span className="text-sm text-gray-600">
                {emoji} {mood}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodShortcutGuide;