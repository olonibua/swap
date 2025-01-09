// types.ts

export interface Product {
  id: number;
  name: string;
  code: string;
  price: string;
  rating: number;
  reviews: number;
  category: Category;
  condition: ProductCondition;
  colors: string[];
  image: string;
}

export type Category =
  | "iphones"
  | "laptops"
  | "tablets"
  | "monitor"
  | "accessories"
  | "all";

export type ProductCondition =
  | "New"
  | "Like new"
  | "Excellent"
  | "Good"
  | "Fair";

export interface CategoryOption {
  id: Category;
  name: string;
}


// types/product.ts



export interface Items {
  $id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  category: string;
  condition: string;
  colors: string;
  stock: number;
  images: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  rating: number;
  category: string; // Since you're using a single category, not an array
  condition: string; // Since you're using a single condition, not an array
  colors: string;
  stock: number;
  images: string;
}

// export type ProductFormData = Omit<Items, '$id' | 'createdAt' | 'updatedAt'>;

export interface ProductStats {
  totalProducts: number;
  lowStock: number;
  outOfStock: number;
  totalValue: number;
}