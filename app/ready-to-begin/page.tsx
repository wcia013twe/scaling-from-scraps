'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Target, TrendingUp, Clock, Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReadyToBeginPage() {
  const router = useRouter();

  // Confetti effect using simple animated particles
  const confettiColors = ['#adff02', '#003ac9', '#ff6b6b', '#4ecdc4', '#ffe66d', '#a8dadc'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: confettiColors[i % confettiColors.length],
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Confetti Animation */}
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: piece.color,
            left: piece.left,
            top: '-20px',
          }}
          animate={{
            y: ['0vh', '100vh'],
            rotate: [0, 360],
            opacity: [1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: piece.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-24 h-24 text-lime mx-auto" />
          </motion.div>

          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to Your Journey!
          </h1>
          <p className="text-2xl text-muted-foreground">
            You're all set to start building your AI-powered income streams
          </p>
        </motion.div>

        {/* Journey Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Your Journey Summary</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Your Goal</h3>
                  <p className="text-muted-foreground">Build $500K+ AI-powered business systems</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Time Commitment</h3>
                  <p className="text-muted-foreground">2 hours per week (flexible schedule)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Income Path</h3>
                  <p className="text-muted-foreground">Private AI Training + Zapier Automation</p>
                </div>
              </div>
            </div>

            {/* Next Steps Preview */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Your Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-lime" />
                  <span>Complete onboarding ✓</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full border-2 border-current flex-shrink-0" />
                  <span>Schedule your kickoff call</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full border-2 border-current flex-shrink-0" />
                  <span>Receive your custom roadmap</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full border-2 border-current flex-shrink-0" />
                  <span>Build your first automation</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-lime to-green-400 rounded-2xl p-8 text-gray-900 mb-8"
        >
          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Check Your Email!</h3>
              <p className="text-lg opacity-90 mb-4">
                We've sent you a welcome email with your personalized action plan, resources, and next steps.
              </p>
              <p className="text-sm opacity-80">
                Don't see it? Check your spam folder or contact support@aiincomecoach.com
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center space-y-6"
        >
          <h3 className="text-2xl font-bold text-foreground">Ready to Take Action?</h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-lg font-semibold">
              <Calendar className="mr-2" size={20} />
              Schedule Kickoff Call
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 h-14 text-lg font-semibold"
              onClick={() => router.push('/dashboard')}
            >
              View Dashboard
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Have questions? Our team is here to help every step of the way
          </p>
        </motion.div>
      </div>
    </div>
  );
}
