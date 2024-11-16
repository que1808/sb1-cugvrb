import React from 'react';
import { Heart } from 'lucide-react';

interface QuickMoodPanelProps {
  onMoodSelect: (mood: any) => void;
}

const QUICK_MOODS = [
  { id: 'happy', emoji: '😊', name: 'Happy', valence: 'positive', intensity: 5, shortcut: 'H' },
  { id: 'sad', emoji: '😢', name: 'Sad', valence: 'negative', intensity: -4, shortcut: 'S' },
  { id: 'relaxed', emoji: '😌', name: 'Relaxed', valence: 'positive', intensity: 3, shortcut: 'R' },
  { id: 'stressed', emoji: '😓', name: 'Stressed', valence: 'negative', intensity: -3, shortcut: 'T' },
];

const QuickMoodPanel: React.FC<QuickMoodPanelProps> = ({ onMoodSelect }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="bg-white rounded-2xl shadow-lg p-4 border border-purple-100">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">Quick Mood</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_MOODS.map(mood => (
            <button
              key={mood.id}
              onClick={() => onMoodSelect(mood)}
              className="group flex flex-col items-center p-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <span className="text-2xl mb-1 transform group-hover:scale-110 transition-transform">
                {mood.emoji}
              </span>
              <span className="text-xs text-gray-600">{mood.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickMoodPanel;