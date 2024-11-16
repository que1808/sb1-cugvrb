import React, { useMemo, useState } from 'react';
import { X, Trophy, Target, Calendar, Clock, TrendingUp, Search } from 'lucide-react';
import { TrackerData } from '../types';
import Chart from './Chart';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackers: TrackerData[];
}

interface CorrelationResult {
  activityName: string;
  correlations: {
    positive: { mood: string; strength: number }[];
    negative: { mood: string; strength: number }[];
    neutral: { mood: string; strength: number }[];
  };
}

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, trackers }) => {
  const [showCorrelations, setShowCorrelations] = useState(false);

  const stats = useMemo(() => {
    const totalActivities = trackers.reduce((sum, tracker) => sum + tracker.count, 0);
    const activeTrackers = trackers.filter(tracker => tracker.count > 0).length;
    const averagePerTracker = totalActivities / (activeTrackers || 1);
    const positiveProgress = trackers.filter(tracker => tracker.trend > 0).length;

    return {
      totalActivities,
      activeTrackers,
      averagePerTracker: Math.round(averagePerTracker * 10) / 10,
      positiveProgress,
    };
  }, [trackers]);

  const chartData = useMemo(() => {
    const labels = trackers.map(tracker => tracker.name);
    const data = trackers.map(tracker => tracker.count);
    return { data, labels };
  }, [trackers]);

  // Mock correlation data (replace with actual analysis in production)
  const correlationResults = useMemo(() => {
    return trackers.map(tracker => ({
      activityName: tracker.name,
      correlations: {
        positive: [
          { mood: 'Happy', strength: 0.8 },
          { mood: 'Excited', strength: 0.7 }
        ],
        negative: [
          { mood: 'Stressed', strength: -0.6 },
          { mood: 'Anxious', strength: -0.5 }
        ],
        neutral: [
          { mood: 'Relaxed', strength: 0.2 },
          { mood: 'Peaceful', strength: 0.3 }
        ]
      }
    }));
  }, [trackers]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Trophy className="w-7 h-7 text-yellow-500" />
          Overall Statistics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="text-sm opacity-90">Total Activities</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalActivities}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm opacity-90">Active Trackers</span>
            </div>
            <div className="text-2xl font-bold">{stats.activeTrackers}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm opacity-90">Average per Tracker</span>
            </div>
            <div className="text-2xl font-bold">{stats.averagePerTracker}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm opacity-90">Positive Trends</span>
            </div>
            <div className="text-2xl font-bold">{stats.positiveProgress}</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Activity Distribution</h3>
          <Chart
            data={chartData.data}
            labels={chartData.labels}
            period="overall"
            animate={true}
            unit="activities"
          />
        </div>

        <div className="mb-8">
          <button
            onClick={() => setShowCorrelations(!showCorrelations)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors mb-4"
          >
            <Search size={20} />
            {showCorrelations ? 'Hide Correlations' : 'Show Mood Correlations'}
          </button>

          {showCorrelations && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Mood Correlations</h3>
              {correlationResults.map((result, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-medium text-lg mb-4">{result.activityName}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-green-600">Positive Correlations</h5>
                      {result.correlations.positive.map((corr, i) => (
                        <div key={i} className="flex items-center justify-between bg-green-50 p-2 rounded">
                          <span>{corr.mood}</span>
                          <span className="font-medium">{(corr.strength * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-red-600">Negative Correlations</h5>
                      {result.correlations.negative.map((corr, i) => (
                        <div key={i} className="flex items-center justify-between bg-red-50 p-2 rounded">
                          <span>{corr.mood}</span>
                          <span className="font-medium">{(Math.abs(corr.strength) * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-blue-600">Neutral Correlations</h5>
                      {result.correlations.neutral.map((corr, i) => (
                        <div key={i} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                          <span>{corr.mood}</span>
                          <span className="font-medium">{(corr.strength * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Tracker Details</h3>
          {trackers.map(tracker => (
            <div
              key={tracker.id}
              className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tracker.icon}</span>
                <div>
                  <div className="font-medium">{tracker.name}</div>
                  <div className="text-sm text-gray-600">{tracker.count} {tracker.unit}</div>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${
                tracker.trend > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                <TrendingUp size={16} />
                <span>{tracker.trend}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsModal;