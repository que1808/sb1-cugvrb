import { create } from 'zustand';
import { RoutineTask } from '../types';

interface RoutineStore {
  tasks: RoutineTask[];
  addTask: (task: Omit<RoutineTask, 'id'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<RoutineTask>) => void;
}

const useRoutineStore = create<RoutineStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: `task-${Date.now()}` }]
  })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    )
  }))
}));

export default useRoutineStore;