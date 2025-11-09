'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Zap, Users, Video, MessageSquare, BookOpen, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import Link from 'next/link';

const PREMIUM_TIERS = [
  {
    id: 'accelerator',
    name: 'Accelerator',
    price: 297,
    period: 'one-time',
    icon: Zap,
    popular: false,
    description: 'Fast-track your journey with premium resources',
    features: [
      'Priority email support (24-hour response)',
      'Access to exclusive video masterclasses',
      'Advanced AI coaching features',
      'Weekly group Q&A sessions',
      'Premium templates & resources library',
      'Revenue calculator & forecasting tools',
      'Private community access',
      'Lifetime updates to course materials',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'elite',
    name: 'Elite Coaching',
    price: 997,
    period: 'one-time',
    icon: Crown,
    popular: true,
    description: 'Get personal guidance from an expert coach',
    features: [
      'Everything in Accelerator, plus:',
      '4x One-on-one coaching sessions (60 min)',
      'Personalized business strategy & roadmap',
      'Direct coach access via private Slack',
      'Weekly accountability check-ins',
      'Custom landing page review & feedback',
      'Product selection consultation',
      'Marketing strategy development',
      'Supplier negotiation guidance',
    ],
    color: 'from-[#003ac9] to-[#adff02]',
  },
  {
    id: 'vip',
    name: 'VIP Partnership',
    price: 2497,
    period: '3 months',
    icon: Star,
    popular: false,
    description: 'White-glove service for serious entrepreneurs',
    features: [
      'Everything in Elite Coaching, plus:',
      'Weekly 1-on-1 coaching (12 sessions)',
      'Unlimited messaging support',
      'Done-with-you store setup',
      'Complete brand identity package',
      'Product research & validation',
      'Supplier vetting & negotiations',
      'Marketing campaign creation',
      'Launch day support & monitoring',
      'First 90 days optimization',
    ],
    color: 'from-amber-500 to-orange-500',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Elite Coaching Member',
    image: '👩‍💼',
    content: 'The 1-on-1 coaching sessions were game-changing. My coach helped me avoid so many costly mistakes and I launched in just 3 weeks!',
    revenue: '$12K first month',
  },
  {
    name: 'Marcus Johnson',
    role: 'VIP Partnership Member',
    image: '👨‍💼',
    content: 'Worth every penny. The done-with-you approach meant I could focus on what I do best while the experts handled the technical details.',
    revenue: '$45K in 90 days',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Accelerator Member',
    image: '👩‍🦰',
    content: 'The masterclasses alone paid for the investment. I learned strategies that competitors charge thousands for.',
    revenue: '$8K first month',
  },
];

export default function PremiumPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-lime-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header>
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-xl font-semibold">Premium Tiers</h1>
            <p className="text-sm text-muted-foreground">Accelerate your success</p>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost">Back to Dashboard</Button>
          </Link>
        </div>
      </Header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#003ac9]/10 to-[#adff02]/10 mb-6">
            <Crown className="w-5 h-5 text-[#003ac9]" />
            <span className="text-sm font-semibold text-[#003ac9]">Premium Upgrade</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">
            Take Your Business to the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003ac9] to-[#adff02]">
              Next Level
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get personalized coaching, expert guidance, and premium resources to accelerate your ecommerce success.
          </p>
        </motion.div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {PREMIUM_TIERS.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-card border-2 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all ${
                  tier.popular ? 'border-[#adff02] scale-105' : 'border-border'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#003ac9] to-[#adff02] text-white text-sm font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground ml-2">/ {tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#adff02] flex-shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => setSelectedTier(tier.id)}
                  className={`w-full h-12 text-lg font-semibold ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#003ac9] to-[#adff02] hover:shadow-xl'
                      : ''
                  }`}
                  variant={tier.popular ? 'default' : 'outline'}
                >
                  Get Started
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border rounded-2xl p-12 mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Why Upgrade to Premium?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Faster Results</h4>
              <p className="text-sm text-muted-foreground">
                Launch your business 3x faster with expert guidance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#adff02] to-green-500 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#003ac9]" />
              </div>
              <h4 className="font-bold mb-2">Expert Support</h4>
              <p className="text-sm text-muted-foreground">
                Get personalized help from experienced coaches
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Higher Revenue</h4>
              <p className="text-sm text-muted-foreground">
                Premium members earn 5x more on average
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Exclusive Resources</h4>
              <p className="text-sm text-muted-foreground">
                Access premium templates, tools, and masterclasses
              </p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Success Stories</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="bg-card border rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm mb-4 italic">"{testimonial.content}"</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#adff02]/20 to-green-500/20 rounded-full">
                  <TrendingUp size={14} className="text-[#003ac9]" />
                  <span className="text-sm font-bold text-[#003ac9]">{testimonial.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border rounded-2xl p-12"
        >
          <h3 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h4 className="font-bold mb-2">Can I upgrade from one tier to another?</h4>
              <p className="text-muted-foreground">
                Yes! You can upgrade at any time and we'll credit your previous purchase toward the higher tier.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">What if I'm not satisfied?</h4>
              <p className="text-muted-foreground">
                We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund you in full.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">How soon can I start coaching sessions?</h4>
              <p className="text-muted-foreground">
                Coaching sessions can be scheduled within 24-48 hours of purchase. You'll receive a calendar link to book your sessions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Do I need Premium to succeed?</h4>
              <p className="text-muted-foreground">
                No, the free tier provides everything you need. Premium accelerates your journey and provides personalized support.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
