export interface User {
  id: string;
  name: string;
  avatar: string;
  progress: number; // 0-100
  streak: number;
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
}
