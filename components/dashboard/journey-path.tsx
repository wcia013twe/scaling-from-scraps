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

  // Calculate positions (upward progression)
  const positions = useMemo(() => {
    return days.map((_, index) => getNodePosition(index, totalDays));
  }, [days, totalDays]);

  // Reverse positions for upward scroll (Day 1 at bottom)
  const reversedPositions = useMemo(() => [...positions].reverse(), [positions]);

  // Container height
  const containerHeight = positions[positions.length - 1]?.y + 400 || 2000;

  // Offset for centering path within viewBox
  const centerOffset = 300; // Centers the S-curve horizontally

  // Container starts at top (Day 30) - users scroll down to see earlier days

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-gradient-to-b from-blue-50 to-lime-50 rounded-xl"
      style={{ scrollbarWidth: 'thin' }}
    >
      <div className="relative w-full" style={{ height: `${containerHeight}px` }}>
        {/* Nodes layer - positioned absolutely within container */}
        <div className="relative w-full h-full">
          {days.map((dayNumber, index) => {
            const status = getDayStatus(dayNumber);
            const progress = inProgressDays.get(dayNumber);

            // Use reversed positions (Day 1 at bottom)
            const reversedIndex = totalDays - 1 - index;
            const pos = reversedPositions[reversedIndex];

            return (
              <JourneyNode
                key={dayNumber}
                x={pos.x + centerOffset} // Center horizontally
                y={containerHeight - pos.y - 100} // Flip Y for upward
                dayNumber={dayNumber}
                status={status}
                progress={progress}
                index={index}
              />
            );
          })}
        </div>

        {/* End marker at top */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: totalDays * 0.08 + 0.5 }}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-[#adff02] to-[#003ac9] text-white shadow-lg border-2 border-white/20"
          style={{ top: '50px' }}
        >
          <div className="text-4xl mb-2">🎯</div>
          <h3 className="text-xl font-bold">Journey Complete!</h3>
          <p className="text-xs opacity-90 mt-1">Finish all {totalDays} days</p>
        </motion.div>
      </div>
    </div>
  );
}
