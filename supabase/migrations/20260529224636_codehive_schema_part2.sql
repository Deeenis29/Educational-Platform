/*
  # CodeHive Learning Platform - Schema Part 2
  Tables: lessons, enrollments, lesson_progress, favorites, reviews, certificates
*/

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'refunded')),
  progress_percentage integer DEFAULT 0,
  amount_paid decimal(10,2) DEFAULT 0,
  payment_id text DEFAULT '',
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrollments_select_own" ON enrollments FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "enrollments_select_instructor" ON enrollments FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM courses WHERE id = course_id AND instructor_id = auth.uid()));
CREATE POLICY "enrollments_select_admin" ON enrollments FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "enrollments_insert_own" ON enrollments FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "enrollments_update_own" ON enrollments FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  video_url text DEFAULT '',
  pdf_url text DEFAULT '',
  duration_minutes integer DEFAULT 0,
  order_index integer DEFAULT 0,
  is_preview boolean DEFAULT false,
  type text DEFAULT 'video' CHECK (type IN ('video', 'pdf', 'exercise', 'quiz', 'project')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lessons_select_preview" ON lessons FOR SELECT TO anon, authenticated USING (is_preview = true);
CREATE POLICY "lessons_select_enrolled" ON lessons FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM enrollments WHERE course_id = lessons.course_id AND user_id = auth.uid() AND status = 'active'));
CREATE POLICY "lessons_select_instructor" ON lessons FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM courses WHERE id = lessons.course_id AND instructor_id = auth.uid()));
CREATE POLICY "lessons_insert_instructor" ON lessons FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM courses WHERE id = course_id AND instructor_id = auth.uid()));
CREATE POLICY "lessons_update_instructor" ON lessons FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM courses WHERE id = course_id AND instructor_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM courses WHERE id = course_id AND instructor_id = auth.uid()));
CREATE POLICY "lessons_delete_instructor" ON lessons FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM courses WHERE id = course_id AND instructor_id = auth.uid()));

CREATE TABLE IF NOT EXISTS lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "progress_select_own" ON lesson_progress FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "progress_insert_own" ON lesson_progress FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "progress_update_own" ON lesson_progress FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "favorites_select_own" ON favorites FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "favorites_insert_own" ON favorites FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "favorites_delete_own" ON favorites FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews_select_all" ON reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "reviews_insert_enrolled" ON reviews FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() AND EXISTS (SELECT 1 FROM enrollments WHERE course_id = reviews.course_id AND user_id = auth.uid()));
CREATE POLICY "reviews_update_own" ON reviews FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  certificate_code text UNIQUE NOT NULL DEFAULT gen_random_uuid()::text,
  issued_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "certificates_select_own" ON certificates FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "certificates_select_public" ON certificates FOR SELECT TO anon USING (true);
CREATE POLICY "certificates_insert_own" ON certificates FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
