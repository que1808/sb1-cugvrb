import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrackerData, UserPreferences, RoutineTask, SensoryInput } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeTab from './components/HomeTab';
import StatsTab from './components/StatsTab';
import SensoryTab from './components/SensoryTab';
import RoutineTab from './components/RoutineTab';
import SettingsTab from './components/SettingsTab';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import ShortcutHint from './components/ShortcutHint';
import SensoryLogToggle from './components/SensoryLogToggle';

const initialTrackers: TrackerData[] = [
  {
    id: '1',
    name: 'Sensory Overload',
    icon: '🌊',
    count: 0,
    unit: 'episodes',
    trend: 0,
    color: '#3b82f6',
    category: 'sensory'
  },
  {
    id: '2',
    name: 'Stim Sessions',
    icon: '🔄',
    count: 0,
    unit: 'minutes',
    trend: 0,
    color: '#8b5cf6',
    category: 'stim'
  },
  {
    id: '3',
    name: 'Social Interactions',
    icon: '👥',
    count: 0,
    unit: 'interactions',
    trend: 0,
    color: '#10b981',
    category: 'social'
  }
];

const initialPreferences: UserPreferences = {
  theme: 'dark',
  defaultView: 'grid',
  notifications: true,
  reminderTime: '09:00',
  sensoryPreferences: {
    lightSensitivity: true,
    noiseSensitivity: true,
    textureSensitivity: true
  },
  routinePreferences: {
    morningRoutine: [],
    eveningRoutine: [],
    transitionAlerts: true
  }
};

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [trackers, setTrackers] = useState(initialTrackers);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [routineTasks, setRoutineTasks] = useState<RoutineTask[]>([]);
  const [sensoryEntries, setSensoryEntries] = useState<SensoryInput[]>([]);
  const [isMac] = useState(() => navigator.platform.toLowerCase().includes('mac'));

  useEffect(() => {
    // Load saved data from localStorage
    const savedTrackers = localStorage.getItem('trackers');
    const savedPreferences = localStorage.getItem('preferences');
    const savedRoutineTasks = localStorage.getItem('routineTasks');
    const savedSensoryEntries = localStorage.getItem('sensoryEntries');

    if (savedTrackers) setTrackers(JSON.parse(savedTrackers));
    if (savedPreferences) setPreferences(JSON.parse(savedPreferences));
    if (savedRoutineTasks) setRoutineTasks(JSON.parse(savedRoutineTasks));
    if (savedSensoryEntries) setSensoryEntries(JSON.parse(savedSensoryEntries));
  }, []);

  useEffect(() => {
    // Save data to localStorage when it changes
    localStorage.setItem('trackers', JSON.stringify(trackers));
    localStorage.setItem('preferences', JSON.stringify(preferences));
    localStorage.setItem('routineTasks', JSON.stringify(routineTasks));
    localStorage.setItem('sensoryEntries', JSON.stringify(sensoryEntries));
  }, [trackers, preferences, routineTasks, sensoryEntries]);

  const handleSensoryInput = (input: SensoryInput) => {
    setSensoryEntries(prev => [...prev, input]);
  };

  const getTabTitle = () => {
    switch (currentTab) {
      case 'home': return 'NeuroTrack';
      case 'stats': return 'Insights';
      case 'sensory': return 'Sensory Log';
      case 'routine': return 'Daily Routine';
      case 'settings': return 'Settings';
      default: return 'NeuroTrack';
    }
  };

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'home':
        return <HomeTab trackers={trackers} setTrackers={setTrackers} />;
      case 'stats':
        return <StatsTab trackers={trackers} moodEntries={sensoryEntries} />;
      case 'sensory':
        return <SensoryTab entries={sensoryEntries} onSensoryInput={handleSensoryInput} />;
      case 'routine':
        return <RoutineTab tasks={routineTasks} onUpdate={setRoutineTasks} preferences={preferences} />;
      case 'settings':
        return <SettingsTab preferences={preferences} setPreferences={setPreferences} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${preferences.theme === 'dark' ? 'dark-theme' : 'bg-gray-50'}`}>
      <div className="pattern-overlay" />
      <div className="relative min-h-screen">
        <KeyboardShortcuts onTabChange={setCurrentTab} />
        <ShortcutHint isMac={isMac} />
        
        <Header title={getTabTitle()} />
        
        <main className="pt-16 pb-16 mobile-safe-bottom">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderCurrentTab()}
            </motion.div>
          </AnimatePresence>
        </main>

        {currentTab !== 'sensory' && (
          <SensoryLogToggle onSensoryInput={handleSensoryInput} />
        )}
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </div>
  );
}

export default App;