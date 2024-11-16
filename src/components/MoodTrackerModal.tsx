import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import MoodStats from './MoodStats';
import MoodGrid from './MoodGrid';
import RecentMoods from './RecentMoods';
import MoodShortcutGuide from './MoodShortcutGuide';

interface MoodTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  moodEntries: any[];
  onMoodSelect: (mood: any) => void;
}

const MOOD_CATEGORIES = [
  {
    name: "Primary Emotions",
    moods: [
      { id: 'happy', emoji: '😊', name: 'Happy', valence: 'positive', intensity: 5, shortcut: 'H' },
      { id: 'sad', emoji: '😢', name: 'Sad', valence: 'negative', intensity: -4, shortcut: 'S' },
      { id: 'angry', emoji: '😠', name: 'Angry', valence: 'negative', intensity: -3, shortcut: 'A' },
      { id: 'excited', emoji: '🤩', name: 'Excited', valence: 'positive', intensity: 5, shortcut: 'E' },
      { id: 'relaxed', emoji: '😌', name: 'Relaxed', valence: 'positive', intensity: 3, shortcut: 'R' }
    ]
  },
  {
    name: "Complex Emotions",
    moods: [
      { id: 'stressed', emoji: '😓', name: 'Stressed', valence: 'negative', intensity: -3, shortcut: 'T' },
      { id: 'anxious', emoji: '😰', name: 'Anxious', valence: 'negative', intensity: -4, shortcut: 'X' },
      { id: 'grateful', emoji: '🥰', name: 'Grateful', valence: 'positive', intensity: 4, shortcut: 'G' },
      { id: 'proud', emoji: '😎', name: 'Proud', valence: 'positive', intensity: 4, shortcut: 'P' },
      { id: 'peaceful', emoji: '🧘', name: 'Peaceful', valence: 'positive', intensity: 3, shortcut: 'L' }
    ]
  }
];

const shortcuts = MOOD_CATEGORIES.flatMap(category => 
  category.moods.map(mood => ({
    key: mood.shortcut,
    mood: mood.name,
    emoji: mood.emoji
  }))
);

const MoodTrackerModal: React.FC<MoodTrackerModalProps> = ({ 
  isOpen, 
  onClose, 
  moodEntries,
  onMoodSelect 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      const key = e.key.toUpperCase();
      const allMoods = MOOD_CATEGORIES.flatMap(category => category.moods);
      const mood = allMoods.find(m => m.shortcut === key);
      
      if (mood) {
        onMoodSelect(mood);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [isOpen, onMoodSelect]);

  if (!isOpen) return null;

  const getMoodStats = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const todayMoods = moodEntries.filter(entry => entry.timestamp >= today);
    const averageIntensity = todayMoods.reduce((sum, entry) => sum + entry.intensity, 0) / (todayMoods.length || 1);
    const dominantMood = todayMoods.length > 0 
      ? todayMoods.reduce((prev, current) => 
          prev.timestamp > current.timestamp ? prev : current
        )
      : null;

    return { todayMoods, averageIntensity, dominantMood };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Mood Tracker</h2>
        </div>

        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full animate-gradient"
                style={{
                  animation: 'gradientMove 1.5s infinite linear'
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <MoodStats stats={getMoodStats()} />
            <MoodGrid categories={MOOD_CATEGORIES} onMoodSelect={onMoodSelect} />
            <RecentMoods entries={moodEntries} />
            <MoodShortcutGuide shortcuts={shortcuts} />
          </>
        )}
      </div>
    </div>
  );
};

export default MoodTrackerModal;