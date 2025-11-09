'use client';

import { motion } from 'framer-motion';
import { Compass, Flag, Navigation } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/onboarding/ui/button';
import { useOnboardingStore } from '@/lib/onboarding-store';
import { StepWrapper } from '../step-wrapper';

export const JourneyTypeStep = () => {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  const [journeyType, setJourneyType] = useState<'lead' | 'follow' | ''>(
    data.journeyType
  );

  const handleNext = () => {
    if (journeyType) {
      updateData({ journeyType });
      nextStep();
    }
  };

  return (
    <StepWrapper
      title="Do you want to lead or follow on your journey?"
      icon={
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <Compass size={64} className="text-teal-600 dark:text-teal-400" strokeWidth={2.5} />
        </motion.div>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant={journeyType === 'lead' ? 'default' : 'outline'}
          onClick={() => setJourneyType('lead')}
          className="h-32 flex flex-col items-center justify-center gap-2 p-4"
          size="lg"
        >
          <Flag className="w-8 h-8" strokeWidth={2.5} />
          <span className="text-lg font-semibold">Lead</span>
          <span className="text-xs font-normal opacity-90">I'll take charge!</span>
        </Button>
        <Button
          variant={journeyType === 'follow' ? 'default' : 'outline'}
          onClick={() => setJourneyType('follow')}
          className="h-32 flex flex-col items-center justify-center gap-2 p-4"
          size="lg"
        >
          <Navigation className="w-8 h-8" strokeWidth={2.5} />
          <span className="text-lg font-semibold">Follow</span>
          <span className="text-xs font-normal opacity-90">Guide me along!</span>
        </Button>
      </div>
      <div className="flex gap-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 h-12 text-base" size="lg">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!journeyType} className="flex-1 h-12 text-base" size="lg">
          Next
        </Button>
      </div>
    </StepWrapper>
  );
};
