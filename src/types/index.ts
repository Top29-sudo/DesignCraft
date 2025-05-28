export interface PackageType {
  id: string;
  title: string;
  description: string;
  priceUsd: number;
  priceInr?: number;
  deliveryTime: string;
  tier: 'starter' | 'advanced' | 'premium';
  features: string[];
  popular?: boolean;
}

export interface ReviewType {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  packageId: string;
  packageTitle: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface OrderType {
  id: string;
  packageName: string;
  packageTier: 'Basic' | 'Standard' | 'Premium'; // Assuming tiers are fixed
  price: number; // Price at the time of purchase
  currency: 'USD' | 'INR'; // Currency at the time of purchase
  purchaseDate: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  features: string[];
  paymentMethod?: 'upi' | 'bank' | 'mock'; // 'mock' for previous orders
  transactionId?: string;
  paymentVerified?: boolean; // Default to false, admin/system would verify
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'billing';
}