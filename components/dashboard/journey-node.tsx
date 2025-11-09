'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { DayStatus, LessonProgress } from '@/lib/stores/dashboard-store';
import { Lock, CheckCircle2, Target, PlayCircle } from 'lucide-react';

interface JourneyNodeProps {
  x: number;
  y: number;
  dayNumber: number;
  status: DayStatus;
  progress?: LessonProgress;
  index: number;
}

export function JourneyNode({ x, y, dayNumber, status, progress, index }: JourneyNodeProps) {
  const isClickable = status !== 'locked';

  // Status-based colors
  const colors = {
    locked: { bg: '#d1d5db', platform: '#9ca3af', text: '#6b7280', icon: '#9ca3af' },
    current: { bg: '#adff02', platform: '#8cd902', text: '#003ac9', icon: '#003ac9' },
    completed: { bg: '#003ac9', platform: '#0029a1', text: '#ffffff', icon: '#ffffff' },
    'in-progress': { bg: '#adff02', platform: '#8cd902', text: '#003ac9', icon: '#003ac9' },
  };

  const color = colors[status];

  // Icons
  const icons = {
    locked: Lock,
    current: Target,
    completed: CheckCircle2,
    'in-progress': PlayCircle,
  };
  const Icon = icons[status];

  // Progress percentage
  const progressPercent = progress
    ? Math.round((progress.viewedCards / progress.totalCards) * 100)
    : 0;

  const NodeContent = (
    <div className="absolute" style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}>
      {/* Platform base */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: index * 0.08, duration: 0.3 }}
        className="absolute top-16 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full"
        style={{
          background: `linear-gradient(to bottom, ${color.platform}, ${color.platform}dd)`,
          boxShadow: `0 4px 12px ${color.platform}66`,
        }}
      />

      {/* Circular node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={isClickable ? { scale: 1.1, y: -4 } : {}}
        transition={{ delay: index * 0.08 + 0.1, duration: 0.4, type: 'spring' }}
        className="relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${color.bg}, ${color.platform})`,
          boxShadow: status === 'current'
            ? `0 0 0 4px ${color.bg}44, 0 8px 24px ${color.bg}66, inset 0 -3px 8px rgba(0,0,0,0.2)`
            : `0 6px 20px ${color.platform}44, inset 0 -3px 8px rgba(0,0,0,0.2)`,
        }}
      >
        {/* Number */}
        <span className="text-3xl font-bold" style={{ color: color.text }}>
          {dayNumber}
        </span>

        {/* Status icon (small, top-right) */}
        <div
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: color.bg }}
        >
          <Icon className="w-3 h-3" style={{ color: color.icon }} />
        </div>

        {/* Progress ring for in-progress */}
        {status === 'in-progress' && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke={color.platform}
              strokeWidth="3"
              opacity="0.3"
            />
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke={color.bg}
              strokeWidth="3"
              strokeDasharray={`${progressPercent * 2.38} 238`}
              strokeLinecap="round"
            />
          </svg>
        )}
      </motion.div>

      {/* Pulse animation for current */}
      {status === 'current' && (
        <motion.div
          className="absolute inset-0 w-20 h-20 rounded-full"
          style={{ backgroundColor: color.bg }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );

  if (!isClickable) {
    return NodeContent;
  }

  return (
    <Link href={`/dashboard/day/${dayNumber}`}>
      {NodeContent}
    </Link>
  );
}
