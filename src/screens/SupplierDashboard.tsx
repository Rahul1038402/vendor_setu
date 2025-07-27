import React, { useState } from 'react';
import { Truck, DollarSign, Star, Plus, Store, Shield, Package, X } from 'lucide-react';
import type { Product } from '../types';
import { KYCStatus } from '../components/ui/KYCStatus';
import { StatsCard } from '../components/ui/StatsCard';
import { ProductCard } from '../components/ui/ProductCard';
import { TrustScore } from '../components/ui/TrustScore';
import { RatingSystem } from '../components/ui/RatingSystem';

interface SupplierDashboardProps {
  userType: string;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const SupplierDashboard: React.FC<SupplierDashboardProps> = ({ userType, currentView, setCurrentView }) => {
  const [myProducts, setMyProducts] = useState<Product[]>([
    { id: 1, name: 'Fresh Tomatoes', description: 'Grade A tomatoes', price: 40, unit: 'kg', rating: 4.5, reviews: 23 },
    { id: 2, name: 'Onions', description: 'Red onions, medium size', price: 35, unit: 'kg', rating: 4.2, reviews: 18 }
  ]);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'rating' | 'reviews'>>({
    name: '',
    description: '',
    price: 0,
    unit: 'kg'
  });

  const handleDeleteProduct = (productId: number) => {
    setMyProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setMyProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleRestock = (product: Product) => {
    setMyProducts(prev => prev.map(p => p.id === product.id ? { ...p, restocked: true } : p));
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.price > 0) {
      const productToAdd: Product = {
        ...newProduct,
        id: Math.max(...myProducts.map(p => p.id)) + 1,
        rating: 0,
        reviews: 0
      };
      setMyProducts(prev => [...prev, productToAdd]);
      setNewProduct({ name: '', description: '', price: 0, unit: 'kg' });
      setShowAddProductModal(false);
    }
  };

  const resetNewProduct = () => {
    setNewProduct({ name: '', description: '', price: 0, unit: 'kg' });
    setShowAddProductModal(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div>
            <KYCStatus isVerified={true} userType={userType} />
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <StatsCard title="Total Orders" value="156" icon={Truck} color="bg-blue-500" />
                <StatsCard title="Revenue" value="₹45,230" icon={DollarSign} color="bg-green-500" />
                <StatsCard title="Products" value={myProducts.length.toString()} icon={Package} color="bg-purple-500" />
                <StatsCard title="Rating" value="4.6" icon={Star} color="bg-yellow-500" />
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-2xl font text-center text-green-700 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCurrentView('products')}
                    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-6 h-6 text-green-600 mb-2" />
                    <span className="text-sm">Add Product</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('orders')}
                    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Truck className="w-6 h-6 text-blue-600 mb-2" />
                    <span className="text-sm">Manage Orders</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-green-700">My Products</h2>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {myProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                  <p className="text-gray-500 mb-4">Start by adding your first product to your inventory</p>
                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Your First Product
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myProducts.map(p =>
                    <ProductCard
                      key={p.id}
                      product={p}
                      isSupplier={true}
                      onRestock={handleRestock}
                      onEditProduct={handleEditProduct}
                      onDeleteProduct={handleDeleteProduct}
                    />
                  )}
                </div>
              )}

              <RatingSystem
                title="Rate Your Product Experience"
                criteria={[
                  { name: 'Quality', rating: 0 },
                  { name: 'Packaging', rating: 0 },
                  { name: 'Delivery', rating: 0 }
                ]}
                onRate={() => { }}
              />
            </div>

            {/* Add Product Modal */}
            {showAddProductModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Add New Product</h3>
                    <button
                      onClick={resetNewProduct}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Enter product name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Describe your product"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-20 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={newProduct.price || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <select
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="kg">Kilogram (kg)</option>
                        <option value="g">Gram (g)</option>
                        <option value="piece">Piece</option>
                        <option value="dozen">Dozen</option>
                        <option value="liter">Liter (L)</option>
                        <option value="ml">Milliliter (ml)</option>
                        <option value="box">Box</option>
                        <option value="bag">Bag</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={resetNewProduct}
                      className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddProduct}
                      disabled={!newProduct.name || !newProduct.description || newProduct.price <= 0}
                      className="flex-1 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      case 'profile':
        return (
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Store className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Ram Fresh Supplies</h3>
                  <p className="text-sm text-gray-600">Wholesale Supplier • Noida</p>
                  <div className="flex items-center space-x-1 mt-1 text-green-600">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified Supplier</span>
                  </div>
                </div>
              </div>
            </div>
            <TrustScore score={87} badges={['Verified Supplier', 'Top Rated', '100+ Orders', 'Fast Delivery']} />
          </div>
        );
      default:
        return <div className="pt-48 text-center text-6xl text-gray-400">Coming Soon..</div>;
    }
  };

  return <div>{renderContent()}</div>;
};

export { SupplierDashboard };