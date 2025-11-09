'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/lib/stores/dashboard-store';
import { JourneyNode } from './journey-node';
import { getNodePosition } from '@/lib/utils/journey-utils';

// Create a global event system for scrolling to days
if (typeof window !== 'undefined') {
  (window as any).scrollToJourneyDay = null;
}

export function JourneyPath() {
  const { totalDays, getDayStatus, inProgressDays } = useDashboardStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [centerOffset, setCenterOffset] = useState(300);

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Calculate positions (Day 1 at top, Day 30 at bottom)
  const positions = useMemo(() => {
    return days.map((_, index) => getNodePosition(index, totalDays));
  }, [days, totalDays]);

  // Container height
  const containerHeight = positions[positions.length - 1]?.y + 400 || 2000;

  // Calculate center offset based on container width
  useEffect(() => {
    const updateCenterOffset = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setCenterOffset(containerWidth / 2);
      }
    };

    updateCenterOffset();
    window.addEventListener('resize', updateCenterOffset);
    return () => window.removeEventListener('resize', updateCenterOffset);
  }, []);

  // Function to scroll to a specific day
  const scrollToDay = (dayNumber: number) => {
    const pos = positions[dayNumber - 1];
    if (pos && containerRef.current) {
      const scrollTarget = pos.y + 100 - 200; // Offset to center the day in view
      containerRef.current.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      });
    }
  };

  // Expose scroll function globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).scrollToJourneyDay = scrollToDay;
    }
    return () => {
      if (typeof window !== 'undefined') {
        (window as any).scrollToJourneyDay = null;
      }
    };
  }, [positions]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-y-scroll overflow-x-hidden bg-gradient-to-b from-blue-50 to-lime-50 dark:from-gray-900 dark:to-gray-800 rounded-xl"
      style={{ scrollbarWidth: 'thin' }}
    >
      <div className="relative w-full" style={{ height: `${containerHeight}px` }}>
        {/* Nodes layer - positioned absolutely within container */}
        <div className="relative w-full h-full">
          {days.map((dayNumber, index) => {
            const status = getDayStatus(dayNumber);
            const progress = inProgressDays.get(dayNumber);
            const isLastDay = dayNumber === totalDays;
            const pos = positions[index];

            return (
              <JourneyNode
                key={dayNumber}
                x={pos.x + centerOffset} // Center horizontally
                y={pos.y + 100} // Natural top-to-bottom positioning
                dayNumber={dayNumber}
                status={status}
                progress={progress}
                index={index}
                isTarget={isLastDay}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
