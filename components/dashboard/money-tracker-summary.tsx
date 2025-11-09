'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  revenueSummary,
  getMonthlyProgress,
  getWeeklyProgress,
  getWeeklyGrowth,
  getMonthlyGrowth,
} from '@/lib/revenue-data';
import { RevenueDetailsDialog } from './revenue-details-dialog';

export const MoneyTrackerSummary = () => {
  const [showDetails, setShowDetails] = useState(false);

  const monthlyProgress = getMonthlyProgress();
  const weeklyProgress = getWeeklyProgress();
  const weeklyGrowth = getWeeklyGrowth();
  const monthlyGrowth = getMonthlyGrowth();

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Revenue Tracker</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Track your income streams and goals</p>
        </div>
        <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-lime" />
      </div>

      {/* Main Goal Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#003ac9] via-blue-500 to-[#adff02] dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-xl"
      >
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-0 mb-6">
          <div>
            <p className="text-white/80 mb-1 text-sm sm:text-base">Monthly Goal</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold">{formatCurrency(revenueSummary.currentMonth)}</p>
            <p className="text-white/70 text-base sm:text-lg mt-1">
              of {formatCurrency(revenueSummary.goals.monthly)}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
              {monthlyGrowth >= 0 ? (
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="font-semibold text-sm sm:text-base">{formatPercentage(monthlyGrowth)}</span>
            </div>
            <p className="text-white/70 text-xs sm:text-sm mt-2">vs last month</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-semibold">{monthlyProgress.toFixed(0)}%</span>
          </div>
          <Progress value={monthlyProgress} className="h-3 bg-white/20" />
        </div>
      </motion.div>

      {/* Simplified Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* This Week */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border rounded-xl p-6 shadow-sm"
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lime to-green-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">This Week</p>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(revenueSummary.currentWeek)}</p>
          </div>
          <div className="flex items-center gap-2 pt-3 border-t">
            {weeklyGrowth >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={`font-semibold ${weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(weeklyGrowth)}
            </span>
            <span className="text-sm text-muted-foreground">from last week</span>
          </div>
        </motion.div>

        {/* Weekly Goal Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border rounded-xl p-6 shadow-sm"
        >
          <div className="mb-4">
            <p className="text-sm font-medium text-muted-foreground mb-3">Weekly Goal</p>
            <p className="text-3xl font-bold">{formatCurrency(revenueSummary.goals.weekly)}</p>
          </div>
          <div className="space-y-2 pt-3 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-bold">{weeklyProgress.toFixed(0)}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-2.5" />
          </div>
        </motion.div>
      </div>

      {/* View Details Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowDetails(true)}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <Eye size={20} />
          <span>View Detailed Breakdown</span>
        </Button>
      </div>

      {/* Detailed View Dialog */}
      <RevenueDetailsDialog open={showDetails} onOpenChange={setShowDetails} />
    </div>
  );
};
