'use client';

import { motion } from 'framer-motion';
import { useDashboardStore } from '@/lib/stores/dashboard-store';
import { Calendar, TrendingUp, Target, Award, BookOpen, CheckCircle2, Clock, Zap, ListChecks, Rocket } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function WeeklySummary() {
  const { currentDay, completedDays, streakCount, totalDays } = useDashboardStore();

  // Calculate weekly progress (assume 7 days per week)
  const currentWeek = Math.ceil(currentDay / 7);
  const totalWeeks = Math.ceil(totalDays / 7);
  const weekStartDay = (currentWeek - 1) * 7 + 1;
  const weekEndDay = Math.min(currentWeek * 7, totalDays);

  // Calculate this week's completed days
  const weekCompletedDays = completedDays.filter(
    day => day >= weekStartDay && day <= weekEndDay
  ).length;
  const weekProgress = (weekCompletedDays / 7) * 100;

  // Mock data for weekly stats (you can replace with real data)
  const weeklyStats = {
    lessonsCompleted: weekCompletedDays * 3, // Assume 3 lessons per day
    totalLessons: 21, // 7 days * 3 lessons
    timeSpent: weekCompletedDays * 45, // minutes
    tasksCompleted: weekCompletedDays * 5,
    skillsLearned: ['Product Research', 'Supplier Sourcing', 'Store Setup', 'Marketing Basics'],
  };

  // Major actions for the week (you can replace with dynamic data based on week)
  const majorActions = [
    {
      title: 'Set up your online store',
      description: 'Choose your platform (Shopify, WooCommerce) and configure basic settings',
      status: weekCompletedDays >= 2 ? 'completed' : 'pending',
      priority: 'high',
    },
    {
      title: 'Research your first 3 product ideas',
      description: 'Use tools like AliExpress, Google Trends, and competitor analysis',
      status: weekCompletedDays >= 4 ? 'completed' : weekCompletedDays >= 2 ? 'in-progress' : 'pending',
      priority: 'high',
    },
    {
      title: 'Contact potential suppliers',
      description: 'Reach out to at least 5 suppliers and request samples',
      status: weekCompletedDays >= 5 ? 'completed' : weekCompletedDays >= 3 ? 'in-progress' : 'pending',
      priority: 'medium',
    },
    {
      title: 'Create your brand identity',
      description: 'Design logo, choose colors, and define your brand voice',
      status: weekCompletedDays >= 6 ? 'completed' : weekCompletedDays >= 4 ? 'in-progress' : 'pending',
      priority: 'medium',
    },
    {
      title: 'Launch your first marketing campaign',
      description: 'Set up social media accounts and create your first 5 posts',
      status: weekCompletedDays >= 7 ? 'completed' : weekCompletedDays >= 5 ? 'in-progress' : 'pending',
      priority: 'high',
    },
  ];

  return (
    <div className="h-full overflow-y-auto space-y-8 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-2">Week {currentWeek} Summary</h2>
        <p className="text-lg text-muted-foreground">
          Day {weekStartDay} - {weekEndDay} of your journey
        </p>
      </motion.div>

      {/* Week Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#003ac9] via-blue-500 to-[#adff02] dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 mb-1">Weekly Progress</p>
            <p className="text-5xl font-bold">{weekCompletedDays} / 7</p>
            <p className="text-white/70 text-lg mt-1">Days Completed</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Calendar className="w-5 h-5" />
              <span className="font-bold text-lg">{weekProgress.toFixed(0)}%</span>
            </div>
          </div>
        </div>
        <Progress value={weekProgress} className="h-3 bg-white/20" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Lessons Completed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Lessons</p>
              <p className="text-3xl font-bold">{weeklyStats.lessonsCompleted}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>of {weeklyStats.totalLessons} this week</span>
          </div>
        </motion.div>

        {/* Tasks Completed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tasks</p>
              <p className="text-3xl font-bold">{weeklyStats.tasksCompleted}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Completed</span>
          </div>
        </motion.div>

        {/* Time Spent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Time</p>
              <p className="text-3xl font-bold">{weeklyStats.timeSpent}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Minutes</span>
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Streak</p>
              <p className="text-3xl font-bold">{streakCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Days in a row</span>
          </div>
        </motion.div>
      </div>

      {/* Skills Learned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card border rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-lime to-green-500 flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold">Skills Learned This Week</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {weeklyStats.skillsLearned.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="px-4 py-2 bg-gradient-to-br from-[#adff02] to-[#8cd902] rounded-full text-[#003ac9] font-semibold"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Major Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-card border rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#003ac9] to-[#adff02] flex items-center justify-center">
            <ListChecks className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold">Major Actions This Week</h3>
        </div>
        <div className="space-y-4">
          {majorActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`p-4 rounded-xl border-2 transition-all ${
                action.status === 'completed'
                  ? 'bg-gradient-to-r from-[#adff02]/20 to-[#adff02]/10 border-[#adff02]'
                  : action.status === 'in-progress'
                  ? 'bg-gradient-to-r from-[#003ac9]/10 to-[#003ac9]/5 border-[#003ac9]'
                  : 'bg-muted/50 border-border'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {action.status === 'completed' ? (
                    <div className="w-6 h-6 rounded-full bg-[#adff02] flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-[#003ac9]" strokeWidth={3} />
                    </div>
                  ) : action.status === 'in-progress' ? (
                    <div className="w-6 h-6 rounded-full bg-[#003ac9] flex items-center justify-center">
                      <Clock size={14} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className={`font-semibold ${
                        action.status === 'completed'
                          ? 'text-[#003ac9]'
                          : action.status === 'in-progress'
                          ? 'text-[#003ac9]'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {action.title}
                    </h4>
                    {action.priority === 'high' && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-semibold rounded">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm ${
                      action.status === 'completed' ? 'text-muted-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {action.description}
                  </p>
                  {action.status === 'completed' && (
                    <p className="text-xs text-[#adff02] font-medium mt-2">✓ Completed</p>
                  )}
                  {action.status === 'in-progress' && (
                    <p className="text-xs text-[#003ac9] font-medium mt-2">⏳ In Progress</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Week Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="bg-card border rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-lime" />
          This Week's Focus
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          You're building the foundation of your ecommerce business. This week focuses on understanding
          the market, finding your niche, and learning the basics of product research and supplier relationships.
          Keep up the momentum and stay consistent with your daily lessons!
        </p>
      </motion.div>

      {/* Motivational Message */}
      {weekProgress >= 70 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center shadow-lg"
        >
          <p className="text-2xl font-bold mb-2">🎉 Amazing Progress!</p>
          <p className="text-lg">You're crushing this week! Keep it up and you'll hit your goals in no time.</p>
        </motion.div>
      )}
    </div>
  );
}
