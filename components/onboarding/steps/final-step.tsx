'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/onboarding/ui/button';
import { useOnboardingStore } from '@/lib/onboarding-store';
import { StepWrapper } from '../step-wrapper';

export const FinalStep = () => {
  const router = useRouter();
  const { data, prevStep } = useOnboardingStore();

  const handleComplete = () => {
    console.log('Onboarding complete!', data);
    router.push('/choose-path');
  };

  return (
    <StepWrapper
      title="You're all set!"
      description="Ready to begin your journey!"
      icon={
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles size={64} className="text-[#adff02] fill-[#adff02]" strokeWidth={2.5} />
        </motion.div>
      }
    >
      <div className="flex gap-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 h-12 text-base" size="lg">
          Back
        </Button>
        <Button onClick={handleComplete} className="flex-1 h-12 text-base" size="lg">
          Complete
        </Button>
      </div>
    </StepWrapper>
  );
};
