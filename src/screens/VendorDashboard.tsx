import React from 'react';
import { Search, Package, Users, ShoppingCart as CartIcon, Shield, User as UserIcon } from 'lucide-react';
import type { Product, Supplier, CartItem } from '../types';
import { KYCStatus } from '../components/ui/KYCStatus';
import { SupplierCard } from '../components/ui/SupplierCard';
import { ProductCard } from '../components/ui/ProductCard';
import { TrustScore } from '../components/ui/TrustScore';

interface VendorDashboardProps {
  userType: string;
  currentView: string;
  setCurrentView: (view: string) => void;
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ userType, currentView, setCurrentView, cartItems, addToCart }) => {
  // Sample data - in a real app, this would come from an API
  const sampleProducts: Product[] = [
    { id: 1, name: 'Fresh Tomatoes', description: 'Grade A, from Nashik', price: 40, unit: 'kg', rating: 4.5, reviews: 23 },
    { id: 2, name: 'Onions', description: 'Red onions, medium size', price: 35, unit: 'kg', rating: 4.2, reviews: 18 },
    { id: 3, name: 'Cooking Oil', description: 'Refined sunflower oil, 1L', price: 120, unit: 'L', rating: 4.7, reviews: 41 }
  ];
  const sampleSuppliers: Supplier[] = [
    { id: 1, name: 'Ram Fresh Supplies', location: 'Sector 15, Noida', distance: 2.5, rating: 4.6, orders: 150, verified: true },
    { id: 2, name: 'Gupta Farm Co.', location: 'Dadri Road, Noida', distance: 5.2, rating: 4.3, orders: 89, verified: true }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div><KYCStatus isVerified={true} userType={userType} /><div className="p-4"><h2 className="text-lg font-semibold mb-3">Quick Actions</h2><div className="grid grid-cols-2 gap-4 mb-6"><button onClick={() => setCurrentView('suppliers')} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"><Users className="w-8 h-8 text-green-600 mb-2" /><span className="text-sm font-medium text-center">Find Suppliers</span></button><button onClick={() => setCurrentView('products')} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"><Package className="w-8 h-8 text-blue-600 mb-2" /><span className="text-sm font-medium text-center">Browse Products</span></button></div><h2 className="text-lg font-semibold mb-3">Nearby Suppliers</h2><div className="space-y-3">{sampleSuppliers.slice(0, 2).map(s => <SupplierCard key={s.id} supplier={s} />)}</div></div></div>
        );
      case 'suppliers':
        return (<div className="p-4"><h2 className="text-lg font-semibold mb-4">All Suppliers</h2><div className="space-y-3">{sampleSuppliers.map(s => <SupplierCard key={s.id} supplier={s} />)}</div></div>);
      case 'products':
        const [searchQuery, setSearchQuery] = React.useState('');

        const filteredProducts = sampleProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
          <div className="p-4">
            <div className="flex space-x-2 mb-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
                ))
              ) : (
                <div className="text-center text-gray-500 py-6">No products match your search.</div>
              )}
            </div>
          </div>
        );

      case 'orders':
        return (<div className="p-4"><h2 className="text-lg font-semibold mb-4">My Orders</h2><div className="text-center py-8 bg-white rounded-lg shadow-sm"><p className="text-gray-600">No orders to display yet.</p></div></div>);
      case 'cart':
        return (
          <div className="p-4"><h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>{cartItems.length === 0 ? (<div className="text-center py-8 bg-white rounded-lg shadow-sm"><CartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-gray-600">Your cart is empty.</p></div>) : (<div className="space-y-4">{cartItems.map((item, index) => (<div key={index} className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center"><div><h4 className="font-medium">{item.name}</h4><p className="text-sm text-gray-600">₹{item.price}/{item.unit}</p></div><div className="text-right"><div className="font-semibold">₹{item.price * item.quantity}</div><div className="text-sm text-gray-600">Qty: {item.quantity}</div></div></div>))}<div className="bg-green-600 text-white p-4 rounded-lg mt-4"><div className="flex justify-between items-center mb-3"><span className="font-medium">Total:</span><span className="text-xl font-bold">₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span></div><button className="w-full bg-white text-green-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Proceed to Checkout</button></div></div>)}</div>
        );
      case 'profile':
        return (
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl">Rajesh Kumar</h3>
                  <p className="text-sm text-gray-600">Street Vendor • Greater Noida</p>
                  <div className="flex items-center space-x-1 mt-1 text-green-600">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>
            <TrustScore score={92} badges={['Verified Vendor', 'Regular Customer', '50+ Orders', 'Good Payment History']} />
          </div>);
      default:
        return <div className="p-4">Page not found</div>;
    }
  };
  return <div>{renderContent()}</div>;
};

export { VendorDashboard };