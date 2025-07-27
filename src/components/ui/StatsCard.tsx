import React from 'react';
import type { StatsCardProps } from '../../types';

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">{title}</p><p className="text-2xl font-bold">{value}</p></div><div className={`p-3 rounded-full ${color}`}><Icon className="w-6 h-6 text-white" /></div></div></div>
);
