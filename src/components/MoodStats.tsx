import React from 'react';
import { TrendingUp, Calendar, BarChart } from 'lucide-react';

interface MoodStatsProps {
  stats: {
    todayMoods: any[];
    averageIntensity: number;
    dominantMood: any;
  };
}

const MoodStats: React.FC<MoodStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5" />
          <span className="text-sm opacity-90">Today's Moods</span>
        </div>
        <div className="text-2xl font-bold">{stats.todayMoods.length}</div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm opacity-90">Average Intensity</span>
        </div>
        <div className="text-2xl font-bold">
          {stats.averageIntensity.toFixed(1)}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <BarChart className="w-5 h-5" />
          <span className="text-sm opacity-90">Current Mood</span>
        </div>
        <div className="text-2xl font-bold flex items-center gap-2">
          {stats.dominantMood ? (
            <>
              <span>{stats.dominantMood.emoji}</span>
              <span>{stats.dominantMood.name}</span>
            </>
          ) : (
            'No mood yet'
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodStats;