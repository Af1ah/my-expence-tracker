// utils/transactionUtils.ts
import { CategoryType, TransactionType } from "../types/transaction";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

interface CategoryConfig {
  label: string;
  icon: any;
  color: string;
}

// Country configuration for currency formatting
interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  locale: string;
  flag: string;
}

export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    locale: 'en-US',
    flag: '🇺🇸'
  },
  IN: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    locale: 'en-IN',
    flag: '🇮🇳'
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    locale: 'en-GB',
    flag: '🇬🇧'
  },
  EU: {
    code: 'EU',
    name: 'European Union',
    currency: 'EUR',
    locale: 'de-DE',
    flag: '🇪🇺'
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    locale: 'en-CA',
    flag: '🇨🇦'
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    locale: 'en-AU',
    flag: '🇦🇺'
  },
  JP: {
    code: 'JP',
    name: 'Japan',
    currency: 'JPY',
    locale: 'ja-JP',
    flag: '🇯🇵'
  },
};

// Transaction type configs
export const TRANSACTION_TYPE_CONFIG: Record<
  TransactionType,
  { color: string }
> = {
  income: {
    color: "#10B981",
  },
  expense: {
    color: "#EF4444",
  },
};

// Updated formatCurrency function with country support
export const formatCurrency = (
  amount: number,
  type?: TransactionType,
  countryCode: string = 'US'
): string => {
  const config = COUNTRY_CONFIGS[countryCode] || COUNTRY_CONFIGS['US'];
  
  const formatter = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: config.currency === 'JPY' ? 0 : 2,
  });

  if (type === "expense") {
    return `-${formatter.format(Math.abs(amount))}`;
  } else if (type === "income") {
    return `+${formatter.format(Math.abs(amount))}`;
  }

  return formatter.format(amount);
};

// Helper function to get currency symbol
export const getCurrencySymbol = (countryCode: string = 'US'): string => {
  const config = COUNTRY_CONFIGS[countryCode] || COUNTRY_CONFIGS['US'];
  
  const formatter = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  // Extract symbol from formatted currency
  return formatter.format(0).replace(/[\d\s,]/g, '');
};

// Helper function to format amount without sign for input fields
export const formatCurrencyInput = (
  amount: string,
  countryCode: string = 'US'
): string => {
  const config = COUNTRY_CONFIGS[countryCode] || COUNTRY_CONFIGS['US'];
  const numericAmount = parseFloat(amount.replace(/[^\d.]/g, ''));
  
  if (isNaN(numericAmount)) return '';
  
  const formatter = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: config.currency === 'JPY' ? 0 : 2,
  });
  
  return formatter.format(numericAmount);
};

export const getColorForTransactionType = (type: TransactionType) => {
  return TRANSACTION_TYPE_CONFIG[type].color;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Category configurations remain the same
export const CATEGORY_CONFIGS: Record<CategoryType, CategoryConfig> = {
  food: {
    label: "Food",
    icon: MaterialIcons,
    color: "#6366F1",
  },
  transport: {
    label: "Transport",
    icon: MaterialIcons,
    color: "#10B981",
  },
  shopping: {
    label: "Shopping",
    icon: MaterialIcons,
    color: "#EF4444",
  },
  bills: {
    label: "Bills",
    icon: MaterialIcons,
    color: "#F59E0B",
  },
  entertainment: {
    label: "Entertainment",
    icon: MaterialIcons,
    color: "#8B5CF6",
  },
  housing: {
    label: "Housing",
    icon: MaterialIcons,
    color: "#3B82F6",
  },
  health: {
    label: "Health",
    icon: MaterialIcons,
    color: "#F43F5E",
  },
  // income: {
  //   label: "Health",
  //   icon: MaterialIcons,
  //   color: "#F43F5E",
  // },
  other: {
    label: "Other",
    icon: MaterialIcons,
    color: "#6B7280",
  },
};

// Helper function to get category config
export const getCategoryConfig = (category: CategoryType): CategoryConfig => {
  return CATEGORY_CONFIGS[category] || CATEGORY_CONFIGS.other;
};

// Helper function to validate amount based on country
export const validateAmount = (
  amount: string,
  countryCode: string = 'US'
): boolean => {
  const config = COUNTRY_CONFIGS[countryCode] || COUNTRY_CONFIGS['US'];
  const numericAmount = parseFloat(amount.replace(/[^\d.]/g, ''));
  
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return false;
  }
  
  // Different validation rules for different currencies
  switch (config.currency) {
    case 'JPY':
      // Japanese Yen doesn't use decimal places
      return Number.isInteger(numericAmount);
    default:
      // Most currencies allow up to 2 decimal places
      return Number.isFinite(numericAmount);
  }
};

// Helper function to convert amount to base units (cents, paise, etc.)
export const convertToBaseUnits = (
  amount: number,
  countryCode: string = 'US'
): number => {
  const config = COUNTRY_CONFIGS[countryCode] || COUNTRY_CONFIGS['US'];
  
  switch (config.currency) {
    case 'JPY':
      // Japanese Yen doesn't have sub-units
      return Math.round(amount);
    default:
      // Most currencies have 100 sub-units (cents, paise, etc.)
      return Math.round(amount * 100);
  }
};

// Helper function to convert from base units to display amount
export const convertFromBaseUnits = (
  baseAmount: number,
  countryCode: string = 'US'
): number => {
  const config = COUNTRY_CONFIGS[countryCode] || COUNTRY_CONFIGS['US'];
  
  switch (config.currency) {
    case 'JPY':
      return baseAmount;
    default:
      return baseAmount / 100;
  }
};