export interface OnboardingData {
  name: string;
  hobbies: string;
  expertise: string;
  petPeeves: string;
  journeyType: 'lead' | 'follow' | '';
  timeCommitment: string;
  additionalDetails: string;
}

export type OnboardingStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;
