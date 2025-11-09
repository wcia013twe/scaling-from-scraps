'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/onboarding/ui/button';
import { Input } from '@/components/onboarding/ui/input';
import { useOnboardingStore } from '@/lib/onboarding-store';
import { StepWrapper } from '../step-wrapper';

const presetTimes = ['5 min/day', '15 min/day', '30 min/day', '1 hour/day'];

export const TimeCommitmentStep = () => {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  const [timeCommitment, setTimeCommitment] = useState(data.timeCommitment);
  const [customTime, setCustomTime] = useState('');

  const handlePresetClick = (preset: string) => {
    setTimeCommitment(preset);
    setCustomTime('');
  };

  const handleCustomChange = (value: string) => {
    setCustomTime(value);
    setTimeCommitment(value);
  };

  const handleNext = () => {
    if (timeCommitment.trim()) {
      updateData({ timeCommitment: timeCommitment.trim() });
      nextStep();
    }
  };

  return (
    <StepWrapper
      title="How much time can you commit?"
      description="Every minute counts toward your goals!"
      icon={
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <Clock size={64} className="text-green-600 dark:text-green-400" strokeWidth={2.5} />
        </motion.div>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        {presetTimes.map((preset) => (
          <Button
            key={preset}
            variant={timeCommitment === preset && !customTime ? 'default' : 'outline'}
            onClick={() => handlePresetClick(preset)}
            className="h-16 font-semibold"
          >
            {preset}
          </Button>
        ))}
      </div>
      <div className="text-center text-muted-foreground font-semibold">OR</div>
      <Input
        value={customTime}
        onChange={(e) => handleCustomChange(e.target.value)}
        placeholder="Enter custom time (e.g., 45 min/day)"
        className="h-12 text-base"
      />
      <div className="flex gap-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 h-12 text-base" size="lg">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!timeCommitment.trim()}
          className="flex-1 h-12 text-base"
          size="lg"
        >
          Next
        </Button>
      </div>
    </StepWrapper>
  );
};
