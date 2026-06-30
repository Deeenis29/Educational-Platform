export type UserRole = 'admin' | 'student' | 'instructor';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  bio: string;
  role: UserRole;
  headline: string;
  website: string;
  points: number;
  level: number;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  course_count: number;
  created_at: string;
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseStatus = 'draft' | 'pending' | 'published' | 'rejected';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: string;
  instructor_id: string;
  price: number;
  original_price: number;
  level: CourseLevel;
  duration_hours: number;
  image_url: string;
  trailer_url: string;
  status: CourseStatus;
  is_free: boolean;
  has_certificate: boolean;
  rating: number;
  review_count: number;
  student_count: number;
  language: string;
  objectives: string[];
  requirements: string[];
  tags: string[];
  commercial_model: 'commission' | 'purchased';
  commission_rate: number;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: Category;
  instructor?: Profile;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string;
  pdf_url: string;
  duration_minutes: number;
  order_index: number;
  is_preview: boolean;
  type: 'video' | 'pdf' | 'exercise' | 'quiz' | 'project';
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'active' | 'completed' | 'refunded';
  progress_percentage: number;
  amount_paid: number;
  payment_id: string;
  enrolled_at: string;
  completed_at: string | null;
  course?: Course;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_code: string;
  issued_at: string;
  course?: Course;
}

export interface Review {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: Profile;
}

export interface Roadmap {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  level: string;
  estimated_months: number;
  is_featured: boolean;
  created_at: string;
  steps?: RoadmapStep[];
}

export interface RoadmapStep {
  id: string;
  roadmap_id: string;
  title: string;
  description: string;
  order_index: number;
  is_required: boolean;
  course_id: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'live' | 'presential';
  instructor_id: string;
  course_id: string | null;
  scheduled_at: string;
  duration_minutes: number;
  meeting_url: string;
  location: string;
  max_attendees: number;
  attendee_count: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  created_at: string;
  instructor?: Profile;
}

export interface Payment {
  id: string;
  user_id: string;
  course_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'refunded';
  payment_method: string;
  external_id: string;
  instructor_amount: number;
  platform_amount: number;
  created_at: string;
  course?: Course;
}
