export interface RevenueStream {
  id: string;
  name: string;
  icon: string;
  color: string;
  amount: number;
  percentOfTotal: number;
  growth: number; // percentage change from previous period
  transactions: number;
}

export interface WeeklyMetric {
  week: string;
  revenue: number;
  transactions: number;
}

export interface UpcomingOpportunity {
  id: string;
  title: string;
  client: string;
  amount: number;
  date: string;
  type: 'training' | 'automation' | 'template' | 'consulting';
  status: 'confirmed' | 'pending' | 'proposal';
}

export interface Client {
  id: string;
  name: string;
  totalRevenue: number;
  projects: number;
  lastPayment: string;
  status: 'active' | 'inactive';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  client: string;
  amount: number;
  stream: string;
}

export interface RevenueGoal {
  monthly: number;
  weekly: number;
  quarterly: number;
}

export interface RevenueSummary {
  currentMonth: number;
  currentWeek: number;
  lastWeek: number;
  lastMonth: number;
  goals: RevenueGoal;
  totalClients: number;
  activeProjects: number;
  contentEngagement: number; // Total content views/interactions
  yearToDateSales: number;
  lifetimeSales: number;
}

// Mock Data
export const revenueGoals: RevenueGoal = {
  monthly: 45000,
  weekly: 10000,
  quarterly: 135000,
};

export const revenueStreams: RevenueStream[] = [
  {
    id: 'ai-training',
    name: 'AI Training Sessions',
    icon: '🎓',
    color: 'from-purple-500 to-pink-500',
    amount: 12500,
    percentOfTotal: 35,
    growth: 15.3,
    transactions: 8,
  },
  {
    id: 'automation',
    name: 'Automation Packages',
    icon: '⚙️',
    color: 'from-blue-500 to-cyan-500',
    amount: 9800,
    percentOfTotal: 27,
    growth: 22.8,
    transactions: 12,
  },
  {
    id: 'dashboards',
    name: 'Notion Dashboards',
    icon: '📊',
    color: 'from-green-500 to-emerald-500',
    amount: 7200,
    percentOfTotal: 20,
    growth: -5.2,
    transactions: 15,
  },
  {
    id: 'templates',
    name: 'Template Sales',
    icon: '📋',
    color: 'from-indigo-500 to-purple-500',
    amount: 4300,
    percentOfTotal: 12,
    growth: 8.5,
    transactions: 23,
  },
  {
    id: 'consulting',
    name: 'Consulting Hours',
    icon: '💼',
    color: 'from-orange-500 to-red-500',
    amount: 2200,
    percentOfTotal: 6,
    growth: 12.1,
    transactions: 5,
  },
];

export const weeklyMetrics: WeeklyMetric[] = [
  { week: 'Week 1', revenue: 8200, transactions: 12 },
  { week: 'Week 2', revenue: 9500, transactions: 15 },
  { week: 'Week 3', revenue: 11200, transactions: 18 },
  { week: 'Week 4', revenue: 12800, transactions: 21 },
  { week: 'This Week', revenue: 14200, transactions: 24 },
];

export const upcomingOpportunities: UpcomingOpportunity[] = [
  {
    id: '1',
    title: 'AI Training Workshop - Marketing Team',
    client: 'TechCorp Solutions',
    amount: 3500,
    date: '2025-11-15',
    type: 'training',
    status: 'confirmed',
  },
  {
    id: '2',
    title: 'Client Onboarding Automation Setup',
    client: 'Design Agency Pro',
    amount: 2200,
    date: '2025-11-18',
    type: 'automation',
    status: 'confirmed',
  },
  {
    id: '3',
    title: 'Custom Dashboard Build',
    client: 'StartupHub Inc',
    amount: 1800,
    date: '2025-11-20',
    type: 'template',
    status: 'pending',
  },
  {
    id: '4',
    title: 'AI Strategy Consulting',
    client: 'Retail Express',
    amount: 4200,
    date: '2025-11-22',
    type: 'consulting',
    status: 'proposal',
  },
  {
    id: '5',
    title: 'Zapier Workflow Package',
    client: 'Legal Partners LLC',
    amount: 1500,
    date: '2025-11-25',
    type: 'automation',
    status: 'confirmed',
  },
];

