'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '@/components/onboarding/ui/textarea';
import { Button } from '@/components/onboarding/ui/button';
import { useOnboardingStore } from '@/lib/onboarding-store';
import { StepWrapper } from '../step-wrapper';

export const PetPeevesStep = () => {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  const [petPeeves, setPetPeeves] = useState(data.petPeeves);

  const handleNext = () => {
    if (petPeeves.trim()) {
      updateData({ petPeeves: petPeeves.trim() });
      nextStep();
    }
  };

  return (
    <StepWrapper
      title="What are your pet peeves?"
      description="What bothers you? Let's steer away!"
      icon={
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <AlertCircle size={64} className="text-orange-500 dark:text-orange-400" strokeWidth={2.5} />
        </motion.div>
      }
    >
      <Textarea
        value={petPeeves}
        onChange={(e) => setPetPeeves(e.target.value)}
        placeholder="What really bugs you?"
        autoFocus
        className="min-h-24 text-base"
      />
      <div className="flex gap-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 h-12 text-base" size="lg">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!petPeeves.trim()} className="flex-1 h-12 text-base" size="lg">
          Next
        </Button>
      </div>
    </StepWrapper>
  );
};
