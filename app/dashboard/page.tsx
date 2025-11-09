'use client';

import { JourneyPath } from '@/components/dashboard/journey-path';
import { MoneyTrackerSummary } from '@/components/dashboard/money-tracker-summary';
import { useDashboardStore } from '@/lib/stores/dashboard-store';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame } from 'lucide-react';
import { Header } from '@/components/header';

export default function DashboardPage() {
  const { currentDay, completedDays, streakCount, totalDays } = useDashboardStore();

  // Calculate progress percentage
  const progressPercent = Math.round((completedDays.length / totalDays) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-lime-50 relative overflow-hidden">
      {/* 3D Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#adff02]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-[#003ac9]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-lime-200/10 rounded-full blur-3xl"></div>
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
          </div>
        </div>
      </Header>

      {/* Main Content */}
      <main className="w-full h-[calc(100vh-64px)] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {/* Left/Main Area: Journey Path (2/3 width) */}
          <div className="lg:col-span-2 h-full">
            <JourneyPath />
          </div>

          {/* Right Sidebar: Money Tracker (1/3 width) */}
          <div className="lg:col-span-1 overflow-y-auto">
            <MoneyTrackerSummary />
          </div>
        </div>
      </main>
    </div>
  );
}
