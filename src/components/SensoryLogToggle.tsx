import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X } from 'lucide-react';
import { SensoryInput } from '../types';

interface SensoryLogToggleProps {
  onSensoryInput: (input: SensoryInput) => void;
}

const quickInputs = [
  { type: 'visual', icon: '👁️', name: 'Visual', intensity: 7 },
  { type: 'auditory', icon: '👂', name: 'Auditory', intensity: 6 },
  { type: 'tactile', icon: '🤚', name: 'Touch', intensity: 5 },
  { type: 'vestibular', icon: '🌀', name: 'Movement', intensity: 4 }
];

const bubbleVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 2, opacity: 0 }
};

const SensoryLogToggle: React.FC<SensoryLogToggleProps> = ({ onSensoryInput }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeBubble, setActiveBubble] = useState<string | null>(null);

  const handleQuickInput = (input: typeof quickInputs[0]) => {
    onSensoryInput({
      id: Date.now().toString(),
      type: input.type as SensoryInput['type'],
      intensity: input.intensity,
      timestamp: Date.now()
    });

    setActiveBubble(input.type);
    setTimeout(() => setActiveBubble(null), 500);
  };

  return (
    <>
      <motion.button
        id="sensory-toggle"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-40 p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
      >
        <Activity size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-36 right-6 z-40 bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden"
          >
            <div className="p-4 w-64">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Log</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {quickInputs.map((input) => (
                  <motion.button
                    key={input.type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickInput(input)}
                    className="relative flex flex-col items-center p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <span className="text-2xl mb-1">{input.icon}</span>
                    <span className="text-sm text-gray-700">{input.name}</span>
                    <AnimatePresence>
                      {activeBubble === input.type && (
                        <motion.div
                          variants={bubbleVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 bg-purple-500 rounded-xl opacity-20"
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-purple-500 to-blue-500"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SensoryLogToggle;