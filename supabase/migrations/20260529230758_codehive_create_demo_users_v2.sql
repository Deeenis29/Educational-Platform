/*
  # CodeHive - Create demo users via DO blocks
  Creates demo accounts for admin, instructor, and student roles.
  Password for all: CodeHive123
*/

DO $$
DECLARE
  admin_id uuid := gen_random_uuid();
  instructor_id uuid := gen_random_uuid();
  student_id uuid := gen_random_uuid();
BEGIN
  -- Admin user
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@codehive.com') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_super_admin
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      admin_id, 'authenticated', 'authenticated',
      'admin@codehive.com',
      crypt('CodeHive123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Admin CodeHive"}',
      false
    );
    INSERT INTO profiles (id, full_name, email, role, is_approved)
    VALUES (admin_id, 'Admin CodeHive', 'admin@codehive.com', 'admin', true);
  END IF;

  -- Instructor user
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'instructor@codehive.com') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_super_admin
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      instructor_id, 'authenticated', 'authenticated',
      'instructor@codehive.com',
      crypt('CodeHive123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Carlos Mendoza"}',
      false
    );
    INSERT INTO profiles (id, full_name, email, role, headline, bio, is_approved)
    VALUES (instructor_id, 'Carlos Mendoza', 'instructor@codehive.com', 'instructor', 'Senior Frontend Developer', 'Ex-Google. 8+ años en React y JavaScript moderno.', true);
  END IF;

  -- Student user
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'estudiante@codehive.com') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_super_admin
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      student_id, 'authenticated', 'authenticated',
      'estudiante@codehive.com',
      crypt('CodeHive123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Estudiante Demo"}',
      false
    );
    INSERT INTO profiles (id, full_name, email, role, is_approved, points)
    VALUES (student_id, 'Estudiante Demo', 'estudiante@codehive.com', 'student', true, 450);
  END IF;
END $$;
