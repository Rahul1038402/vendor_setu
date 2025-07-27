import React from 'react';
import { Store, Bell, ShoppingCart } from 'lucide-react';
import type { CartItem } from '../../types';

interface DashboardHeaderProps {
  userType: string;
  cartItems: CartItem[];
  onLogout: () => void;
  setCurrentView: (view: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userType, cartItems, onLogout, setCurrentView }) => (
  <header className="bg-green-600 text-white p-4 shadow-md sticky top-0 z-20">
    <div className="flex items-center justify-between max-w-4xl mx-auto">
      <div className="flex flex-col items-start space-y-1">
        <div className="flex items-center space-x-3">
          <Store className="sm:w-6 sm:h-6 w-12 h-12" />
          <h1 className="text-2xl">Vendor Setu</h1>
        </div>
        <p className="text-sm opacity-90 ml-9">
          {userType === 'vendor' ? 'Vendor Dashboard' : 'Supplier Dashboard'}
        </p>
      </div>


      <div className="flex items-center space-x-12">
        {/* Notifications */}
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
              3
            </span>
          </div>
          <p className="text-sm">Notifications</p>
        </div>

        {/* Cart (only for vendor) */}
        {userType === 'vendor' && (
          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setCurrentView('cart')}>
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                  {cartItems.length}
                </span>
              )}
            </div>
            <p className="text-sm">Cart</p>
          </div>
        )}

        {/* Logout */}
        <button onClick={onLogout} className="text-sm opacity-90 hover:opacity-100">
          Logout
        </button>
      </div>

    </div>
  </header>
);

export { DashboardHeader };