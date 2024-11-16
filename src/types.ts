export interface TrackerData {
  id: string;
  name: string;
  icon: string;
  count: number;
  unit: string;
  trend: number;
  color: string;
  category: 'wellbeing' | 'social' | 'regulation' | 'sensory' | 'interests' | 'routine' | 'stim' | 'communication';
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultView: 'grid' | 'list';
  notifications: boolean;
  reminderTime?: string;
  sensoryPreferences?: {
    lightSensitivity: boolean;
    noiseSensitivity: boolean;
    textureSensitivity: boolean;
  };
  routinePreferences?: {
    morningRoutine: string[];
    eveningRoutine: string[];
    transitionAlerts: boolean;
  };
}

export interface SensoryInput {
  id: string;
  type: 'visual' | 'auditory' | 'tactile' | 'olfactory' | 'gustatory' | 'proprioceptive' | 'vestibular';
  intensity: number;
  trigger?: string;
  coping?: string[];
  timestamp: number;
  location?: string;
  duration?: number;
  impact?: 'mild' | 'moderate' | 'severe';
  notes?: string;
}

export interface SensoryCategory {
  name: string;
  type: SensoryInput['type'];
  icon: string;
  description: string;
  commonTriggers: string[];
  copingStrategies: string[];
}

export interface RoutineTask {
  id: string;
  name: string;
  completed: boolean;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  duration?: number;
  difficulty?: number;
  supports?: string[];
}

export interface StimRecord {
  id: string;
  type: string;
  duration: number;
  intensity: number;
  trigger?: string;
  setting?: string;
  timestamp: number;
}

export interface CommunicationLog {
  id: string;
  type: 'verbal' | 'nonverbal' | 'written' | 'aac';
  context: string;
  effectiveness: number;
  challenges?: string[];
  supports?: string[];
  timestamp: number;
}

export interface ExecutiveFunctionTask {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'need-help';
  steps?: string[];
  supports?: string[];
  deadline?: number;
  priority: 'low' | 'medium' | 'high';
}

export interface SpecialInterest {
  id: string;
  name: string;
  category: string;
  timeSpent: number;
  lastEngaged: number;
  activities: string[];
  resources?: string[];
}

export interface SocialInteraction {
  id: string;
  type: string;
  duration: number;
  energyLevel: number;
  setting: string;
  challenges?: string[];
  supports?: string[];
  timestamp: number;
}