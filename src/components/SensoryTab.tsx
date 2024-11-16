import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SensoryInput, SensoryCategory } from '../types';

const SENSORY_CATEGORIES: SensoryCategory[] = [
  {
    name: 'Visual',
    type: 'visual',
    icon: '👁️',
    description: 'Sensitivity to light, movement, or visual patterns',
    commonTriggers: ['Bright lights', 'Fluorescent lights', 'Screen time', 'Busy environments'],
    copingStrategies: ['Sunglasses', 'Dimming lights', 'Visual breaks', 'Reducing screen time']
  },
  {
    name: 'Auditory',
    type: 'auditory',
    icon: '👂',
    description: 'Sensitivity to sounds and noise levels',
    commonTriggers: ['Loud noises', 'Background noise', 'Multiple conversations', 'Sudden sounds'],
    copingStrategies: ['Noise-canceling headphones', 'Ear plugs', 'White noise', 'Quiet spaces']
  },
  {
    name: 'Tactile',
    type: 'tactile',
    icon: '🤚',
    description: 'Sensitivity to touch, textures, and physical sensations',
    commonTriggers: ['Certain fabrics', 'Light touch', 'Tags in clothing', 'Temperature changes'],
    copingStrategies: ['Comfortable clothing', 'Deep pressure', 'Weighted blanket', 'Fidget toys']
  },
  {
    name: 'Proprioceptive',
    type: 'proprioceptive',
    icon: '🫂',
    description: 'Body awareness and position in space',
    commonTriggers: ['Crowded spaces', 'Physical activity', 'Balance challenges'],
    copingStrategies: ['Deep pressure', 'Exercise', 'Weighted items', 'Compression clothing']
  }
];

interface SensoryTabProps {
  entries: SensoryInput[];
  onSensoryInput: (input: SensoryInput) => void;
}

const SensoryTab: React.FC<SensoryTabProps> = ({ entries, onSensoryInput }) => {
  const [selectedCategory, setSelectedCategory] = useState<SensoryCategory | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [trigger, setTrigger] = useState('');
  const [selectedCoping, setSelectedCoping] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    const newEntry: SensoryInput = {
      id: Date.now().toString(),
      type: selectedCategory.type,
      intensity,
      trigger: trigger || undefined,
      coping: selectedCoping.length > 0 ? selectedCoping : undefined,
      timestamp: Date.now()
    };

    onSensoryInput(newEntry);
    resetForm();
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setIntensity(5);
    setTrigger('');
    setSelectedCoping([]);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {SENSORY_CATEGORIES.map(category => (
          <button
            key={category.type}
            onClick={() => setSelectedCategory(category)}
            className={`p-4 rounded-xl transition-all duration-200 ${
              selectedCategory?.type === category.type
                ? 'bg-purple-500 text-white'
                : 'bg-white hover:bg-purple-50'
            }`}
          >
            <span className="text-3xl mb-2 block">{category.icon}</span>
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm opacity-80">{category.description}</p>
          </button>
        ))}
      </motion.div>

      {selectedCategory && (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl p-6 mb-8"
          onSubmit={handleSubmit}
        >
          <h3 className="text-lg font-semibold mb-4">Log {selectedCategory.name} Input</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intensity (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Intense</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trigger (Optional)
              </label>
              <select
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select a trigger</option>
                {selectedCategory.commonTriggers.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coping Strategies Used
              </label>
              <div className="grid grid-cols-2 gap-2">
                {selectedCategory.copingStrategies.map(strategy => (
                  <label
                    key={strategy}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCoping.includes(strategy)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCoping([...selectedCoping, strategy]);
                        } else {
                          setSelectedCoping(selectedCoping.filter(s => s !== strategy));
                        }
                      }}
                      className="rounded text-purple-500"
                    />
                    <span className="text-sm">{strategy}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Log Entry
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.form>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Entries</h3>
        {entries.slice(-5).reverse().map((entry) => {
          const category = SENSORY_CATEGORIES.find(c => c.type === entry.type);
          if (!entry.id) return null; // Skip entries without IDs
          
          return (
            <div
              key={entry.id}
              className="bg-white rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category?.icon}</span>
                <div>
                  <div className="font-medium">{category?.name}</div>
                  <div className="text-sm text-gray-600">
                    Intensity: {entry.intensity}/10
                    {entry.trigger && ` • ${entry.trigger}`}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(entry.timestamp).toLocaleTimeString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SensoryTab;