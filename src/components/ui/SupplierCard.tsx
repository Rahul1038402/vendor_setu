import React from 'react';
import { MapPin, Store, Shield as ShieldIcon, Star as StarIcon } from 'lucide-react';
import type { SupplierCardProps } from '../../types';

export const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => (
  <div className="bg-gradient-to-br from-green-100 via-green-50 to-green-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
        <Store className="w-6 h-6 text-green-600" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-lg text-gray-800">{supplier.name}</h4>
          {supplier.verified && (
            <ShieldIcon className="w-4 h-4 text-green-600" aria-label="Verified Supplier">
              <title>Verified Supplier</title>
            </ShieldIcon>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <MapPin className="w-4 h-4" />
          <span>{supplier.location}</span>
          <span>•</span>
          <span>{supplier.distance} km</span>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between border-t border-gray-200 pt-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-yellow-500">
          <StarIcon className="w-4 h-4 fill-yellow-400" />
          <span className="text-sm font-medium text-gray-800">{supplier.rating}</span>
        </div>

        <div className="text-sm text-gray-600">{supplier.orders} orders</div>
      </div>

      <button className="text-sm font-medium text-green-700 hover:underline">
        View Products
      </button>
    </div>
  </div>
);
