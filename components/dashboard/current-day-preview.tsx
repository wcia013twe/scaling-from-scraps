'use client';

import { motion } from 'framer-motion';
import { useDashboardStore } from '@/lib/stores/dashboard-store';
import { BookOpen, Clock, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export function CurrentDayPreview() {
  const { currentDay, getDayStatus, inProgressDays } = useDashboardStore();
  const status = getDayStatus(currentDay);
  const progress = inProgressDays.get(currentDay);

  // Mock lesson data (you can replace with real data)
  const dayData = {
    title: `Day ${currentDay}: Building Your Foundation`,
    description: 'Learn the essential skills needed to launch your ecommerce business.',
    lessons: [
      { id: 1, title: 'Understanding Your Market', duration: '15 min', completed: progress ? progress.viewedCards >= 1 : false },
      { id: 2, title: 'Product Research Basics', duration: '20 min', completed: progress ? progress.viewedCards >= 2 : false },
      { id: 3, title: 'Finding Suppliers', duration: '25 min', completed: progress ? progress.viewedCards >= 3 : false },
    ],
    totalLessons: 3,
    estimatedTime: '60 min',
  };

  const completedLessons = dayData.lessons.filter(l => l.completed).length;
  const progressPercent = (completedLessons / dayData.totalLessons) * 100;

  const isLocked = status === 'locked';

  return (
    <div className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card border rounded-xl shadow-sm h-full flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-br from-[#003ac9]/5 to-[#adff02]/5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isLocked
                  ? 'bg-gray-200'
                  : 'bg-gradient-to-br from-[#003ac9] to-blue-500'
              }`}>
                {isLocked ? (
                  <Lock className="w-6 h-6 text-gray-500" />
                ) : (
                  <BookOpen className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold">Current Day</h3>
                <p className="text-sm text-muted-foreground">Day {currentDay}</p>
              </div>
            </div>
            {!isLocked && (
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : status === 'in-progress'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-lime-100 text-[#003ac9]'
              }`}>
                {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Ready'}
              </div>
            )}
          </div>

          {!isLocked && (
            <>
              <h4 className="text-xl font-bold mb-2">{dayData.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{dayData.description}</p>

              {/* Progress Bar */}
              {status === 'in-progress' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{progressPercent.toFixed(0)}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
              )}
            </>
          )}

          {isLocked && (
            <div className="text-center py-4">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Complete previous days to unlock Day {currentDay}
              </p>
            </div>
          )}
        </div>

        {/* Lessons List */}
        {!isLocked && (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Today's Lessons
                </h5>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{dayData.estimatedTime}</span>
                </div>
              </div>

              <div className="space-y-3">
                {dayData.lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border transition-all ${
                      lesson.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-muted/30 border-border hover:border-[#003ac9]/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        lesson.completed
                          ? 'bg-green-500'
                          : 'bg-white border-2 border-gray-300'
                      }`}>
                        {lesson.completed && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                        {!lesson.completed && (
                          <span className="text-xs font-semibold text-gray-500">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm mb-1 ${
                          lesson.completed ? 'text-green-700' : ''
                        }`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="p-6 border-t bg-muted/30">
              <Link href={`/dashboard/day/${currentDay}`}>
                <Button
                  className="w-full bg-gradient-to-r from-[#003ac9] to-blue-500 hover:from-[#0029a1] hover:to-blue-600"
                  size="lg"
                >
                  {status === 'completed' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Review Day {currentDay}
                    </>
                  ) : status === 'in-progress' ? (
                    <>
                      Continue Day {currentDay}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Start Day {currentDay}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </Link>

              {status === 'in-progress' && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  {completedLessons} of {dayData.totalLessons} lessons completed
                </p>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