export const clients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    totalRevenue: 8900,
    projects: 3,
    lastPayment: '2025-11-05',
    status: 'active',
  },
  {
    id: '2',
    name: 'Design Agency Pro',
    totalRevenue: 6200,
    projects: 2,
    lastPayment: '2025-11-03',
    status: 'active',
  },
  {
    id: '3',
    name: 'StartupHub Inc',
    totalRevenue: 5400,
    projects: 4,
    lastPayment: '2025-10-28',
    status: 'active',
  },
  {
    id: '4',
    name: 'Retail Express',
    totalRevenue: 4100,
    projects: 1,
    lastPayment: '2025-11-01',
    status: 'active',
  },
  {
    id: '5',
    name: 'Legal Partners LLC',
    totalRevenue: 3800,
    projects: 2,
    lastPayment: '2025-10-15',
    status: 'inactive',
  },
  {
    id: '6',
    name: 'Marketing Maven',
    totalRevenue: 7600,
    projects: 3,
    lastPayment: '2025-11-02',
    status: 'active',
  },
];

export const recentTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-11-08',
    description: 'AI Training Workshop',
    client: 'TechCorp Solutions',
    amount: 3200,
    stream: 'ai-training',
  },
  {
    id: '2',
    date: '2025-11-07',
    description: 'Zapier Automation Package',
    client: 'Design Agency Pro',
    amount: 1800,
    stream: 'automation',
  },
  {
    id: '3',
    date: '2025-11-06',
    description: 'Template Bundle Sale',
    client: 'StartupHub Inc',
    amount: 497,
    stream: 'templates',
  },
  {
    id: '4',
    date: '2025-11-06',
    description: 'Custom Notion Dashboard',
    client: 'Marketing Maven',
    amount: 2200,
    stream: 'dashboards',
  },
  {
    id: '5',
    date: '2025-11-05',
    description: 'Consulting Session',
    client: 'Retail Express',
    amount: 800,
    stream: 'consulting',
  },
  {
    id: '6',
    date: '2025-11-04',
    description: 'AI Training - Sales Team',
    client: 'TechCorp Solutions',
    amount: 3500,
    stream: 'ai-training',
  },
  {
    id: '7',
    date: '2025-11-03',
    description: 'Template Sale x3',
    client: 'Various',
    amount: 147,
    stream: 'templates',
  },
  {
    id: '8',
    date: '2025-11-02',
    description: 'Onboarding Automation',
    client: 'Legal Partners LLC',
    amount: 2400,
    stream: 'automation',
  },
];

export const revenueSummary: RevenueSummary = {
  currentMonth: 36000,
  currentWeek: 14200,
  lastWeek: 12800,
  lastMonth: 32500,
  goals: revenueGoals,
  totalClients: 6,
  activeProjects: 15,
  contentEngagement: 47823, // Total views/interactions across all content
  yearToDateSales: 324500,
  lifetimeSales: 892000,
};

// Utility functions
export const getTotalRevenue = (): number => {
  return revenueStreams.reduce((sum, stream) => sum + stream.amount, 0);
};

export const getMonthlyProgress = (): number => {
  return (revenueSummary.currentMonth / revenueGoals.monthly) * 100;
};

export const getWeeklyProgress = (): number => {
  return (revenueSummary.currentWeek / revenueGoals.weekly) * 100;
};

export const getWeeklyGrowth = (): number => {
  if (revenueSummary.lastWeek === 0) return 0;
  return ((revenueSummary.currentWeek - revenueSummary.lastWeek) / revenueSummary.lastWeek) * 100;
};

export const getMonthlyGrowth = (): number => {
  if (revenueSummary.lastMonth === 0) return 0;
  return ((revenueSummary.currentMonth - revenueSummary.lastMonth) / revenueSummary.lastMonth) * 100;
};
