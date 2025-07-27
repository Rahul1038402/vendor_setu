import React, { useState } from 'react';
import { Star as StarIcon, Package, X, Edit3, RotateCcw, Trash2 } from 'lucide-react';
import type { Product, ProductCardProps } from '../../types';

export const ProductCard: React.FC<ProductCardProps & { onRestock?: (product: Product) => void; onEditProduct?: (product: Product) => void; onDeleteProduct?: (productId: number) => void }> = ({ product, onAddToCart, isSupplier = false, onRestock, onEditProduct, onDeleteProduct }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [restockQuantity, setRestockQuantity] = useState(0);

  const handleDeleteConfirm = () => {
    if (onDeleteProduct) {
      onDeleteProduct(product.id);
    }
    setShowDeleteModal(false);
  };

  const handleEditSave = () => {
    // Handle edit save logic here
    console.log('Saving edited product:', editedProduct);
    if (onEditProduct) {
      onEditProduct(editedProduct);
    }
    setShowEditModal(false);
  };

  const handleRestockConfirm = () => {
    // Handle restock logic here
    console.log('Restocking product:', product.name, 'with quantity:', restockQuantity);
    if (onRestock) {
      onRestock({ ...product, restocked: true });
    }
    setShowRestockModal(false);
    setRestockQuantity(0);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{product.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              {isSupplier && product.restocked && (
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Re-stocked</span>
              )}
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="font-bold text-lg text-green-600">₹{product.price}</span>
                <span className="text-sm text-gray-500">/{product.unit}</span>
              </div>
              {!isSupplier && onAddToCart && (
                <button onClick={() => onAddToCart(product)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">Add</button>
              )}
              {isSupplier && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowEditModal(true)}
                    className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </button>
                  <button 
                    onClick={() => setShowRestockModal(true)}
                    className="bg-green-50 text-green-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Re-stock
                  </button>
                  <button 
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-100 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Product</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editedProduct.description}
                  onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <input
                  type="text"
                  value={editedProduct.unit}
                  onChange={(e) => setEditedProduct({ ...editedProduct, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {showRestockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Restock Product</h3>
              <button 
                onClick={() => setShowRestockModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-2">Product: <span className="font-medium">{product.name}</span></p>
              <p className="text-gray-600 mb-4">Current Price: <span className="font-medium text-green-600">₹{product.price}/{product.unit}</span></p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Restock Quantity</label>
              <input
                type="number"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(parseInt(e.target.value) || 0)}
                placeholder="Enter quantity to add"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                min="0"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowRestockModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRestockConfirm}
                disabled={restockQuantity <= 0}
                className="flex-1 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-600">Delete Product</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Are you sure you want to delete this product?</p>
                  <p className="text-sm text-gray-500">This action cannot be undone.</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600 mb-1">Product: <span className="font-medium text-gray-900">{product.name}</span></p>
                <p className="text-sm text-gray-600">Price: <span className="font-medium text-green-600">₹{product.price}/{product.unit}</span></p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};