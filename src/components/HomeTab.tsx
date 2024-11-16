import React from 'react';
import { Plus } from 'lucide-react';
import { TrackerData } from '../types';
import TrackingSquare from './TrackingSquare';

interface HomeTabProps {
  trackers: TrackerData[];
  setTrackers: React.Dispatch<React.SetStateAction<TrackerData[]>>;
}

const HomeTab: React.FC<HomeTabProps> = ({ trackers, setTrackers }) => {
  const handleIncrement = (id: string) => {
    setTrackers(prev =>
      prev.map(tracker =>
        tracker.id === id ? { ...tracker, count: tracker.count + 1 } : tracker
      )
    );
  };

  const handleDecrement = (id: string) => {
    setTrackers(prev =>
      prev.map(tracker =>
        tracker.id === id && tracker.count > 0
          ? { ...tracker, count: tracker.count - 1 }
          : tracker
      )
    );
  };

  const handleAddTracker = () => {
    const newTracker: TrackerData = {
      id: String(trackers.length + 1),
      name: 'New Tracker',
      icon: '📝',
      count: 0,
      unit: 'times',
      trend: 0,
      color: '#3b82f6'
    };
    setTrackers(prev => [...prev, newTracker]);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trackers.map(tracker => (
          <TrackingSquare
            key={tracker.id}
            tracker={tracker}
            onIncrement={() => handleIncrement(tracker.id)}
            onDecrement={() => handleDecrement(tracker.id)}
          />
        ))}
        
        <button
          onClick={handleAddTracker}
          className="h-[200px] bg-opacity-10 bg-white backdrop-blur-sm rounded-xl border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 transition-colors duration-200 flex flex-col items-center justify-center gap-2 text-purple-300 hover:text-purple-200 group"
        >
          <Plus size={24} className="transition-transform duration-200 group-hover:scale-110" />
          <span className="font-medium">Add New Tracker</span>
        </button>
      </div>
    </div>
  );
};

export default HomeTab;