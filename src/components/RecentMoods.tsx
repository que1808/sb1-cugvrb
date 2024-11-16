import React from 'react';

interface RecentMoodsProps {
  entries: any[];
}

const RecentMoods: React.FC<RecentMoodsProps> = ({ entries }) => {
  if (entries.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Recent Moods</h3>
      <div className="space-y-2">
        {entries.slice(-5).reverse().map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transform hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{entry.emoji}</span>
              <span className="font-medium">{entry.name}</span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(entry.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMoods;