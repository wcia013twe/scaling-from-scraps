'use client';

import { motion } from 'framer-motion';
import { Calendar, TrendingUp, TrendingDown, CheckCircle2, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  revenueStreams,
  weeklyMetrics,
  upcomingOpportunities,
  recentTransactions,
  clients,
  revenueSummary,
} from '@/lib/revenue-data';
import { RevenueStreamCard } from './revenue-stream-card';

interface RevenueDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RevenueDetailsDialog = ({ open, onOpenChange }: RevenueDetailsDialogProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'proposal':
      case 'inactive':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] lg:max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Revenue Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-4">
          {/* Revenue Streams Breakdown */}
          <div>
            <h3 className="text-xl font-bold mb-4">Revenue Streams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {revenueStreams.map((stream, index) => (
                <motion.div
                  key={stream.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <RevenueStreamCard stream={stream} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Weekly Performance Chart */}
          <div>
            <h3 className="text-xl font-bold mb-4">Weekly Performance</h3>
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                {weeklyMetrics.map((metric, index) => {
                  const isCurrentWeek = metric.week === 'This Week';
                  const prevRevenue = index > 0 ? weeklyMetrics[index - 1].revenue : metric.revenue;
                  const growth = index > 0 ? ((metric.revenue - prevRevenue) / prevRevenue) * 100 : 0;

                  return (
                    <div key={metric.week} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-muted-foreground">
                        {metric.week}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${isCurrentWeek ? 'text-lime' : ''}`}>
                            {formatCurrency(metric.revenue)}
                          </span>
                          {index > 0 && (
                            <div className="flex items-center gap-1 text-sm">
                              {growth >= 0 ? (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-600" />
                              )}
                              <span className={growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {growth.toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(metric.revenue / 15000) * 100}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`h-full ${
                              isCurrentWeek
                                ? 'bg-gradient-to-r from-lime to-green-500'
                                : 'bg-gradient-to-r from-blue-500 to-purple-500'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground w-20 text-right">
                        {metric.transactions} txn
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Opportunities */}
            <div>
              <h3 className="text-xl font-bold mb-4">Upcoming Opportunities</h3>
              <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
                {upcomingOpportunities.slice(0, 5).map((opportunity) => (
                  <div key={opportunity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lime to-green-500 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{opportunity.title}</p>
                      <p className="text-sm text-muted-foreground">{opportunity.client}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium">{formatCurrency(opportunity.amount)}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{formatDate(opportunity.date)}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(opportunity.status)}`}>
                      {opportunity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
              <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
                {recentTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-start justify-between gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.client}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-600">{formatCurrency(transaction.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Clients */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Active Clients</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span className="font-semibold">{revenueSummary.totalClients} total</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{client.name}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Revenue</span>
                      <span className="font-bold">{formatCurrency(client.totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="font-semibold">{client.projects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Payment</span>
                      <span>{formatDate(client.lastPayment)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
