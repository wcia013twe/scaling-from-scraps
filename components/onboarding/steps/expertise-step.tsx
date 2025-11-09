'use client';

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '@/components/onboarding/ui/textarea';
import { Button } from '@/components/onboarding/ui/button';
import { useOnboardingStore } from '@/lib/onboarding-store';
import { StepWrapper } from '../step-wrapper';

export const ExpertiseStep = () => {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  const [expertise, setExpertise] = useState(data.expertise);

  const handleNext = () => {
    if (expertise.trim()) {
      updateData({ expertise: expertise.trim() });
      nextStep();
    }
  };

  return (
    <StepWrapper
      title="What do people come to you for?"
      description="Your unique strengths!"
      icon={
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Lightbulb size={64} className="text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" strokeWidth={2.5} />
        </motion.div>
      }
    >
      <Textarea
        value={expertise}
        onChange={(e) => setExpertise(e.target.value)}
        placeholder="What's your superpower?"
        autoFocus
        className="min-h-24 text-base"
      />
      <div className="flex gap-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 h-12 text-base" size="lg">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!expertise.trim()} className="flex-1 h-12 text-base" size="lg">
          Next
        </Button>
      </div>
    </StepWrapper>
  );
};
