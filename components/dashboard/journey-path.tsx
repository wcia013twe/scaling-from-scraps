'use client';

import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/lib/stores/dashboard-store';
import { JourneyNode } from './journey-node';
import { getNodePosition } from '@/lib/utils/journey-utils';

export function JourneyPath() {
  const { totalDays, getDayStatus, inProgressDays } = useDashboardStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Calculate positions (Day 1 at top, Day 30 at bottom)
  const positions = useMemo(() => {
    return days.map((_, index) => getNodePosition(index, totalDays));
  }, [days, totalDays]);

  // Container height
  const containerHeight = positions[positions.length - 1]?.y + 400 || 2000;

  // Offset for centering path within viewBox
  const centerOffset = 300; // Centers the S-curve horizontally

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-y-scroll overflow-x-hidden bg-gradient-to-b from-blue-50 to-lime-50 rounded-xl"
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
