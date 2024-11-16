import React from 'react';
import { motion } from 'framer-motion';
import MoodStats from './MoodStats';
import MoodGrid from './MoodGrid';
import RecentMoods from './RecentMoods';
import MoodShortcutGuide from './MoodShortcutGuide';

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

interface MoodTabProps {
  moodEntries: any[];
  onMoodSelect: (mood: any) => void;
}

const MoodTab: React.FC<MoodTabProps> = ({ moodEntries, onMoodSelect }) => {
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

  const shortcuts = MOOD_CATEGORIES.flatMap(category => 
    category.moods.map(mood => ({
      key: mood.shortcut,
      mood: mood.name,
      emoji: mood.emoji
    }))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-6"
    >
      <MoodStats stats={getMoodStats()} />
      <MoodGrid categories={MOOD_CATEGORIES} onMoodSelect={onMoodSelect} />
      <RecentMoods entries={moodEntries} />
      <MoodShortcutGuide shortcuts={shortcuts} />
    </motion.div>
  );
};

export default MoodTab;