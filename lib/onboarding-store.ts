import { create } from 'zustand';
import { OnboardingData, OnboardingStep } from './types';

interface OnboardingStore {
  currentStep: OnboardingStep;
  data: OnboardingData;
  selectedPaths: string[];
  setStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (updates: Partial<OnboardingData>) => void;
  setSelectedPaths: (paths: string[]) => void;
  resetOnboarding: () => void;
}

const initialData: OnboardingData = {
  name: '',
  hobbies: '',
  expertise: '',
  petPeeves: '',
  journeyType: '',
  timeCommitment: '',
  additionalDetails: '',
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  currentStep: 0,
  data: initialData,
  selectedPaths: [],
  setStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(6, state.currentStep + 1) as OnboardingStep,
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(0, state.currentStep - 1) as OnboardingStep,
    })),
  updateData: (updates) =>
    set((state) => ({
      data: { ...state.data, ...updates },
    })),
  setSelectedPaths: (paths) => set({ selectedPaths: paths }),
  resetOnboarding: () =>
    set({
      currentStep: 0,
      data: initialData,
      selectedPaths: [],
    }),
}));
