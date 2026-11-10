import React from 'react';

export interface VendorLogoProps {
  slug: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function VendorLogo({ slug, className = '', size = 'md' }: VendorLogoProps) {
  const sizeMap = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12',
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const normalized = (slug || '').toLowerCase();

  // AWS
  if (normalized.includes('aws') || normalized.includes('amazon')) {
    return (
      <div className={`${currentSize} rounded-lg bg-[#232F3E] p-1.5 flex items-center justify-center border border-[#FF9900]/30 shadow-sm shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path
            d="M6.5 13.5c1.8 1.2 4.2 1.8 6.5 1.8 3.2 0 6.1-1.2 8.5-3.2.3-.2.6 0 .5.4-1.3 2.5-4.4 4.5-8.5 4.5-2.8 0-5.4-.9-7.5-2.4-.3-.2-.1-.6.5-.5z"
            fill="#FF9900"
          />
          <path
            d="M21.5 11.8c-.4-.5-2.3-.2-3.2-.1-.3 0-.3-.3 0-.5 1.5-.9 3.5-.6 3.9-.1.4.5-.1 2.5-1.5 3.6-.2.2-.5.1-.4-.2.4-.8 1.4-2.2 1.2-2.7z"
            fill="#FF9900"
          />
          <text x="3" y="10.5" fill="#FFFFFF" fontSize="8" fontWeight="900" fontFamily="sans-serif">
            AWS
          </text>
        </svg>
      </div>
    );
  }

  // Microsoft / Azure
  if (normalized.includes('microsoft') || normalized.includes('azure') || normalized.includes('msft')) {
    return (
      <div className={`${currentSize} rounded-lg bg-[#0F172A] p-1.5 flex items-center justify-center border border-[#0078D4]/40 shadow-sm shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <rect x="2" y="2" width="9" height="9" fill="#F25022" rx="1.5" />
          <rect x="13" y="2" width="9" height="9" fill="#7FBA00" rx="1.5" />
          <rect x="2" y="13" width="9" height="9" fill="#00A4EF" rx="1.5" />
          <rect x="13" y="13" width="9" height="9" fill="#FFB900" rx="1.5" />
        </svg>
      </div>
    );
  }

  // Google Cloud
  if (normalized.includes('google') || normalized.includes('gcp')) {
    return (
      <div className={`${currentSize} rounded-lg bg-[#0F172A] p-1.5 flex items-center justify-center border border-[#4285F4]/40 shadow-sm shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
            fill="#4285F4"
          />
          <path
            d="M19 19H6c-2.76 0-5-2.24-5-5 0-2.45 1.76-4.48 4.09-4.89.87-2.64 3.37-4.54 6.32-4.54 3.19 0 5.86 2.18 6.58 5.12 2.22.46 3.9 2.42 3.9 4.77 0 2.51-1.83 4.54-4.89 4.54z"
            fill="#FFFFFF"
            fillOpacity="0.2"
          />
          <path d="M12 8c2.21 0 4.1 1.34 4.88 3.27" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7.5 14a4.5 4.5 0 0 1 4.5-4.5" stroke="#FBBC05" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 18h7a3 3 0 0 0 3-3" stroke="#34A853" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Cisco
  if (normalized.includes('cisco')) {
    return (
      <div className={`${currentSize} rounded-lg bg-[#041E42] p-1.5 flex items-center justify-center border border-[#00BCEB]/40 shadow-sm shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="#00BCEB" className="w-full h-full">
          <rect x="2" y="10" width="2" height="8" rx="1" />
          <rect x="6" y="6" width="2" height="12" rx="1" />
          <rect x="10" y="3" width="2" height="15" rx="1" />
          <rect x="14" y="3" width="2" height="15" rx="1" />
          <rect x="18" y="6" width="2" height="12" rx="1" />
          <rect x="22" y="10" width="2" height="8" rx="1" />
        </svg>
      </div>
    );
  }

  // CompTIA
  if (normalized.includes('comptia')) {
    return (
      <div className={`${currentSize} rounded-lg bg-[#180A0A] p-1.5 flex items-center justify-center border border-[#ED1C24]/40 shadow-sm shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" fill="#ED1C24" />
          <text x="5.5" y="15" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">
            SEC
          </text>
        </svg>
      </div>
    );
  }

  // HashiCorp
  if (normalized.includes('hashicorp') || normalized.includes('terraform')) {
    return (
      <div className={`${currentSize} rounded-lg bg-[#0F0D1B] p-1.5 flex items-center justify-center border border-[#844FBA]/40 shadow-sm shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M8 3l7 4.2v7.6L8 19V3z" fill="#844FBA" />
          <path d="M16 8l6 3.6v6.8L16 22V8z" fill="#5C4EE5" />
          <path d="M2 8l6 3.6v6.8L2 22V8z" fill="#00BC7F" />
        </svg>
      </div>
    );
  }

  // Linux Foundation / Kubernetes
  if (normalized.includes('linux') || normalized.includes('kubernetes') || normalized.includes('k8s')) {
    return (
      <div className={`${currentSize} rounded-lg bg-[#0B1528] p-1.5 flex items-center justify-center border border-[#326CE5]/40 shadow-sm shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="#326CE5" className="w-full h-full">
          <circle cx="12" cy="12" r="9" fill="none" stroke="#326CE5" strokeWidth="2" />
          <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // Nutanix
  if (normalized.includes('nutanix')) {
    return (
      <div className={`${currentSize} rounded-lg bg-[#071E18] p-1.5 flex items-center justify-center border border-[#00D289]/40 shadow-sm shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <rect x="3" y="3" width="7" height="7" fill="#00D289" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" fill="#0275D8" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" fill="#0275D8" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" fill="#00D289" rx="1.5" />
        </svg>
      </div>
    );
  }

  // Default Fallback Logo
  return (
    <div className={`${currentSize} rounded-lg bg-surface-50 p-1.5 flex items-center justify-center border border-surface-border shadow-sm shrink-0 ${className}`}>
      <span className="text-xs font-bold text-primary-light">
        {slug.substring(0, 2).toUpperCase()}
      </span>
    </div>
  );
}
