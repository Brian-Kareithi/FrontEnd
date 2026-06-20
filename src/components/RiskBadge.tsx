'use client';
import { RiskLevel } from '@/types';

interface Props {
  level: RiskLevel;
}

const COLORS: Record<RiskLevel, string> = {
  low: 'bg-advisory-low/10 text-advisory-low border-advisory-low/30',
  moderate: 'bg-advisory-moderate/10 text-advisory-moderate border-advisory-moderate/30',
  high: 'bg-advisory-high/10 text-advisory-high border-advisory-high/30',
  extreme: 'bg-advisory-extreme/10 text-advisory-extreme border-advisory-extreme/30',
};

const LABELS: Record<RiskLevel, string> = {
  low: 'Low Risk',
  moderate: 'Moderate',
  high: 'High Risk',
  extreme: 'Extreme',
};

export default function RiskBadge({ level }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${COLORS[level]}`}>
      {LABELS[level]}
    </span>
  );
}
