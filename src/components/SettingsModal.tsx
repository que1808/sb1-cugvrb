import React, { useState } from 'react';
import { X, Moon, Sun, Bell, Layout } from 'lucide-react';
import { UserPreferences } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSave,
}) => {
  const [settings, setSettings] = useState(preferences);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-6">Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {settings.theme === 'dark' ? (
                    <Moon size={20} className="text-gray-600" />
                  ) : (
                    <Sun size={20} className="text-gray-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700">Theme</span>
                </div>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings({ ...settings, theme: e.target.value as 'light' | 'dark' | 'system' })}
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
                  value={settings.defaultView}
                  onChange={(e) => setSettings({ ...settings, defaultView: e.target.value as 'grid' | 'list' })}
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
                    checked={settings.notifications}
                    onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </label>
            </div>

            {settings.notifications && (
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Reminder Time</span>
                  <input
                    type="time"
                    value={settings.reminderTime || '09:00'}
                    onChange={(e) => setSettings({ ...settings, reminderTime: e.target.value })}
                    className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;