import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

export function ShieldBadge({ text = "Zero Double-Booking Guarantee", variant = "emerald" }) {
  const variantClass = variant === 'emerald' ? 'clay-badge-emerald' : 'clay-badge-amber';
  return (
    <span className={variantClass}>
      <ShieldCheck size={14} />
      <span>{text}</span>
    </span>
  );
}

export function StatusBadge({ status = "active", label }) {
  const isSuccess = status === 'active' || status === 'resolved' || status === 'conflict-free';
  return (
    <span className={`status-indicator-tag ${isSuccess ? 'success' : 'warning'}`}>
      {isSuccess ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
      <span>{label || status.toUpperCase()}</span>
    </span>
  );
}
