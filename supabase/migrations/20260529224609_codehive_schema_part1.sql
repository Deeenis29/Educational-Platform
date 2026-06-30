/*
  # CodeHive Learning Platform - Schema Part 1
  Core tables: profiles, categories, courses, modules, lessons
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  avatar_url text DEFAULT '',
  bio text DEFAULT '',
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'student', 'instructor')),
  headline text DEFAULT '',
  website text DEFAULT '',
  points integer DEFAULT 0,
  level integer DEFAULT 1,
  is_approved boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_all" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '',
  color text DEFAULT '#4F46E5',
  course_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_select_all" ON categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "categories_insert_admin" ON categories FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "categories_update_admin" ON categories FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')) WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "categories_delete_admin" ON categories FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  short_description text DEFAULT '',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  instructor_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  price decimal(10,2) DEFAULT 0,
  original_price decimal(10,2) DEFAULT 0,
  level text DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  duration_hours integer DEFAULT 0,
  image_url text DEFAULT '',
  trailer_url text DEFAULT '',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'published', 'rejected')),
  is_free boolean DEFAULT false,
  has_certificate boolean DEFAULT true,
  rating decimal(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  student_count integer DEFAULT 0,
  language text DEFAULT 'Español',
  objectives text[] DEFAULT '{}',
  requirements text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  commercial_model text DEFAULT 'commission' CHECK (commercial_model IN ('commission', 'purchased')),
  commission_rate decimal(5,2) DEFAULT 30.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_select_published" ON courses FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "courses_select_own" ON courses FOR SELECT TO authenticated USING (instructor_id = auth.uid());
CREATE POLICY "courses_select_admin" ON courses FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "courses_insert_instructor" ON courses FOR INSERT TO authenticated WITH CHECK (instructor_id = auth.uid() AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('instructor', 'admin')));
CREATE POLICY "courses_update_own" ON courses FOR UPDATE TO authenticated USING (instructor_id = auth.uid()) WITH CHECK (instructor_id = auth.uid());
CREATE POLICY "courses_update_admin" ON courses FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')) WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "courses_delete_own" ON courses FOR DELETE TO authenticated USING (instructor_id = auth.uid());
CREATE POLICY "courses_delete_admin" ON courses FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "modules_select_published" ON modules FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM courses WHERE id = course_id AND status = 'published'));
CREATE POLICY "modules_insert_instructor" ON modules FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM courses WHERE id = course_id AND instructor_id = auth.uid()));
CREATE POLICY "modules_update_instructor" ON modules FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM courses WHERE id = course_id AND instructor_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM courses WHERE id = course_id AND instructor_id = auth.uid()));
CREATE POLICY "modules_delete_instructor" ON modules FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM courses WHERE id = course_id AND instructor_id = auth.uid()));
