import { Instructor, VideoClass, User } from "./types";

export const MOCK_USER: User = {
  id: "u1",
  name: "Alex Doe",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  progress: 65,
  streak: 12,
};

export const INSTRUCTORS: Instructor[] = [
  {
    id: "inst-1",
    name: "Sarah Chen",
    category: "Yoga",
    skillLevel: "All Levels",
    profileImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&h=500&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: 128,
    hourlyRate: 45,
    subscriptionPrice: 19.99,
    bio: "Certified Vinyasa teacher helping professionals find their flow and relieve stress through mindful movement.",
    tags: ["Vinyasa", "Mindfulness", "Breathwork"],
    brandColor: "from-[#112a20] via-[#112a20]/90",
    ongoingCourse: {
      title: "Summer Mind-Body Reset (Week 2 of 4)",
      description: "A comprehensive 4-week program focusing on connecting breath to movement. We are currently in week 2, diving deep into balance and core stability.",
      requiresCatchUp: true,
      introVideoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
      duration: "4 Weeks",
      status: "In Progress",
      schedule: [
        { day: "Mon", time: "08:00 AM", type: "Live Flow" },
        { day: "Wed", time: "08:00 AM", type: "Core Focus" },
        { day: "Fri", time: "09:00 AM", type: "Restorative" }
      ],
      relatedDetails: [
        { label: "Level", value: "Intermediate" },
        { label: "Equipment", value: "Yoga Mat, Blocks" },
        { label: "Goal", value: "Flexibility & Balance" }
      ]
    },
    catchUpPlan: {
      title: "Week 1 Foundation Catch-up",
      description: "If you're joining the Summer Reset now, watch this quick intro and complete the essential week 1 foundation flows before attending the next live session. This will ensure you understand the core cues and terminology.",
      introVideoUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=600&auto=format&fit=crop",
      steps: [
        { title: "Introduction to Summer Reset", duration: "5 min", type: "Video", thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop" },
        { title: "Foundation Vinyasa Flow", duration: "45 min", type: "Class", thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop" },
        { title: "Core & Balance Terminology Guide", duration: "10 min", type: "Reading", thumbnail: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=600&auto=format&fit=crop" }
      ]
    },
    standardCourses: [
      {
        id: "crs-1",
        title: "Vinyasa for Beginners",
        description: "A complete foundational course for those who want to learn at their own pace without joining the live cohorts. Covers everything from basic downward dog to full sun salutations.",
        thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
        modules: [
          { title: "Breath & Movement", duration: "25 min" },
          { title: "Sun Salutation A Breakdown", duration: "30 min" },
          { title: "Standing Poses & Alignment", duration: "35 min" },
          { title: "Full Beginner Flow", duration: "45 min" }
        ]
      },
      {
        id: "crs-2",
        title: "Advanced Arm Balances",
        description: "Take your practice to the next level with this step-by-step masterclass on arm balances. Prerequisites: Solid core strength and chaturanga.",
        thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
        modules: [
          { title: "Wrist Prep & Core Activation", duration: "20 min" },
          { title: "Crow Pose Secrets", duration: "35 min" },
          { title: "Flying Pigeon Masterclass", duration: "40 min" }
        ]
      }
    ]
  },
  {
    id: "inst-2",
    name: "Marcus Johnson",
    category: "HIIT",
    skillLevel: "Advanced",
    profileImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&h=500&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 245,
    hourlyRate: 60,
    subscriptionPrice: 24.99,
    bio: "Ex-athlete specializing in high-intensity functional training to build explosive power and endurance.",
    tags: ["Functional", "Cardio", "Bodyweight"],
    brandColor: "from-[#2d1b14] via-[#2d1b14]/90",
  },
  {
    id: "inst-3",
    name: "Elena Rodriguez",
    category: "Strength",
    skillLevel: "Intermediate",
    profileImage: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=500&h=500&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: 94,
    hourlyRate: 50,
    subscriptionPrice: 15.99,
    bio: "Strength and conditioning coach focused on proper form, injury prevention, and progressive overload.",
    tags: ["Powerlifting", "Core", "Mobility"],
    brandColor: "from-[#2d141a] via-[#2d141a]/90",
  },
  {
    id: "inst-4",
    name: "David Kim",
    category: "Calisthenics",
    skillLevel: "Advanced",
    profileImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=500&h=500&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: 312,
    hourlyRate: 55,
    subscriptionPrice: 21.99,
    bio: "Master your bodyweight with structured progressions from basic pull-ups to the planche and front lever.",
    tags: ["Bodyweight", "Gymnastics", "Skills"],
    brandColor: "from-[#12272e] via-[#12272e]/90",
  },
  {
    id: "inst-5",
    name: "Anna Petrova",
    category: "Pilates",
    skillLevel: "Beginner",
    profileImage: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=500&h=500&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviews: 87,
    hourlyRate: 40,
    subscriptionPrice: 14.99,
    bio: "Classical mat pilates instructor helping you build a strong foundation and long, lean muscles.",
    tags: ["Core", "Flexibility", "Low Impact"],
    brandColor: "from-[#18182b] via-[#18182b]/90",
  }
];

export const MOCK_CLASSES: VideoClass[] = [
  {
    id: "c-1",
    title: "Morning Sun Salutations Live",
    instructorId: "inst-1",
    duration: 45,
    type: "live",
    viewers: 134,
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    scheduledTime: new Date(Date.now() + 1000 * 60 * 15), // next 15 mins
    week: "Week 4",
  },
  {
    id: "c-3",
    title: "Core Integrity & Balance",
    instructorId: "inst-1",
    duration: 60,
    type: "vod",
    thumbnail: "https://images.unsplash.com/photo-1506126279646-a697353d3166?q=80&w=800&auto=format&fit=crop",
    week: "Week 1"
  },
  {
    id: "c-4",
    title: "Hip Openers & Emotional Release",
    instructorId: "inst-1",
    duration: 50,
    type: "vod",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    week: "Week 1"
  },
  {
    id: "c-5",
    title: "Twists and Detox Flow",
    instructorId: "inst-1",
    duration: 45,
    type: "vod",
    thumbnail: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop",
    week: "Week 2"
  },
  {
    id: "c-6",
    title: "Inversion Practice: Headstands",
    instructorId: "inst-1",
    duration: 40,
    type: "vod",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    week: "Week 3"
  },
  {
    id: "c-7",
    title: "Restorative Evening Wind Down",
    instructorId: "inst-1",
    duration: 30,
    type: "vod",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    week: "Week 3"
  },
  {
    id: "c-2",
    title: "30-Min Full Body HIIT Blast",
    instructorId: "inst-2",
    duration: 30,
    type: "vod",
    thumbnail: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=800&auto=format&fit=crop",
    week: "Week 1"
  }
];
