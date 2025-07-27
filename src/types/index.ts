export type Product = { id: number; name: string; description: string; price: number; unit: string; rating: number; reviews: number; restocked?: boolean };
export type Supplier = { id: number; name: string; location: string; distance: number; rating: number; orders: number; verified: boolean; };
export type CartItem = Product & { quantity: number; };
export type RatingCriterion = { name: string; rating?: number; };

// Component Prop Types
export type KYCStatusProps = { isVerified: boolean; userType: string; };
export type StatsCardProps = { title: string; value: string | number; icon: React.ElementType; color: string; };
export type ProductCardProps = { 
  product: Product; 
  onAddToCart?: (product: Product) => void; 
  isSupplier?: boolean; 
  onRestock?: (product: Product) => void;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: number) => void;
};
export type SupplierCardProps = { supplier: Supplier; };
export type TrustScoreProps = { score: number; badges: string[]; };
