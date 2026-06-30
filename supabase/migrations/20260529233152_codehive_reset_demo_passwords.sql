/*
  # Reset Demo Users Passwords
  Updates passwords for demo accounts to ensure they work correctly.
  Password for all: CodeHive123
*/

UPDATE auth.users 
SET 
  encrypted_password = crypt('CodeHive123', gen_salt('bf')),
  updated_at = NOW()
WHERE email IN ('admin@codehive.com', 'instructor@codehive.com', 'estudiante@codehive.com');
