'use client';

import { useState, useEffect } from 'react';
import { JourneyPath } from '@/components/dashboard/journey-path';
import { MoneyTrackerSummary } from '@/components/dashboard/money-tracker-summary';
import { WeeklySummary } from '@/components/dashboard/weekly-summary';
import { CurrentDayPreview } from '@/components/dashboard/current-day-preview';
import { useDashboardStore } from '@/lib/stores/dashboard-store';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame, Calendar, Map, DollarSign, X } from 'lucide-react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const { currentDay, completedDays, streakCount, totalDays } = useDashboardStore();
  const [activeTab, setActiveTab] = useState<'weekly' | 'journey'>('weekly');
  const [showFinances, setShowFinances] = useState(false);

  // Listen for custom event to switch to journey tab
  useEffect(() => {
    const handleSwitchToJourney = () => {
      setActiveTab('journey');
    };

    window.addEventListener('switchToJourneyTab', handleSwitchToJourney);
    return () => {
      window.removeEventListener('switchToJourneyTab', handleSwitchToJourney);
    };
  }, []);

  // Calculate progress percentage
  const progressPercent = Math.round((completedDays.length / totalDays) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-lime-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* 3D Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#adff02]/10 dark:bg-[#adff02]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-[#003ac9]/10 dark:bg-[#003ac9]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-lime-200/10 dark:bg-lime-200/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <Header>
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-xl font-semibold">Your Ecommerce Journey</h1>
            <p className="text-sm text-muted-foreground">
              Day {currentDay} of {totalDays}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Streak Counter */}
            <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full border border-orange-200">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-bold text-orange-700 text-sm">{streakCount}</span>
              <span className="text-xs text-orange-600">streak</span>
            </div>

            {/* Progress Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-br from-[#adff02] to-[#8cd902] rounded-full border border-[#8cd902]">
              <Trophy className="w-4 h-4 text-[#003ac9]" />
              <span className="font-bold text-[#003ac9] text-sm">{progressPercent}%</span>
            </div>

            {/* Finances Toggle Button */}
            <Button
              onClick={() => setShowFinances(!showFinances)}
              variant={showFinances ? "default" : "outline"}
              size="sm"
              className="gap-2"
            >
              <DollarSign className="w-4 h-4" />
              <span>Finances</span>
            </Button>
          </div>
        </div>
      </Header>

      {/* Main Content */}
      <main className="w-full h-[calc(100vh-64px)] px-6 py-8 relative">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-card border rounded-xl p-1.5 w-fit mx-auto shadow-sm">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'weekly'
                ? 'bg-gradient-to-br from-[#003ac9] to-blue-500 text-white shadow-md'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Weekly Summary</span>
          </button>
          <button
            onClick={() => setActiveTab('journey')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'journey'
                ? 'bg-gradient-to-br from-[#003ac9] to-blue-500 text-white shadow-md'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Map className="w-5 h-5" />
            <span>Journey Path</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="h-[calc(100%-88px)] overflow-hidden">
          {activeTab === 'weekly' ? (
            <WeeklySummary />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Journey Path - 2/3 width */}
              <div className="lg:col-span-2 h-full overflow-hidden">
                <JourneyPath />
              </div>

              {/* Current Day Preview - 1/3 width */}
              <div className="lg:col-span-1 h-full overflow-hidden">
                <CurrentDayPreview />
              </div>
            </div>
          )}
        </div>

        {/* Finance Sidebar */}
        <AnimatePresence>
          {showFinances && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFinances(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full md:w-[500px] lg:w-[600px] bg-gradient-to-br from-blue-50 via-white to-lime-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 shadow-2xl z-50 overflow-y-auto"
              >
                {/* Sidebar Header */}
                <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-[#003ac9]" />
                    <h2 className="text-xl font-bold">Revenue Tracker</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFinances(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Sidebar Content */}
                <div className="p-6">
                  <MoneyTrackerSummary />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
