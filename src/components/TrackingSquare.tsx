import React from 'react';
import { Plus, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import { TrackerData } from '../types';

interface TrackingSquareProps {
  tracker: TrackerData;
  onIncrement: () => void;
  onDecrement: () => void;
}

const TrackingSquare: React.FC<TrackingSquareProps> = ({
  tracker,
  onIncrement,
  onDecrement
}) => {
  return (
    <div className="h-[200px] rounded-xl border-2 bg-opacity-10 backdrop-blur-sm border-purple-500/30 p-4 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)] transform hover:-translate-y-1 cursor-pointer group animate-fadeIn neon-border">
      <div className="text-center group-hover:scale-105 transition-transform duration-200">
        <span className="text-3xl mb-2 block">{tracker.icon}</span>
        <h3 className="font-semibold text-purple-200">{tracker.name}</h3>
      </div>

      <div className="text-center">
        <div 
          className="text-4xl font-bold text-purple-200 mb-1 transition-all duration-300 transform scale-100 group-hover:scale-110"
          style={{ textShadow: '0 0 10px rgba(147,51,234,0.3)' }}
        >
          {tracker.count}
        </div>
        <div className="text-sm text-purple-300">{tracker.unit}</div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        {tracker.trend > 0 ? (
          <div className="flex items-center text-green-400 animate-slideIn">
            <TrendingUp size={16} />
            <span>+{tracker.trend}%</span>
          </div>
        ) : (
          <div className="flex items-center text-red-400 animate-slideIn">
            <TrendingDown size={16} />
            <span>{tracker.trend}%</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDecrement();
          }}
          className="p-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 transition-colors hover:shadow-[0_0_10px_rgba(147,51,234,0.2)] active:transform active:scale-95"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onIncrement();
          }}
          className="p-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 transition-colors hover:shadow-[0_0_10px_rgba(147,51,234,0.2)] active:transform active:scale-95"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default TrackingSquare;