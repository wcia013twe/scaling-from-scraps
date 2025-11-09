'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reviews = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Former Teacher',
    avatar: '👩‍🏫',
    rating: 5,
    text: 'I went from zero knowledge to launching my first product in 30 days! The daily guidance kept me accountable and the AI coach answered all my beginner questions.',
    revenue: '$12,500',
    timeframe: 'First 60 days',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'College Student',
    avatar: '👨‍🎓',
    rating: 5,
    text: 'As a busy student, I needed something structured but flexible. This program fit perfectly into my schedule. Now I have a side income that covers my rent!',
    revenue: '$8,200',
    timeframe: 'First 45 days',
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'Stay-at-Home Mom',
    avatar: '👩‍👧',
    rating: 5,
    text: 'The journey map visualization made everything feel achievable. Breaking it into 30 days removed the overwhelm. My store is now my full-time income!',
    revenue: '$18,900',
    timeframe: 'First 90 days',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Software Engineer',
    avatar: '👨‍💻',
    rating: 5,
    text: 'I loved the AI tools integration! Being able to automate product descriptions and marketing saved me hours. Launched 3 products in my first month.',
    revenue: '$15,400',
    timeframe: 'First month',
  },
  {
    id: 5,
    name: 'Emma Rodriguez',
    role: 'Graphic Designer',
    avatar: '🎨',
    rating: 5,
    text: 'The personalized path matched my design skills perfectly. I started selling custom products and the revenue tracker kept me motivated every single day!',
    revenue: '$22,100',
    timeframe: 'First 2 months',
  },
  {
    id: 6,
    name: 'James Thompson',
    role: 'Retired Veteran',
    avatar: '🎖️',
    rating: 5,
    text: 'At 52, I thought I was too old for ecommerce. This program proved me wrong. The step-by-step approach made it easy to follow and build confidence.',
    revenue: '$9,800',
    timeframe: 'First 60 days',
  },
];

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentReview = reviews[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative bg-card border rounded-2xl shadow-xl overflow-hidden">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 opacity-10">
          <Quote className="w-20 h-20 text-[#003ac9]" />
        </div>

        <div className="relative min-h-[400px] p-8 md:p-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="space-y-6"
            >
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#adff02] text-[#adff02]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xl md:text-2xl text-foreground leading-relaxed italic">
                "{currentReview.text}"
              </p>

              {/* Revenue Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#adff02]/20 to-green-500/20 border border-[#adff02] rounded-full">
                <span className="text-sm font-semibold text-[#003ac9]">
                  💰 {currentReview.revenue} earned in {currentReview.timeframe}
                </span>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#003ac9] to-blue-500 flex items-center justify-center text-3xl">
                  {currentReview.avatar}
                </div>
                <div>
                  <p className="font-bold text-lg text-foreground">{currentReview.name}</p>
                  <p className="text-muted-foreground">{currentReview.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="rounded-full hover:bg-[#003ac9] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="rounded-full hover:bg-[#003ac9] hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-[#003ac9] w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
