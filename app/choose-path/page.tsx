'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useOnboardingStore } from '@/lib/onboarding-store';
import { paths, recommendedPath } from '@/lib/paths-data';
import { PathCard } from '@/components/paths/path-card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';

export default function ChoosePathPage() {
  const router = useRouter();
  const { selectedPaths, setSelectedPaths } = useOnboardingStore();
  const [localSelectedPaths, setLocalSelectedPaths] = useState<string[]>(selectedPaths);

  const maxSelections = 2;
  const canSelectMore = localSelectedPaths.length < maxSelections;

  const handleTogglePath = (pathId: string) => {
    if (localSelectedPaths.includes(pathId)) {
      // Deselect
      setLocalSelectedPaths(localSelectedPaths.filter((id) => id !== pathId));
    } else if (canSelectMore) {
      // Select
      setLocalSelectedPaths([...localSelectedPaths, pathId]);
    }
  };

  const handleContinue = () => {
    if (localSelectedPaths.length > 0) {
      setSelectedPaths(localSelectedPaths);
      router.push('/path-explanation');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-semibold">Choose Your Path</h1>
          <p className="text-sm text-muted-foreground">Select up to 2 income paths that resonate with you</p>
        </motion.div>
      </Header>

      {/* Recommendation Banner */}
      <div className="bg-gradient-to-r from-lime to-green-400 p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-3 text-gray-900">
          <Sparkles className="w-6 h-6" />
          <p className="font-semibold">
            💡 Recommended:{' '}
            <span className="font-bold">
              {paths.find((p) => p.id === recommendedPath)?.title}
            </span>
            {' '}— Then layer in other paths as upsells or standalone systems
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Selection Counter */}
          <div className="mb-6 text-center">
            <p className="text-muted-foreground">
              {localSelectedPaths.length === 0 && 'Select up to 2 paths to continue'}
              {localSelectedPaths.length === 1 && '1 path selected — you can select 1 more or continue'}
              {localSelectedPaths.length === 2 && '2 paths selected — ready to continue!'}
            </p>
          </div>

          {/* Path Cards */}
          <div className="space-y-4">
            {paths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PathCard
                  path={path}
                  isSelected={localSelectedPaths.includes(path.id)}
                  onToggle={handleTogglePath}
                  disabled={!canSelectMore && !localSelectedPaths.includes(path.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 bg-card border-t shadow-lg p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="font-semibold text-foreground">
              {localSelectedPaths.length} of {maxSelections} paths selected
            </p>
            <p className="text-sm text-muted-foreground">
              {localSelectedPaths.length === 0
                ? 'Choose at least 1 path to continue'
                : 'Ready to see your personalized plan'}
            </p>
          </div>

          <Button
            onClick={handleContinue}
            disabled={localSelectedPaths.length === 0}
            size="lg"
            className="px-8 h-14 text-lg font-semibold"
          >
            Continue
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
