export function amountToDollars(amount: number): string {
  const currencyOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  return amount.toLocaleString('en-US', currencyOptions);
}
