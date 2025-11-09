'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Rocket } from 'lucide-react';
import { useOnboardingStore } from '@/lib/onboarding-store';
import { getPathsByIds, Path } from '@/lib/paths-data';
import { Button } from '@/components/ui/button';

export default function PathExplanationPage() {
  const router = useRouter();
  const { selectedPaths } = useOnboardingStore();
  const [paths, setPaths] = useState<Path[]>([]);

  useEffect(() => {
    if (selectedPaths.length === 0) {
      router.push('/choose-path');
    } else {
      setPaths(getPathsByIds(selectedPaths));
    }
  }, [selectedPaths, router]);

  if (paths.length === 0) {
    return null;
  }

  const isCombined = paths.length === 2;
  const title = isCombined
    ? `${paths[0].title} + ${paths[1].title}`
    : paths[0].title;

  const subtitle = isCombined
    ? 'Your Power Combo for AI-Powered Income'
    : 'Your Focused Path to AI-Powered Income';

  const combinedDesc = isCombined
    ? `Combining ${paths[0].title} with ${paths[1].title} creates a smart, scalable income path that maximizes your impact while minimizing time investment. This combo allows you to build systems-based offers that deliver high value.`
    : paths[0].whyItFits;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white p-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              {paths.map((path) => (
                <span key={path.id} className="text-5xl">
                  {path.icon}
                </span>
              ))}
            </div>
            <h1 className="text-5xl font-bold mb-3">{title}</h1>
            <p className="text-2xl opacity-90 mb-6">{subtitle}</p>
            <p className="text-lg opacity-85 max-w-3xl">{combinedDesc}</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Why This Combo Works / Why This Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border rounded-lg p-8 shadow-sm"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Sparkles className="text-lime" />
            {isCombined ? 'Why This Combo Works for You' : 'Why This Path Works for You'}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-3 px-4 font-semibold">Trait</th>
                  <th className="text-left py-3 px-4 font-semibold">Match</th>
                </tr>
              </thead>
              <tbody>
                {paths[0].traitMatches?.map((trait, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 text-muted-foreground">{trait.trait}</td>
                    <td className="py-3 px-4 font-medium">{trait.match}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Example Week */}
        {paths[0].weekExample && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border rounded-lg p-8 shadow-sm"
          >
            <h2 className="text-3xl font-bold mb-6">What It Looks Like (Example Week)</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-3 px-4 font-semibold">Day</th>
                    <th className="text-left py-3 px-4 font-semibold">Task</th>
                    <th className="text-left py-3 px-4 font-semibold">Tool</th>
                  </tr>
                </thead>
                <tbody>
                  {paths[0].weekExample.map((day, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4 font-medium text-primary">{day.day}</td>
                      <td className="py-3 px-4">{day.task}</td>
                      <td className="py-3 px-4 text-muted-foreground">{day.tool}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        )}

        {/* Revenue Streams */}
        {paths[0].revenueStreams && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border rounded-lg p-8 shadow-sm"
          >
            <h2 className="text-3xl font-bold mb-6">Revenue Streams You Build</h2>

            <div className="grid gap-4">
              {paths.flatMap((path) => path.revenueStreams || []).map((stream, index) => (
                <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime to-green-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{stream.name}</h3>
                    <p className="text-muted-foreground">{stream.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Launch Path */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border rounded-lg p-8 shadow-sm"
        >
          <h2 className="text-3xl font-bold mb-6">Launch Path</h2>

          <div className="space-y-8">
            {paths.map((path, pathIndex) => (
              <div key={path.id}>
                {isCombined && (
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="text-3xl">{path.icon}</span>
                    {path.title}
                  </h3>
                )}

                <div className="space-y-4">
                  {path.quickLaunchSteps.map((step) => (
                    <div key={step.step} className="flex gap-4 p-4 bg-muted rounded-lg">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${path.gradient} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Ready to Begin CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-lime via-green-400 to-emerald-500 rounded-lg p-12 text-center text-gray-900"
        >
          <Rocket className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's turn this plan into reality and start building your AI-powered income streams
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => router.push('/choose-path')}
              size="lg"
              className="bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-900"
            >
              <ArrowLeft className="mr-2" size={20} />
              Change Selection
            </Button>

            <Button
              onClick={() => router.push('/ready-to-begin')}
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 h-14 text-lg font-semibold"
            >
              I'm Ready!
              <Sparkles className="ml-2" size={20} />
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
