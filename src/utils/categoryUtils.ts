import { Ionicons } from '@expo/vector-icons';
import { CategoryType } from '~/src/types/transaction';

// Enhanced category configuration with colors and better organization
export const CATEGORY_CONFIG = {
  food: { 
    label: 'Food & Dining', 
    icon: 'restaurant-outline' as keyof typeof Ionicons.glyphMap,
    color: '#FF6B6B',
    description: 'Meals, groceries, restaurants'
  },
  transport: { 
    label: 'Transport', 
    icon: 'car-outline' as keyof typeof Ionicons.glyphMap,
    color: '#4ECDC4',
    description: 'Fuel, public transport, parking'
  },
  bills: { 
    label: 'Bills & Utilities', 
    icon: 'receipt-outline' as keyof typeof Ionicons.glyphMap,
    color: '#45B7D1',
    description: 'Electricity, water, internet, phone'
  },
  shopping: { 
    label: 'Shopping', 
    icon: 'bag-outline' as keyof typeof Ionicons.glyphMap,
    color: '#96CEB4',
    description: 'Clothes, electronics, general shopping'
  },
  entertainment: { 
    label: 'Entertainment', 
    icon: 'game-controller-outline' as keyof typeof Ionicons.glyphMap,
    color: '#FECA57',
    description: 'Movies, games, events, subscriptions'
  },
  housing: { 
    label: 'Housing', 
    icon: 'home-outline' as keyof typeof Ionicons.glyphMap,
    color: '#FF9FF3',
    description: 'Rent, mortgage, maintenance'
  },
  health: { 
    label: 'Health', 
    icon: 'medical-outline' as keyof typeof Ionicons.glyphMap,
    color: '#54A0FF',
    description: 'Medical, pharmacy, insurance'
  },
  other: { 
    label: 'Other', 
    icon: 'ellipsis-horizontal-outline' as keyof typeof Ionicons.glyphMap,
    color: '#5F27CD',
    description: 'Miscellaneous expenses'
  },
};

// Icon mapping function with fallback
export const getCategoryIcon = (categoryKey: string): keyof typeof Ionicons.glyphMap => {
  const category = CATEGORY_CONFIG[categoryKey as CategoryType];
  return category?.icon || 'help-outline';
};

// Get category color
export const getCategoryColor = (categoryKey: string): string => {
  const category = CATEGORY_CONFIG[categoryKey as CategoryType];
  return category?.color || '#666';
};

// Get category label
export const getCategoryLabel = (categoryKey: string): string => {
  const category = CATEGORY_CONFIG[categoryKey as CategoryType];
  return category?.label || 'Unknown';
};

// Get all categories as array
export const getAllCategories = () => {
  return Object.entries(CATEGORY_CONFIG).map(([key, config]) => ({
    key: key as CategoryType,
    ...config
  }));
};

// Validate category
export const isValidCategory = (category: string): category is CategoryType => {
  return Object.keys(CATEGORY_CONFIG).includes(category);
};

// Default category for expenses
export const DEFAULT_EXPENSE_CATEGORY: CategoryType = 'other';

// Category groups for better organization
export const CATEGORY_GROUPS = {
  essential: ['food', 'transport', 'bills', 'housing', 'health'],
  lifestyle: ['shopping', 'entertainment'],
  other: ['other']
} as const;