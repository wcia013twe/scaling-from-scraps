'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { RevenueStream } from '@/lib/revenue-data';

interface RevenueStreamCardProps {
  stream: RevenueStream;
}

export const RevenueStreamCard = ({ stream }: RevenueStreamCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Icon and Title */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stream.color} flex items-center justify-center text-2xl`}>
            {stream.icon}
          </div>
          <div>
            <p className="font-semibold text-foreground">{stream.name}</p>
            <p className="text-xs text-muted-foreground">{stream.transactions} transactions</p>
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-3">
        <p className="text-3xl font-bold text-foreground">{formatCurrency(stream.amount)}</p>
        <p className="text-sm text-muted-foreground">{stream.percentOfTotal}% of total</p>
      </div>

      {/* Growth Indicator */}
      <div className="flex items-center gap-2">
        {stream.growth >= 0 ? (
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">{formatPercentage(stream.growth)}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-600">
            <TrendingDown className="w-4 h-4" />
            <span className="text-sm font-semibold">{formatPercentage(stream.growth)}</span>
          </div>
        )}
        <span className="text-sm text-muted-foreground">from last month</span>
      </div>
    </div>
  );
};
