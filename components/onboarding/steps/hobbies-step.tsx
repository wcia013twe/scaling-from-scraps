'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '@/components/onboarding/ui/textarea';
import { Button } from '@/components/onboarding/ui/button';
import { useOnboardingStore } from '@/lib/onboarding-store';
import { StepWrapper } from '../step-wrapper';

export const HobbiesStep = () => {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  const [hobbies, setHobbies] = useState(data.hobbies);

  const handleNext = () => {
    if (hobbies.trim()) {
      updateData({ hobbies: hobbies.trim() });
      nextStep();
    }
  };

  return (
    <StepWrapper
      title="What are your likes & hobbies?"
      description="Share what makes you happy!"
      icon={
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Heart size={64} className="text-red-500 fill-red-500 dark:text-red-400 dark:fill-red-400" strokeWidth={2.5} />
        </motion.div>
      }
    >
      <Textarea
        value={hobbies}
        onChange={(e) => setHobbies(e.target.value)}
        placeholder="Tell us what you love to do..."
        autoFocus
        className="min-h-24 text-base"
      />
      <div className="flex gap-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 h-12 text-base" size="lg">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!hobbies.trim()} className="flex-1 h-12 text-base" size="lg">
          Next
        </Button>
      </div>
    </StepWrapper>
  );
};
