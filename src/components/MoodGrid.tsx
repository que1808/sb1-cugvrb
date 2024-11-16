import React from 'react';

interface MoodGridProps {
  categories: any[];
  onMoodSelect: (mood: any) => void;
}

const MoodGrid: React.FC<MoodGridProps> = ({ categories, onMoodSelect }) => {
  return (
    <div className="space-y-6">
      {categories.map(category => (
        <div key={category.name} className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {category.moods.map(mood => (
              <button
                key={mood.id}
                onClick={() => onMoodSelect(mood)}
                className="group relative flex flex-col items-center p-4 rounded-lg bg-white border-2 border-transparent hover:border-purple-500 transition-all duration-200"
              >
                <span className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                  {mood.emoji}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {mood.name}
                </span>
                <span className="absolute top-1 right-1 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                  {mood.shortcut}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodGrid;