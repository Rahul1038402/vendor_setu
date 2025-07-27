import React from 'react';
import { Store, Users, Package as PackageIcon, Truck as TruckIcon, User as UserProfileIcon, BarChart3 } from 'lucide-react';
import './DashboardNavigation.css';

interface DashboardNavigationProps {
  userType: 'vendor' | 'supplier';
  currentView: string;
  setCurrentView: (view: string) => void;
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ 
  userType, 
  currentView, 
  setCurrentView 
}) => {
  const vendorNavItems = [
    { id: 'home', icon: Store, label: 'Home' },
    { id: 'suppliers', icon: Users, label: 'Suppliers' },
    { id: 'products', icon: PackageIcon, label: 'Products' },
    { id: 'orders', icon: TruckIcon, label: 'Orders' },
    { id: 'profile', icon: UserProfileIcon, label: 'Profile' }
  ];
  
  const supplierNavItems = [
    { id: 'home', icon: Store, label: 'Dashboard' },
    { id: 'products', icon: PackageIcon, label: 'Products' },
    { id: 'orders', icon: TruckIcon, label: 'Orders' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'profile', icon: UserProfileIcon, label: 'Profile' }
  ];
  
  const navItems = userType === 'vendor' ? vendorNavItems : supplierNavItems;

  return (
    <div className="dashboard-navigation-container">
      <div className="glass-container">
        {/* Glass effect layers */}
        <div className="glass-effect"></div>
        <div className="glass-tint"></div>
        <div className="glass-shine"></div>
        
        {/* Navigation content (above glass layers) */}
        <div className="nav-content">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`nav-icon-button ${currentView === item.id ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" />
              <span className="nav-tooltip">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* SVG filter for glass effect */}
      <svg style={{ display: 'none' }}>
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" result="turbulence" />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100"
              lighting-color="white" result="specLight">
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale="150" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );
};

export default DashboardNavigation;