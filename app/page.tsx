'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Zap, Users } from "lucide-react";
import { ReviewsCarousel } from "@/components/reviews-carousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-lime-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-[#adff02]/20 dark:bg-[#adff02]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-[#003ac9]/20 dark:bg-[#003ac9]/10 rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Logo */}
              <div className="flex items-center gap-4">
                <Image
                  src="/Scaling from Scraps Logo - White and Green.png"
                  alt="Scaling from Scraps"
                  width={80}
                  height={80}
                  className="drop-shadow-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Scaling from Scraps</h1>
                  <p className="text-sm text-muted-foreground">Your 30-Day Ecommerce Journey</p>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003ac9] to-[#adff02]">Ecommerce Empire</span> in 30 Days
                </h2>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Transform your ideas into a thriving online business. Get personalized guidance, actionable steps, and track your progress every day.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/onboarding">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg bg-gradient-to-r from-[#003ac9] to-[#adff02] hover:shadow-xl hover:scale-105 transition-all group"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg border-2 hover:bg-muted"
                  >
                    View Dashboard
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t dark:border-gray-800">
                <div>
                  <p className="text-3xl font-bold text-[#adff02]">30</p>
                  <p className="text-sm text-muted-foreground">Days to Launch</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#003ac9]">5+</p>
                  <p className="text-sm text-muted-foreground">Income Paths</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#adff02]">100%</p>
                  <p className="text-sm text-muted-foreground">Actionable</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Feature Cards */}
              <div className="bg-card border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003ac9] to-blue-500 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Path</h3>
                <p className="text-muted-foreground">
                  Answer a few questions and get a customized roadmap based on your skills, interests, and goals.
                </p>
              </div>

              <div className="bg-card border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#adff02] to-green-500 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-[#003ac9]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
                <p className="text-muted-foreground">
                  Visual journey map, daily tasks, and revenue tracking to keep you motivated and on track.
                </p>
              </div>

              <div className="bg-card border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Coach</h3>
                <p className="text-muted-foreground">
                  Get instant answers and guidance from Steve, your personal AI business coach available 24/7.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-7xl mx-auto px-6 py-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Success Stories from <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003ac9] to-[#adff02]">Real People</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See how others transformed their lives in just 30 days
            </p>
          </div>
          <ReviewsCarousel />
        </motion.div>

        {/* Social Proof / Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-7xl mx-auto px-6 py-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Join entrepreneurs building their dreams from scratch 🚀
          </p>
        </motion.div>
      </main>
    </div>
  );
}
