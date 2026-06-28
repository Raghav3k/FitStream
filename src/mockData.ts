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
    profileImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=256&h=256&auto=format&fit=crop",
    rating: 4.9,
    reviews: 128,
    hourlyRate: 45,
    subscriptionPrice: 19.99,
    bio: "Certified Vinyasa teacher helping professionals find their flow and relieve stress through mindful movement.",
    tags: ["Vinyasa", "Mindfulness", "Breathwork"],
  },
  {
    id: "inst-2",
    name: "Marcus Johnson",
    category: "HIIT",
    skillLevel: "Advanced",
    profileImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=256&h=256&auto=format&fit=crop",
    rating: 4.8,
    reviews: 245,
    hourlyRate: 60,
    subscriptionPrice: 24.99,
    bio: "Ex-athlete specializing in high-intensity functional training to build explosive power and endurance.",
    tags: ["Functional", "Cardio", "Bodyweight"],
  },
  {
    id: "inst-3",
    name: "Elena Rodriguez",
    category: "Strength",
    skillLevel: "Intermediate",
    profileImage: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=256&h=256&auto=format&fit=crop",
    rating: 4.7,
    reviews: 94,
    hourlyRate: 50,
    subscriptionPrice: 15.99,
    bio: "Strength and conditioning coach focused on proper form, injury prevention, and progressive overload.",
    tags: ["Powerlifting", "Core", "Mobility"],
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
  },
  {
    id: "c-2",
    title: "30-Min Full Body HIIT Blast",
    instructorId: "inst-2",
    duration: 30,
    type: "vod",
    thumbnail: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "c-3",
    title: "Core Integrity & Balance",
    instructorId: "inst-1",
    duration: 60,
    type: "vod",
    thumbnail: "https://images.unsplash.com/photo-1506126279646-a697353d3166?q=80&w=800&auto=format&fit=crop",
  }
];
