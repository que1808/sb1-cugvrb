import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Plus, Clock, AlertTriangle, Trash2 } from 'lucide-react';
import { UserPreferences } from '../types';
import useRoutineStore from '../store/routineStore';

interface RoutineTabProps {
  preferences: UserPreferences;
}

const RoutineTab: React.FC<RoutineTabProps> = ({ preferences }) => {
  const { tasks, addTask, toggleTask, deleteTask } = useRoutineStore();
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedTime, setSelectedTime] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    addTask({
      name: newTaskName.trim(),
      completed: false,
      timeOfDay: selectedTime
    });

    setNewTaskName('');
  };

  const filterTasks = (timeOfDay: 'morning' | 'afternoon' | 'evening') =>
    tasks.filter(task => task.timeOfDay === timeOfDay);

  const getCompletionStatus = (timeOfDay: 'morning' | 'afternoon' | 'evening') => {
    const filteredTasks = filterTasks(timeOfDay);
    const completedTasks = filteredTasks.filter(task => task.completed);
    return {
      total: filteredTasks.length,
      completed: completedTasks.length,
      percentage: filteredTasks.length > 0
        ? (completedTasks.length / filteredTasks.length) * 100
        : 0
    };
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <form onSubmit={handleAddTask} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
          <button
            type="submit"
            disabled={!newTaskName.trim()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {(['morning', 'afternoon', 'evening'] as const).map(timeOfDay => {
          const status = getCompletionStatus(timeOfDay);
          const timeOfDayTasks = filterTasks(timeOfDay);

          return (
            <motion.div
              key={timeOfDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="mb-8 bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold capitalize">{timeOfDay} Routine</h2>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {status.completed}/{status.total} completed
                  </span>
                </div>
              </div>

              <motion.div
                className="h-2 bg-gray-200 rounded-full mb-4 overflow-hidden"
                initial={false}
              >
                <motion.div
                  className="h-full bg-purple-500 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: status.percentage / 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.div>

              <AnimatePresence mode="popLayout">
                {timeOfDayTasks.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 text-gray-500"
                  >
                    No tasks added for {timeOfDay}
                  </motion.div>
                ) : (
                  <motion.div className="space-y-2">
                    {timeOfDayTasks.map(task => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          task.completed ? 'bg-purple-50' : 'bg-gray-50'
                        } hover:shadow-md transition-all duration-200`}
                      >
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleTask(task.id)}
                            className={`transition-colors ${
                              task.completed ? 'text-purple-500' : 'text-gray-400'
                            }`}
                          >
                            {task.completed ? (
                              <CheckCircle size={20} />
                            ) : (
                              <Circle size={20} />
                            )}
                          </motion.button>
                          <span className={task.completed ? 'line-through text-gray-500' : ''}>
                            {task.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {preferences.routinePreferences?.transitionAlerts && !task.completed && (
                            <AlertTriangle size={16} className="text-yellow-500" />
                          )}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteTask(task.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default RoutineTab;