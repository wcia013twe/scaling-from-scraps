export interface DayContent {
  dayNumber: number;
  title: string;
  goal: string;
  whatYoureMaking: string;
  tools: string[];
  steps: {
    title: string;
    content: string;
    examples?: string[];
  }[];
  completion: string;
  milestones?: string[];
  isMajorMilestone?: boolean;
}

export const dayContent: Record<number, DayContent> = {
  1: {
    dayNumber: 1,
    title: "Make Your First Swipe File",
    goal: "Create something cool people can buy — a list of fun ideas (hooks or captions) that help them post better stuff online.",
    whatYoureMaking: "A swipe file = a list of 50 short, scroll-stopping captions (called \"hooks\") people can copy and use on TikTok or Instagram.",
    tools: [
      "ChatGPT (to write your list)",
      "Canva (to make it look good)",
      "Gumroad (to sell it)"
    ],
    steps: [
      {
        title: "Ask ChatGPT for help",
        content: "Copy and paste this:\n\nGive me 50 hook ideas for Instagram or TikTok Reels. Make it fun, catchy, and good for creators in fashion, food, or tech.\n\nBoom! ChatGPT will give you a goldmine."
      },
      {
        title: "Pick Your Favorite 40–50",
        content: "Copy the ones you love most into a Google Doc or Canva file.",
        examples: [
          "You won't believe what this AI just did…",
          "This meal cost $3 but tastes like $30 🍽️",
          "What I wear when I want to feel like a CEO 💼✨"
        ]
      },
      {
        title: "Make it Look Nice",
        content: "In Canva:\n• Use bold fonts\n• Break it into sections like:\n  ◦ 🔥 Viral Hooks\n  ◦ 🍔 Foodie Captions\n  ◦ 🧢 Fashion Statements\n  ◦ 🤖 AI x Tech Talk\n\nPut your name/handle on the last page."
      },
      {
        title: "Save It",
        content: "Click \"Download\" as PDF. Name it something like:\n\"50 Hooks That Make People Stop Scrolling\""
      },
      {
        title: "Upload to Gumroad",
        content: "• Go to gumroad.com\n• Click \"Start Selling\"\n• Upload your PDF\n• Add a price: $17 (or Pay What You Want)"
      }
    ],
    completion: "DONE! That's your first digital product. You made a thing. It can make you money.",
    milestones: ["First digital product created", "Set up Gumroad store", "Ready to make sales"],
    isMajorMilestone: true
  },
  // Template for future days
  2: {
    dayNumber: 2,
    title: "Day 2 Coming Soon",
    goal: "Stay tuned for tomorrow's lesson!",
    whatYoureMaking: "More exciting content coming soon.",
    tools: [],
    steps: [],
    completion: "Check back tomorrow!"
  }
};

// Add milestone days with highlighted achievements
dayContent[5] = {
  dayNumber: 5,
  title: "Launch Your First Marketing Campaign",
  goal: "Get your product in front of potential customers",
  whatYoureMaking: "Your first marketing funnel",
  tools: [],
  steps: [],
  completion: "Marketing campaign live!",
  milestones: ["First marketing funnel created", "Social media presence established", "Email list started"],
  isMajorMilestone: true
};

dayContent[10] = {
  dayNumber: 10,
  title: "First Sale Milestone",
  goal: "Make your first dollar online",
  whatYoureMaking: "Your first sale",
  tools: [],
  steps: [],
  completion: "You're officially an entrepreneur!",
  milestones: ["First sale achieved", "Customer acquired", "Revenue generated"],
  isMajorMilestone: true
};

dayContent[15] = {
  dayNumber: 15,
  title: "Scale to Multiple Products",
  goal: "Diversify your income streams",
  whatYoureMaking: "Product line expansion",
  tools: [],
  steps: [],
  completion: "Multiple revenue streams active!",
  milestones: ["3+ products launched", "Automated sales funnel", "Recurring revenue setup"],
  isMajorMilestone: true
};

dayContent[20] = {
  dayNumber: 20,
  title: "Build Your Brand",
  goal: "Establish authority in your niche",
  whatYoureMaking: "Complete brand identity",
  tools: [],
  steps: [],
  completion: "Brand established!",
  milestones: ["Professional brand identity", "Growing audience", "Content strategy active"],
  isMajorMilestone: true
};

dayContent[25] = {
  dayNumber: 25,
  title: "Automation & Systems",
  goal: "Work smarter, not harder",
  whatYoureMaking: "Automated business systems",
  tools: [],
  steps: [],
  completion: "Business running on autopilot!",
  milestones: ["Email automation live", "Payment processing automated", "Customer service streamlined"],
  isMajorMilestone: true
};

dayContent[30] = {
  dayNumber: 30,
  title: "Scale to $500K+ Goal",
  goal: "Plan your path to serious revenue",
  whatYoureMaking: "Your scaling strategy",
  tools: [],
  steps: [],
  completion: "Ready to scale big!",
  milestones: ["Proven business model", "Scalable systems in place", "$500K roadmap created"],
  isMajorMilestone: true
};

// Generate placeholder content for remaining days
for (let i = 3; i <= 30; i++) {
  if (!dayContent[i]) {
    dayContent[i] = {
      dayNumber: i,
      title: `Day ${i} Coming Soon`,
      goal: "Stay tuned for this lesson!",
      whatYoureMaking: "More exciting content coming soon.",
      tools: [],
      steps: [],
      completion: "Check back later!"
    };
  }
}
