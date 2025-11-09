'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Path } from '@/lib/paths-data';

interface PathCardProps {
  path: Path;
  isSelected: boolean;
  onToggle: (pathId: string) => void;
  disabled?: boolean;
}

export const PathCard = ({ path, isSelected, onToggle, disabled }: PathCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-lg bg-card transition-all duration-300 ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
      } ${disabled && !isSelected ? 'opacity-50' : ''}`}
    >
      {/* Card Header with Checkbox */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => !disabled && onToggle(path.id)}
            disabled={disabled && !isSelected}
            className="mt-1"
          />

          <div className="flex-1">
            {/* Icon and Title */}
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${path.gradient} flex items-center justify-center text-2xl`}>
                {path.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground flex-1">{path.title}</h3>
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground mb-4">{path.shortDesc}</p>

            {/* Read More Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-primary font-semibold hover:underline transition-all"
            >
              {isExpanded ? (
                <>
                  <span>Read Less</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span>Read More</span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t pt-6 space-y-4">
              {/* Why It Fits */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Why It Fits</h4>
                <p className="text-muted-foreground">{path.whyItFits}</p>
              </div>

              {/* Quick Launch Steps */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Quick Launch Steps</h4>
                <div className="space-y-3">
                  {path.quickLaunchSteps.map((step) => (
                    <div key={step.step} className="flex gap-3">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${path.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}>
                        {step.step}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
