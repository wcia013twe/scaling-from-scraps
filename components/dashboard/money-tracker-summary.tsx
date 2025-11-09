'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  revenueSummary,
  getMonthlyProgress,
  getWeeklyProgress,
  getWeeklyGrowth,
  getMonthlyGrowth,
} from '@/lib/revenue-data';
import { RevenueDetails } from './revenue-details';

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Revenue Tracker</h2>
          <p className="text-muted-foreground">Track your income streams and goals</p>
        </div>
        <DollarSign className="w-10 h-10 text-lime" />
      </div>

      {/* Main Goal Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#003ac9] via-blue-500 to-[#adff02] dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-white/80 mb-1">Monthly Goal</p>
            <p className="text-5xl font-bold">{formatCurrency(revenueSummary.currentMonth)}</p>
            <p className="text-white/70 text-lg mt-1">
              of {formatCurrency(revenueSummary.goals.monthly)}
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              {monthlyGrowth >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className="font-semibold">{formatPercentage(monthlyGrowth)}</span>
            </div>
            <p className="text-white/70 text-sm mt-2">vs last month</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-semibold">{monthlyProgress.toFixed(0)}%</span>
          </div>
          <Progress value={monthlyProgress} className="h-3 bg-white/20" />
        </div>
      </motion.div>

      {/* Weekly Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* This Week */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-lime to-green-500 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold">{formatCurrency(revenueSummary.currentWeek)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {weeklyGrowth >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}>
              {formatPercentage(weeklyGrowth)}
            </span>
            <span className="text-muted-foreground">from last week</span>
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
            <p className="text-sm text-muted-foreground mb-1">Weekly Goal</p>
            <p className="text-2xl font-bold">{formatCurrency(revenueSummary.goals.weekly)}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{weeklyProgress.toFixed(0)}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-2" />
          </div>
        </motion.div>

        {/* Active Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border rounded-xl p-6 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Active Clients</p>
              <p className="text-3xl font-bold">{revenueSummary.totalClients}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-3xl font-bold">{revenueSummary.activeProjects}</p>
            </div>
          </div>
        </motion.div>

        {/* Key Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border rounded-xl p-6 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Content Engagement</p>
              <p className="text-3xl font-bold">{revenueSummary.contentEngagement.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Year-to-Date</p>
              <p className="text-2xl font-bold">{formatCurrency(revenueSummary.yearToDateSales)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lifetime Sales</p>
              <p className="text-2xl font-bold">{formatCurrency(revenueSummary.lifetimeSales)}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* View More Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowDetails(!showDetails)}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          {showDetails ? (
            <>
              <span>Show Less</span>
              <ChevronUp size={20} />
            </>
          ) : (
            <>
              <span>View More Details</span>
              <ChevronDown size={20} />
            </>
          )}
        </Button>
      </div>

      {/* Detailed View */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <RevenueDetails />
        </motion.div>
      )}
    </div>
  );
};
