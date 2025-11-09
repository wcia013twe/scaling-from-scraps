'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/onboarding/ui/input';
import { Button } from '@/components/onboarding/ui/button';
import { useOnboardingStore } from '@/lib/onboarding-store';
import { StepWrapper } from '../step-wrapper';

export const NameStep = () => {
  const { data, updateData, nextStep } = useOnboardingStore();
  const [name, setName] = useState(data.name);

  const handleNext = () => {
    if (name.trim()) {
      updateData({ name: name.trim() });
      nextStep();
    }
  };

  return (
    <StepWrapper
      title="What's your name?"
      description="Let's get to know you!"
      icon={
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <User size={64} className="text-purple-600 dark:text-purple-400" strokeWidth={2.5} />
        </motion.div>
      }
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        autoFocus
        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
        className="h-12 text-base"
      />
      <Button onClick={handleNext} disabled={!name.trim()} className="w-full h-12 text-base" size="lg">
        Next
      </Button>
    </StepWrapper>
  );
};
