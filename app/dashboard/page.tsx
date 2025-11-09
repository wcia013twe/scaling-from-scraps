'use client';

import { JourneyPath } from '@/components/dashboard/journey-path';
import { useDashboardStore } from '@/lib/stores/dashboard-store';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame } from 'lucide-react';

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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#003ac9]">Your Ecommerce Journey</h1>
              <p className="text-sm text-gray-600 mt-1">
                Day {currentDay} of {totalDays}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Streak Counter */}
              <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full shadow-[0_4px_12px_rgba(251,146,60,0.3),inset_0_-2px_6px_rgba(0,0,0,0.1)] border border-orange-200">
                <Flame className="w-5 h-5 text-orange-500 drop-shadow-sm" />
                <span className="font-bold text-orange-700">{streakCount}</span>
                <span className="text-xs text-orange-600">day streak</span>
              </div>

              {/* Progress Badge */}
              <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-[#adff02] to-[#8cd902] rounded-full shadow-[0_4px_12px_rgba(173,255,2,0.4),inset_0_-2px_6px_rgba(0,0,0,0.1)] border border-[#8cd902]">
                <Trophy className="w-5 h-5 text-[#003ac9] drop-shadow-sm" />
                <span className="font-bold text-[#003ac9]">{progressPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full h-[calc(100vh-80px)] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {/* Left/Main Area: Journey Path (2/3 width) */}
          <div className="lg:col-span-2">
            <JourneyPath />
          </div>

          {/* Right Sidebar: Money Tracker (1/3 width) */}
          <div className="lg:col-span-1">
            {/* Placeholder for Phase 2 */}
          </div>
        </div>
      </main>
    </div>
  );
}
