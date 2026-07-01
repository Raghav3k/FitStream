export interface User {
  id: string;
  name: string;
  avatar: string;
  progress: number; // 0-100
  streak: number;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  thumbnail: string;
}

export interface Instructor {
  id: string;
  name: string;
  category: string;
  skillLevel: string;
  profileImage: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  subscriptionPrice: number;
  bio: string;
  tags: string[];
  brandColor?: string;
  coverImage?: string;
  ongoingCourse?: {
    title: string;
    description: string;
    requiresCatchUp: boolean;
    introVideoUrl: string;
    duration: string;
    status: string;
    schedule?: Array<{ day: string; time: string; type: string }>;
    relatedDetails?: Array<{ label: string; value: string }>;
  };
  catchUpPlan?: {
    title: string;
    description: string;
    introVideoUrl: string;
    steps: Array<{ title: string; duration: string; type: string; thumbnail?: string }>;
  };
  standardCourses?: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    modules: Array<{ title: string; duration: string; thumbnail?: string }>;
  }>;
}

export interface VideoClass {
  id: string;
  title: string;
  instructorId: string;
  duration: number; // in mins
  type: 'live' | 'vod';
  thumbnail: string;
  viewers?: number;
  scheduledTime?: Date;
  week?: string;
}
