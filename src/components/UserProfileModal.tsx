import React, { useState } from 'react';
import { X, Camera, Mail, Key } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-semibold text-blue-500 mb-2">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600">{email}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex">
              <div className="flex-grow relative">
                <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <button className="flex items-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Key size={16} className="text-gray-500" />
              <span>Change Password</span>
            </button>
          </div>

          <div className="pt-4">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;