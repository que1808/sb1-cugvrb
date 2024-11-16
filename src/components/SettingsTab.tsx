import React from 'react';
import { Moon, Sun, Bell, Layout } from 'lucide-react';
import { UserPreferences } from '../types';

interface SettingsTabProps {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ preferences, setPreferences }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>

        <div className="space-y-6">
          <div>
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {preferences.theme === 'dark' ? (
                  <Moon size={20} className="text-gray-600" />
                ) : (
                  <Sun size={20} className="text-gray-600" />
                )}
                <span className="text-sm font-medium text-gray-700">Theme</span>
              </div>
              <select
                value={preferences.theme}
                onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as 'light' | 'dark' | 'system' })}
                className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </label>
          </div>

          <div>
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layout size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Default View</span>
              </div>
              <select
                value={preferences.defaultView}
                onChange={(e) => setPreferences({ ...preferences, defaultView: e.target.value as 'grid' | 'list' })}
                className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="grid">Grid</option>
                <option value="list">List</option>
              </select>
            </label>
          </div>

          <div>
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </label>
          </div>

          {preferences.notifications && (
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Reminder Time</span>
                <input
                  type="time"
                  value={preferences.reminderTime || '09:00'}
                  onChange={(e) => setPreferences({ ...preferences, reminderTime: e.target.value })}
                  className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;