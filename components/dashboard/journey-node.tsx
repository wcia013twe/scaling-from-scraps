'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { DayStatus, LessonProgress } from '@/lib/stores/dashboard-store';
import { Lock, CheckCircle2, Target, PlayCircle, Star } from 'lucide-react';
import { dayContent } from '@/lib/data/day-content';

interface JourneyNodeProps {
  x: number;
  y: number;
  dayNumber: number;
  status: DayStatus;
  progress?: LessonProgress;
  index: number;
  isTarget?: boolean;
}

export function JourneyNode({ x, y, dayNumber, status, progress, index, isTarget = false }: JourneyNodeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isClickable = status !== 'locked';
  const content = dayContent[dayNumber];
  const hasMilestones = content?.milestones && content.milestones.length > 0;
  const isMajorMilestone = content?.isMajorMilestone;

  // Status-based colors - all accessible days are green
  const colors = {
    locked: { bg: '#d1d5db', platform: '#9ca3af', text: '#6b7280', icon: '#9ca3af' },
    current: { bg: '#adff02', platform: '#8cd902', text: '#003ac9', icon: '#003ac9' },
    completed: { bg: '#22c55e', platform: '#16a34a', text: '#ffffff', icon: '#ffffff' },
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
    <div
      className="absolute"
      style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && hasMilestones && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50"
          >
            <div className="bg-white rounded-lg shadow-xl border-2 border-[#adff02] p-4 min-w-[280px] max-w-[320px]">
              <div className="flex items-start gap-2 mb-2">
                {isMajorMilestone && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />}
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-[#003ac9] mb-1">{content.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{content.goal}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-foreground">Key Milestones:</p>
                    {content.milestones!.map((milestone, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-foreground">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Arrow pointing down */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#adff02]"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone indicator star */}
      {isMajorMilestone && (
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="absolute -top-2 -left-2 z-10"
        >
          <Star className="w-6 h-6 text-yellow-500 fill-yellow-400 drop-shadow-lg" />
        </motion.div>
      )}

      {/* Circular node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={isClickable ? { scale: 1.1, y: -4 } : {}}
        transition={{ delay: index * 0.08 + 0.1, duration: 0.4, type: 'spring' }}
        className="relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: isTarget
            ? 'linear-gradient(135deg, #FFD700, #FFA500)'
            : isMajorMilestone
            ? 'linear-gradient(135deg, #FFD700, #FFA500)'
            : `linear-gradient(135deg, ${color.bg}, ${color.platform})`,
          boxShadow: isTarget
            ? '0 0 0 4px #FFD70044, 0 8px 24px #FFA50066, inset 0 -3px 8px rgba(0,0,0,0.2), 0 0 30px #FFD70066'
            : isMajorMilestone
            ? '0 0 0 4px #FFD70044, 0 8px 24px #FFD70066, inset 0 -3px 8px rgba(0,0,0,0.2)'
            : status === 'current'
            ? `0 0 0 4px ${color.bg}44, 0 8px 24px ${color.bg}66, inset 0 -3px 8px rgba(0,0,0,0.2)`
            : `0 6px 20px ${color.platform}44, inset 0 -3px 8px rgba(0,0,0,0.2)`,
        }}
      >
        {/* Number */}
        <span className="text-3xl font-bold" style={{ color: isMajorMilestone ? '#003ac9' : color.text }}>
          {dayNumber}
        </span>

        {/* Status icon (small, top-right) - Target emoji for last day */}
        {isTarget ? (
          <div className="absolute -top-1 -right-1 text-2xl">🎯</div>
        ) : (
          <div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color.bg }}
          >
            <Icon className="w-3 h-3" style={{ color: color.icon }} />
          </div>
        )}

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
