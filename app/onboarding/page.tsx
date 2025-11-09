'use client';

import { AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/lib/onboarding-store';
import { ProgressBar } from '@/components/onboarding/ui/progress-bar';
import { NameStep } from '@/components/onboarding/steps/name-step';
import { HobbiesStep } from '@/components/onboarding/steps/hobbies-step';
import { ExpertiseStep } from '@/components/onboarding/steps/expertise-step';
import { PetPeevesStep } from '@/components/onboarding/steps/pet-peeves-step';
import { JourneyTypeStep } from '@/components/onboarding/steps/journey-type-step';
import { TimeCommitmentStep } from '@/components/onboarding/steps/time-commitment-step';
import { FinalStep } from '@/components/onboarding/steps/final-step';
import { Header } from '@/components/header';

const steps = [
  NameStep,
  HobbiesStep,
  ExpertiseStep,
  PetPeevesStep,
  JourneyTypeStep,
  TimeCommitmentStep,
  FinalStep,
];

export default function OnboardingPage() {
  const { currentStep } = useOnboardingStore();
  const CurrentStepComponent = steps[currentStep];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <Header>
        <div className="flex items-center justify-center w-full">
          <div className="max-w-md w-full">
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
            <p className="text-center text-sm text-muted-foreground mt-1">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>
      </Header>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl border rounded-lg bg-card px-8 py-12 min-h-[600px] shadow-sm flex items-center justify-center">
          <AnimatePresence mode="wait">
            <CurrentStepComponent key={currentStep} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
