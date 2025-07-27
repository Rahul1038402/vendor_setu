import { useState } from 'react';

// Import types, screens, and layout components
// Note: In a real project, these would be standard imports. Here, the components
// are defined below in this same file for a self-contained example.
import { LoginScreen } from './screens/LoginScreen';
import { VendorDashboard } from './screens/VendorDashboard';
import { SupplierDashboard } from './screens/SupplierDashboard';
import { DashboardHeader } from './components/layout/DashboardHeader';
import  DashboardNavigation  from './components/layout/DashboardNavigation';
import type { CartItem, Product } from './types';

const App = () => {
  // --- STATE MANAGEMENT ---
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'vendor-dashboard', 'supplier-dashboard'
  const [currentView, setCurrentView] = useState('home');
  const [userType, setUserType] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // --- HANDLER FUNCTIONS ---

  /**
   * Adds a product to the shopping cart.
   * Prevents adding duplicate items.
   * @param {Product} product - The product to add.
   */
  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item.id === product.id);
      if (isItemInCart) {
        // Optional: Show a notification that item is already in cart
        return prevItems;
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  /**
   * Resets the application state to log the user out.
   */
  const handleLogout = () => {
    setUserType('');
    setCurrentView('home');
    setCartItems([]);
    setCurrentScreen('login');
  };

  // --- RENDER LOGIC ---

  // Show the login screen if no user is "logged in"
  if (currentScreen === 'login') {
    return (
      <LoginScreen 
        userType={userType}
        setUserType={setUserType}
        setCurrentScreen={setCurrentScreen}
      />
    );
  }

  // Show the appropriate dashboard if a user is "logged in"
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <DashboardHeader 
        userType={userType}
        cartItems={cartItems}
        onLogout={handleLogout}
        setCurrentView={setCurrentView}
      />
      
      <main className="pt-4 pb-24"> {/* Padding for header and nav */}
        {currentScreen === 'vendor-dashboard' && (
          <VendorDashboard 
            userType={userType}
            currentView={currentView}
            setCurrentView={setCurrentView}
            cartItems={cartItems}
            addToCart={addToCart}
          />
        )}
        {currentScreen === 'supplier-dashboard' && (
          <SupplierDashboard 
            userType={userType}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        )}
      </main>
      
      <DashboardNavigation 
        userType={userType as "vendor" | "supplier"}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    </div>
  );
};

export default App;