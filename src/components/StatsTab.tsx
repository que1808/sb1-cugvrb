import React from 'react';
import { Trophy, TrendingUp, Calendar, Clock } from 'lucide-react';
import Chart from './Chart';

interface StatsTabProps {
  trackers: any[];
  moodEntries: any[];
}

const StatsTab: React.FC<StatsTabProps> = ({ trackers, moodEntries }) => {
  const stats = {
    totalActivities: trackers.reduce((sum, tracker) => sum + tracker.count, 0),
    activeTrackers: trackers.filter(tracker => tracker.count > 0).length,
    averagePerTracker: trackers.reduce((sum, tracker) => sum + tracker.count, 0) / trackers.length || 0,
    positiveProgress: trackers.filter(tracker => tracker.trend > 0).length
  };

  const chartData = {
    data: trackers.map(tracker => tracker.count),
    labels: trackers.map(tracker => tracker.name)
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5" />
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
          <div className="text-2xl font-bold">{stats.averagePerTracker.toFixed(1)}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm opacity-90">Positive Trends</span>
          </div>
          <div className="text-2xl font-bold">{stats.positiveProgress}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Activity Distribution</h3>
        <Chart
          data={chartData.data}
          labels={chartData.labels}
          period="overall"
          animate={true}
          unit="activities"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tracker Details</h3>
        {trackers.map(tracker => (
          <div
            key={tracker.id}
            className="bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
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
  );
};

export default StatsTab;