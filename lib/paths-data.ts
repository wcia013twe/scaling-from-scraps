export interface QuickLaunchStep {
  step: number;
  title: string;
  description: string;
}

export interface RevenueStream {
  name: string;
  description: string;
}

export interface TraitMatch {
  trait: string;
  match: string;
}

export interface WeekDay {
  day: string;
  task: string;
  tool: string;
}

export interface Path {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  shortDesc: string;
  whyItFits: string;
  quickLaunchSteps: QuickLaunchStep[];
  revenueStreams?: RevenueStream[];
  traitMatches?: TraitMatch[];
  weekExample?: WeekDay[];
}

export const paths: Path[] = [
  {
    id: 'ai-training',
    title: 'Private AI Training for Teams',
    icon: '🎓',
    gradient: 'from-purple-500 to-pink-500',
    shortDesc: 'Run 60–90 min AI onboarding workshops for organizations',
    whyItFits: 'One-time delivery, high-ticket ($1K–$5K+ per session), easily repurposed',
    quickLaunchSteps: [
      {
        step: 1,
        title: 'Create training outline',
        description: 'Use ChatGPT to create a training outline (ex: "AI for Productivity for Real Estate Teams")',
      },
      {
        step: 2,
        title: 'Build slide deck',
        description: 'Build a branded slide deck in Canva or Notion',
      },
      {
        step: 3,
        title: 'Record demo',
        description: 'Record a short demo or teaser video with Loom',
      },
      {
        step: 4,
        title: 'Pitch to orgs',
        description: 'Pitch to 3 orgs via warm email or LinkedIn DM',
      },
      {
        step: 5,
        title: 'Upsell support',
        description: 'Upsell monthly "AI Help Desk" support',
      },
    ],
    traitMatches: [
      { trait: 'Target audience', match: 'Small teams/organizations (B2B)' },
      { trait: 'Revenue goal', match: '$500K+ achievable' },
      { trait: 'Time commitment', match: '2 hours/week max' },
      { trait: 'Scalability', match: 'High-ticket, repurposable content' },
      { trait: 'Delivery model', match: 'Build once, deliver many times' },
    ],
    revenueStreams: [
      { name: 'Workshop Sessions', description: '$1K–$5K per 60-90 min session' },
      { name: 'Monthly Retainers', description: 'AI Help Desk support packages' },
      { name: 'Recorded Training', description: 'Sell access to recorded sessions' },
    ],
  },
  {
    id: 'onboarding-automation',
    title: 'Client Onboarding Automation Specialist',
    icon: '⚙️',
    gradient: 'from-blue-500 to-cyan-500',
    shortDesc: 'Set up automated workflows using Zapier, Google Forms, Notion, etc.',
    whyItFits: 'Can sell as a $500–$2K system with templates; low delivery time',
    quickLaunchSteps: [
      {
        step: 1,
        title: 'Choose niche',
        description: 'Pick 1 niche (coaches, agencies, accountants)',
      },
      {
        step: 2,
        title: 'Build SOP',
        description: 'Use ChatGPT to build a reusable SOP and welcome email sequence',
      },
      {
        step: 3,
        title: 'Create demo',
        description: 'Set up a Zapier demo to show process automation',
      },
      {
        step: 4,
        title: 'Package it',
        description: 'Package it as a plug-and-play onboarding kit',
      },
      {
        step: 5,
        title: 'Launch sales',
        description: 'Sell on your site or pitch via LinkedIn/email',
      },
    ],
    traitMatches: [
      { trait: 'Revenue potential', match: '$500–$2K per system' },
      { trait: 'Time investment', match: 'Low ongoing delivery time' },
      { trait: 'Business model', match: 'Template-based, scalable' },
      { trait: 'Target market', match: 'Service businesses needing automation' },
    ],
    revenueStreams: [
      { name: 'Automation Systems', description: '$500–$2K per setup' },
      { name: 'Template Packages', description: 'Pre-built kits for DIY clients' },
      { name: 'Maintenance Plans', description: 'Monthly updates and support' },
    ],
  },
  {
    id: 'notion-dashboards',
    title: 'Digital Business Dashboard Builder',
    icon: '📊',
    gradient: 'from-green-500 to-emerald-500',
    shortDesc: 'Create templated or custom Notion dashboards for business tracking',
    whyItFits: 'High-profit, productizable, and sharable; sell DIY or DFY versions',
    quickLaunchSteps: [
      {
        step: 1,
        title: 'Design layout',
        description: 'Use ChatGPT to design layout: Goals | CRM | Projects | Revenue | Tasks',
      },
      {
        step: 2,
        title: 'Build in Notion',
        description: 'Build in Notion + record a demo',
      },
      {
        step: 3,
        title: 'Launch product',
        description: 'Sell template on Gumroad OR offer custom build for $497+',
      },
      {
        step: 4,
        title: 'Add value',
        description: 'Stack with training or monthly updates',
      },
    ],
    traitMatches: [
      { trait: 'Product type', match: 'Digital templates and custom builds' },
      { trait: 'Pricing model', match: '$497+ for custom, lower for templates' },
      { trait: 'Scalability', match: 'Build once, sell unlimited' },
      { trait: 'Upsells', match: 'Training, updates, customization' },
    ],
    revenueStreams: [
      { name: 'Template Sales', description: 'DIY dashboards on Gumroad' },
      { name: 'Custom Builds', description: '$497+ for personalized setups' },
      { name: 'Training Sessions', description: 'Dashboard mastery workshops' },
    ],
  },
  {
    id: 'zapier-automation',
    title: 'Custom Zapier Automation Packages',
    icon: '🔗',
    gradient: 'from-orange-500 to-red-500',
    shortDesc: 'Build automation workflows for repetitive business tasks',
    whyItFits: 'Automations = huge time-savers; high perceived value',
    quickLaunchSteps: [
      {
        step: 1,
        title: 'Pick workflow',
        description: 'Choose a workflow (ex: "Course Sign-Up → Email → CRM Tag → Slack Ping")',
      },
      {
        step: 2,
        title: 'Plan automation',
        description: 'Use ChatGPT to create the automation plan',
      },
      {
        step: 3,
        title: 'Record walkthrough',
        description: 'Record yourself walking through a sample Zapier setup',
      },
      {
        step: 4,
        title: 'Package offers',
        description: 'Offer prebuilt or custom automations for $500–$2,000',
      },
      {
        step: 5,
        title: 'Create upsells',
        description: 'Stack with SOP or digital dashboard upsells',
      },
    ],
    traitMatches: [
      { trait: 'Value proposition', match: 'Massive time savings for businesses' },
      { trait: 'Pricing', match: '$500–$2,000 per automation' },
      { trait: 'Delivery', match: 'Quick setup, high impact' },
      { trait: 'Expansion', match: 'Natural upsells to other services' },
    ],
    revenueStreams: [
      { name: 'Prebuilt Automations', description: '$500–$1,000 plug-and-play' },
      { name: 'Custom Workflows', description: '$1,000–$2,000 bespoke setups' },
      { name: 'Bundle Packages', description: 'Combined with SOPs and dashboards' },
    ],
  },
  {
    id: 'systems-templates',
    title: 'Systems Starter Kit Templates',
    icon: '📋',
    gradient: 'from-indigo-500 to-purple-500',
    shortDesc: 'Sell bundles of editable SOPs, onboarding docs, checklists',
    whyItFits: 'Build once, sell 100x; perfect for Etsy, Gumroad, or B2B leads',
    quickLaunchSteps: [
      {
        step: 1,
        title: 'Create SOPs',
        description: 'Create SOPs with ChatGPT (ex: "Client Intake SOP for Design Agencies")',
      },
      {
        step: 2,
        title: 'Format templates',
        description: 'Format in Notion or Canva',
      },
      {
        step: 3,
        title: 'Package kits',
        description: 'Sell as editable templates or white-label kits',
      },
      {
        step: 4,
        title: 'Market products',
        description: 'Promote with mockups on IG, LinkedIn, Etsy',
      },
    ],
    traitMatches: [
      { trait: 'Business model', match: 'Digital products with infinite scale' },
      { trait: 'Effort ratio', match: 'Build once, sell repeatedly' },
      { trait: 'Platforms', match: 'Etsy, Gumroad, direct B2B' },
      { trait: 'Marketing', match: 'Visual mockups on social media' },
    ],
    revenueStreams: [
      { name: 'Template Bundles', description: 'SOP packs on marketplaces' },
      { name: 'White-Label Kits', description: 'Agency-ready solutions' },
      { name: 'Custom Templates', description: 'Niche-specific builds' },
    ],
  },
];

export const recommendedPath = 'ai-training';

export const getPathById = (id: string): Path | undefined => {
  return paths.find((path) => path.id === id);
};

export const getPathsByIds = (ids: string[]): Path[] => {
  return paths.filter((path) => ids.includes(path.id));
};
