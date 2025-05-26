import { useSettings } from '~/src/context/SettingsContext';
import { formatCurrency, getCurrencySymbol } from '~/src/utils/transactionUtils';
import { TransactionType } from '~/src/types/transaction';

export const useFormattedCurrency = () => {
  const { selectedCountry } = useSettings();

  const format = (amount: number, type?: TransactionType) => {
    return formatCurrency(amount, type, selectedCountry);
  };

  const getCurrency = () => {
    return getCurrencySymbol(selectedCountry);
  };

  return {
    formatCurrency: format,
    getCurrencySymbol: getCurrency,
    selectedCountry,
  };
};
