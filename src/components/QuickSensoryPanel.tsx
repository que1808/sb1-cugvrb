import React from 'react';
import { Activity } from 'lucide-react';

interface QuickSensoryPanelProps {
  onSensoryInput: (input: any) => void;
}

const QUICK_INPUTS = [
  { 
    type: 'visual',
    icon: '👁️',
    name: 'Visual',
    intensity: 7,
    trigger: 'Bright lights'
  },
  {
    type: 'auditory',
    icon: '👂',
    name: 'Auditory',
    intensity: 8,
    trigger: 'Loud noises'
  },
  {
    type: 'tactile',
    icon: '🤚',
    name: 'Tactile',
    intensity: 6,
    trigger: 'Texture sensitivity'
  },
  {
    type: 'proprioceptive',
    icon: '🫂',
    name: 'Body Awareness',
    intensity: 5,
    trigger: 'Spatial awareness'
  }
];

const QuickSensoryPanel: React.FC<QuickSensoryPanelProps> = ({ onSensoryInput }) => {
  return (
    <div className="fixed bottom-20 right-6 z-40">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-purple-100">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">Quick Sensory Log</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_INPUTS.map(input => (
            <button
              key={input.type}
              onClick={() => onSensoryInput(input)}
              className="group flex flex-col items-center p-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <span className="text-2xl mb-1 transform group-hover:scale-110 transition-transform">
                {input.icon}
              </span>
              <span className="text-xs text-gray-600">{input.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickSensoryPanel;