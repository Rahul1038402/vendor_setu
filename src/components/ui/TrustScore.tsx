import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { TrustScoreProps } from '../../types';

export const TrustScore: React.FC<TrustScoreProps> = ({ score, badges }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-2xl text-green-700 mb-4">Trust Score</h3>

    <div className="text-center mb-6">
      <div className="text-5xl text-green-600">{score}</div>
      <div className="text-sm text-gray-500">out of 100</div>
    </div>

    <div className="space-y-3">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
        >
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          <span className="text-sm text-gray-700">{badge}</span>
        </div>
      ))}
    </div>
  </div>
);
