import React from 'react';
import { CheckCircle, AlertCircle, Shield as ShieldIcon } from 'lucide-react';
import type { KYCStatusProps } from '../../types';

export const KYCStatus: React.FC<KYCStatusProps> = ({ isVerified, userType }) => (
  <div className={`p-4 mx-4 mt-4 rounded-lg ${isVerified ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
    <div className="flex items-center space-x-3">
      {isVerified ? <CheckCircle className="w-6 h-6 text-green-600" /> : <AlertCircle className="w-6 h-6 text-yellow-600" />}
      <div className="flex-1">
        <div className="font-medium">{isVerified ? 'Verified Account' : 'Complete Your KYC'}</div>
        <div className="text-sm text-gray-600">{isVerified ? `You have the verified ${userType} badge.` : 'Upload documents to unlock all features.'}</div>
      </div>
      {isVerified && <ShieldIcon className="w-6 h-6 text-green-600" />}
    </div>
  </div>
);