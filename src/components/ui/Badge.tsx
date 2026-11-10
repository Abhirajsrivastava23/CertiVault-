import React from 'react';
import { cn } from '@/lib/utils/cn';
import { DifficultyLevel, OrderStatus, VoucherStatus } from '@/lib/types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'purple' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'sm', children, ...props }: BadgeProps) {
  const base = 'inline-flex items-center font-medium rounded-full border transition-colors';
  
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    primary: 'bg-primary/10 text-primary-light border-primary/30',
    secondary: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/40',
    success: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40',
    warning: 'bg-amber-950/60 text-amber-300 border-amber-800/40',
    danger: 'bg-rose-950/60 text-rose-300 border-rose-800/40',
    purple: 'bg-purple-950/60 text-purple-300 border-purple-800/40',
    outline: 'bg-transparent text-slate-300 border-slate-700',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs sm:text-sm',
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}

export function DifficultyBadge({ level, className }: { level: DifficultyLevel; className?: string }) {
  const config: Record<DifficultyLevel, { variant: BadgeProps['variant']; label: string }> = {
    Beginner: { variant: 'success', label: 'Beginner' },
    Intermediate: { variant: 'primary', label: 'Intermediate' },
    Advanced: { variant: 'purple', label: 'Advanced' },
    Expert: { variant: 'warning', label: 'Expert' },
  };

  const item = config[level] || { variant: 'default', label: level };
  return (
    <Badge variant={item.variant} className={cn('font-semibold', className)}>
      {item.label}
    </Badge>
  );
}

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  const config: Record<OrderStatus, { variant: BadgeProps['variant']; label: string }> = {
    fulfilled: { variant: 'success', label: 'Fulfilled' },
    paid: { variant: 'primary', label: 'Paid' },
    pending: { variant: 'warning', label: 'Pending Payment' },
    failed: { variant: 'danger', label: 'Failed' },
    expired: { variant: 'default', label: 'Expired' },
    refund_pending: { variant: 'warning', label: 'Refund Pending' },
    refunded: { variant: 'default', label: 'Refunded' },
  };

  const item = config[status] || { variant: 'default', label: status };
  return <Badge variant={item.variant} className={className}>{item.label}</Badge>;
}

export function VoucherStatusBadge({ status, className }: { status: VoucherStatus; className?: string }) {
  const config: Record<VoucherStatus, { variant: BadgeProps['variant']; label: string }> = {
    available: { variant: 'success', label: 'Available' },
    reserved: { variant: 'warning', label: 'Reserved' },
    sold: { variant: 'primary', label: 'Assigned / Sold' },
    disabled: { variant: 'danger', label: 'Disabled' },
  };

  const item = config[status] || { variant: 'default', label: status };
  return <Badge variant={item.variant} className={className}>{item.label}</Badge>;
}

