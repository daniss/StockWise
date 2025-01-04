// src/lib/types/index.ts

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'manager';
    status: 'active' | 'inactive';
    avatar?: string;
  }
  
export interface Organization {
  id: number;
  name: string;
  contact: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
}


export interface Product {
    id: number;
    name: string;
    category: string;
}

export interface Supplier {
    id: number;
    name: string;
    email: string;
    address: string;
    status: 'active' | 'inactive';
    phone: string;
    rating: number;
}
  
export interface StockItem {
    id: number;
    product_id: Product;
    supplier_id: Supplier;
    quantity: number;
    threshold: number;
    organization_id: string;
    category: string;
}

export interface StockItemAdd {
    product_id: number;
    supplier_id: number;
    quantity: number;
    threshold: number;
    organization_id: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

export interface Order {
    id: number
    customerName: string
    date: string
    amount: number
    productSold_ids?: Product[]
    status: 'paid' | 'pending' | 'failed'
  }
