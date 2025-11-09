'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, ChevronLeft, ChevronRight, Check, Lock, Crown } from 'lucide-react';
import { useDashboardStore } from '@/lib/stores/dashboard-store';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalDays, currentDay, getDayStatus } = useDashboardStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Only show sidebar on dashboard and related pages
  const shouldShowSidebar = pathname === '/dashboard' || pathname?.startsWith('/dashboard');

  if (!shouldShowSidebar || !isClient) {
    return null;
  }

  const getStatusColor = (dayNumber: number) => {
    const status = getDayStatus(dayNumber);
    if (status === 'completed') return 'bg-[#adff02] border-[#003ac9]';
    if (status === 'current') return 'bg-[#003ac9] border-[#adff02]';
    if (status === 'in-progress') return 'bg-blue-300 border-[#003ac9]';
    return 'bg-muted border-border';
  };

  const handleDayClick = (dayNumber: number) => {
    // Navigate to dashboard if not already there
    if (pathname !== '/dashboard') {
      router.push('/dashboard');
    }

    // Wait a moment for navigation and then trigger scroll
    setTimeout(() => {
      // Switch to journey tab by triggering a custom event
      const event = new CustomEvent('switchToJourneyTab');
      window.dispatchEvent(event);

      // Scroll to the specific day
      if (typeof window !== 'undefined' && (window as any).scrollToJourneyDay) {
        (window as any).scrollToJourneyDay(dayNumber);
      }
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sticky left-0 top-0 h-screen bg-card border-r flex flex-col z-40 shadow-lg flex-shrink-0 overflow-hidden"
          >
            {/* Header */}
            <div className="h-16 border-b flex items-center justify-between px-4">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-foreground"
              >
                Navigation
              </motion.h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(true)}
                className="h-8 w-8"
              >
                <ChevronLeft size={16} />
              </Button>
            </div>

            {/* Navigation */}
            <div className="p-3 border-b space-y-2">
              <Button
                variant={pathname === '/' || pathname === '/dashboard' ? 'default' : 'ghost'}
                onClick={() => router.push('/dashboard')}
                className={`w-full justify-start gap-3 ${
                  pathname === '/' || pathname === '/dashboard'
                    ? 'bg-gradient-to-r from-[#003ac9] to-[#adff02] text-white'
                    : ''
                }`}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Button>
              <Button
                variant={pathname === '/premium' ? 'default' : 'ghost'}
                onClick={() => router.push('/premium')}
                className={`w-full justify-start gap-3 ${
                  pathname === '/premium'
                    ? 'bg-gradient-to-r from-[#003ac9] to-[#adff02] text-white'
                    : ''
                }`}
              >
                <Crown size={20} />
                <span>Premium</span>
              </Button>
            </div>

            {/* Calendar Days */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">30-Day Journey</span>
              </div>

              <div className="space-y-2">
                {days.map((dayNumber) => {
                  const status = getDayStatus(dayNumber);
                  const isCurrentDay = dayNumber === currentDay;

                  return (
                    <button
                      key={dayNumber}
                      onClick={() => handleDayClick(dayNumber)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        status === 'completed'
                          ? 'bg-gradient-to-r from-[#adff02]/20 to-[#adff02]/10 hover:from-[#adff02]/30 hover:to-[#adff02]/20'
                          : status === 'current'
                          ? 'bg-gradient-to-r from-[#003ac9]/20 to-[#003ac9]/10 hover:from-[#003ac9]/30 hover:to-[#003ac9]/20'
                          : 'opacity-50 hover:bg-muted hover:opacity-70'
                      } ${isCurrentDay ? 'ring-2 ring-[#adff02] shadow-lg' : ''}`}
                    >
                      <div
                        className={`h-10 w-10 rounded-xl border-2 flex items-center justify-center flex-shrink-0 shadow-sm ${getStatusColor(
                          dayNumber
                        )} ${
                          status === 'completed'
                            ? 'shadow-[#adff02]/50'
                            : status === 'current'
                            ? 'shadow-[#003ac9]/50'
                            : ''
                        }`}
                      >
                        {status === 'completed' ? (
                          <Check size={18} className="text-[#003ac9]" strokeWidth={3} />
                        ) : status === 'locked' ? (
                          <Lock size={14} className="text-muted-foreground" />
                        ) : (
                          <span
                            className={`text-sm font-bold ${
                              status === 'current' ? 'text-white' : 'text-muted-foreground'
                            }`}
                          >
                            {dayNumber}
                          </span>
                        )}
                      </div>
                      <div className="text-left overflow-hidden">
                        <p
                          className={`text-sm font-semibold ${
                            status === 'completed'
                              ? 'text-[#003ac9]'
                              : status === 'current'
                              ? 'text-[#003ac9]'
                              : 'text-muted-foreground'
                          }`}
                        >
                          Day {dayNumber}
                        </p>
                        <p
                          className={`text-xs capitalize ${
                            status === 'completed'
                              ? 'text-[#adff02] font-medium'
                              : status === 'current'
                              ? 'text-[#003ac9]/70'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {status === 'completed' ? '✓ Complete' : status}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Reopen Button - shows when sidebar is collapsed */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={() => setIsCollapsed(false)}
            className="fixed left-6 top-20 z-50 h-14 w-14 rounded-xl bg-gradient-to-br from-[#003ac9] to-[#adff02] text-white shadow-2xl hover:shadow-[#adff02]/50 transition-all hover:scale-110 flex items-center justify-center group"
          >
            <div className="relative">
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-card px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity text-foreground">
                Open Menu
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
