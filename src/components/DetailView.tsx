import React, { useState, useMemo } from 'react';
import { X, Calendar, Clock, Award, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { TrackerData } from '../types';
import Chart from './Chart';

interface DetailViewProps {
  tracker: TrackerData;
  isOpen: boolean;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ tracker, isOpen, onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [animateChart, setAnimateChart] = useState(true);

  const { chartData, chartLabels } = useMemo(() => {
    const now = new Date();
    let data: number[] = [];
    let labels: string[] = [];

    switch (selectedPeriod) {
      case 'day':
        for (let i = 0; i < 24; i++) {
          data.push(Math.floor(Math.random() * tracker.count * 0.8 + tracker.count * 0.2));
          labels.push(`${i.toString().padStart(2, '0')}:00`);
        }
        break;
      case 'week':
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          data.push(Math.floor(Math.random() * tracker.count * 0.8 + tracker.count * 0.2));
          labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        }
        break;
      case 'month':
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          data.push(Math.floor(Math.random() * tracker.count * 0.8 + tracker.count * 0.2));
          labels.push(date.getDate().toString());
        }
        break;
      case 'year':
        for (let i = 11; i >= 0; i--) {
          const date = new Date(now);
          date.setMonth(date.getMonth() - i);
          data.push(Math.floor(Math.random() * tracker.count * 0.8 + tracker.count * 0.2));
          labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
        }
        break;
    }

    return { chartData: data, chartLabels: labels };
  }, [selectedPeriod, tracker.count]);

  if (!isOpen) return null;

  const periods = ['day', 'week', 'month', 'year'];
  
  const stats = [
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Today',
      value: tracker.count,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Average',
      value: Math.round(tracker.count * 1.2),
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: 'Best',
      value: Math.round(tracker.count * 1.5),
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Trend',
      value: `${tracker.trend}%`,
    },
  ];

  const handlePeriodChange = (period: string) => {
    setAnimateChart(false);
    setSelectedPeriod(period);
    setTimeout(() => setAnimateChart(true), 50);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative animate-slideIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{tracker.icon}</span>
          <h2 className="text-2xl font-bold text-gray-900">{tracker.name}</h2>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodChange(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              <div className="flex justify-center mb-2 text-blue-500">
                {stat.icon}
              </div>
              <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className="text-xl font-semibold text-gray-900">
                {stat.value} {stat.label !== 'Trend' && tracker.unit}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 hover:shadow-md transition-shadow duration-300">
          <Chart
            data={chartData}
            labels={chartLabels}
            period={selectedPeriod}
            animate={animateChart}
            unit={tracker.unit}
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <div className="flex gap-2">
              <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0 hover:bg-gray-100 rounded-lg px-3 transition-all duration-200 transform hover:scale-[1.01]"
              >
                <div className="text-gray-600">
                  {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                </div>
                <div className="font-medium text-gray-900">
                  {Math.max(0, tracker.count - i * 2)} {tracker.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;