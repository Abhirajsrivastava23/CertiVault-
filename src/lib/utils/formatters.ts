/**
 * Formats an amount in paise to Indian Rupee (INR) currency string
 * e.g., 369900 paise -> "₹3,699"
 */
export function formatInr(paise: number, includeDecimals = false): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(rupees);
}

/**
 * Calculates discount percentage
 */
export function calculateDiscount(retailPaise: number, voucherPaise: number): number {
  if (retailPaise <= 0 || voucherPaise >= retailPaise) return 0;
  return Math.round(((retailPaise - voucherPaise) / retailPaise) * 100);
}

/**
 * Formats an ISO date string to readable format
 * e.g., "2026-11-08" -> "Nov 8, 2026"
 */
export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * Masks a voucher code for security, displaying only the last 4 characters
 * e.g., "AZ900-2026-PROMO-9821" -> "••••-••••-••••-9821"
 */
export function maskVoucherCode(code: string): string {
  if (!code) return '••••-••••-••••-••••';
  const clean = code.trim();
  const lastFour = clean.slice(-4);
  return `••••-••••-••••-${lastFour}`;
}

/**
 * Formats order number e.g. "CV-2026-9812"
 */
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `CV-${year}-${random}`;
}

