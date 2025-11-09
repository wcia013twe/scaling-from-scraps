'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Target, Wrench, CheckCircle2, Sparkles, Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dayContent } from '@/lib/data/day-content';
import { useDashboardStore } from '@/lib/stores/dashboard-store';
import { Header } from '@/components/header';

export default function DayPage() {
  const params = useParams();
  const router = useRouter();
  const dayNumber = parseInt(params.dayNumber as string);
  const content = dayContent[dayNumber];
  const { completeDay, getDayStatus } = useDashboardStore();

  const status = getDayStatus(dayNumber);

  // Only check if content exists, all days are accessible
  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-lime-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Day Not Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This day doesn't exist.
            </p>
            <Button onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="mr-2" size={16} />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleComplete = () => {
    completeDay(dayNumber);
    router.push('/dashboard');
  };

  // Suggested videos and AI tools data (can be moved to day-content.ts later)
  const suggestedVideos = [
    { id: 1, title: 'How to Find Winning Products in 2024', channel: 'Ecom Experts', duration: '12:34', thumbnail: '🎯', url: '#' },
    { id: 2, title: 'Supplier Negotiation Masterclass', channel: 'Business Growth', duration: '18:22', thumbnail: '💼', url: '#' },
    { id: 3, title: 'Product Research Tools Demo', channel: 'Tech Reviews', duration: '15:45', thumbnail: '🔍', url: '#' },
  ];

  const aiTools = [
    { id: 1, name: 'ChatGPT', description: 'Generate product descriptions, marketing copy, and customer service responses', icon: '🤖', link: 'https://chat.openai.com' },
    { id: 2, name: 'Perplexity AI', description: 'Research market trends, competitor analysis, and industry insights', icon: '🔍', link: 'https://perplexity.ai' },
    { id: 3, name: 'Canva AI', description: 'Design product images, social media posts, and marketing materials', icon: '🎨', link: 'https://canva.com' },
    { id: 4, name: 'Claude', description: 'Analyze business strategies, create content plans, and brainstorm ideas', icon: '✨', link: 'https://claude.ai' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-lime-50">
      <Header>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#003ac9]" />
            <h1 className="text-xl font-semibold">Day {dayNumber}</h1>
          </div>
        </div>
      </Header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-[#adff02] to-[#8cd902] border-none">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-[#003ac9]" />
                <CardTitle className="text-3xl text-[#003ac9]">
                  Day {dayNumber}: {content.title}
                </CardTitle>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Goal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur border-[#adff02]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-[#003ac9]" />
                <CardTitle className="text-xl">Goal</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{content.goal}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* What You're Making Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur border-[#003ac9]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#adff02]" />
                <CardTitle className="text-xl">What You're Making</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{content.whatYoureMaking}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tools Section */}
        {content.tools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Wrench className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-xl">Tools You'll Use</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {content.tools.map((tool, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#adff02] mt-1">•</span>
                      <span className="text-lg">{tool}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Steps Section */}
        {content.steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur border-[#003ac9]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#003ac9]">
                  Step-by-Step Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.steps.map((step, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#adff02] flex items-center justify-center text-[#003ac9] font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="whitespace-pre-line text-muted-foreground">{step.content}</p>
                        {step.examples && step.examples.length > 0 && (
                          <div className="mt-3 space-y-1 pl-4 border-l-2 border-[#adff02]">
                            {step.examples.map((example, exIndex) => (
                              <p key={exIndex} className="text-sm text-muted-foreground">
                                • {example}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Suggested Videos Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur border-red-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Play className="w-6 h-6 text-red-600" />
                <CardTitle className="text-xl">Suggested Videos</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Watch these videos to deepen your understanding of today's concepts
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestedVideos.map((video) => (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-3xl flex-shrink-0 shadow-md">
                      {video.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-lg mb-1 group-hover:text-[#003ac9] transition-colors">
                        {video.title}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{video.channel}</span>
                        <span>•</span>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 backdrop-blur border-purple-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-xl">AI Tools to Use</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Leverage these AI tools to work smarter and accelerate your progress
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {aiTools.map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-4 rounded-lg border bg-white dark:bg-gray-900 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 flex items-center justify-center text-2xl flex-shrink-0">
                      {tool.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold group-hover:text-[#003ac9] transition-colors">
                          {tool.name}
                        </p>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Completion Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="bg-gradient-to-r from-[#003ac9] to-[#0029a1] border-none text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8" />
                <p className="text-xl font-semibold">{content.completion}</p>
              </div>
              <Button
                size="lg"
                className="bg-[#adff02] hover:bg-[#8cd902] text-[#003ac9] font-bold w-full"
                onClick={handleComplete}
              >
                Mark Day {dayNumber} as Complete
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
