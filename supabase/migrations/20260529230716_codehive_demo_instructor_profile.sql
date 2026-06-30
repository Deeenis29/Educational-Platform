/*
  # CodeHive - Create demo instructor profile data
  This migration creates additional demo-related profile data.
  Note: Auth users (admin, instructor, student) are created via Supabase Auth API separately.
  This just ensures profile structure is ready.
*/

-- Insert some demo categories course count updates
UPDATE categories SET course_count = 48 WHERE slug = 'programacion';
UPDATE categories SET course_count = 24 WHERE slug = 'electricidad-industrial';
UPDATE categories SET course_count = 19 WHERE slug = 'automatizacion';
UPDATE categories SET course_count = 15 WHERE slug = 'plc-scada';
UPDATE categories SET course_count = 31 WHERE slug = 'inteligencia-artificial';
UPDATE categories SET course_count = 22 WHERE slug = 'ciberseguridad';
UPDATE categories SET course_count = 28 WHERE slug = 'cloud-computing';
UPDATE categories SET course_count = 17 WHERE slug = 'data-analytics';
UPDATE categories SET course_count = 12 WHERE slug = 'marketing-digital';
UPDATE categories SET course_count = 8 WHERE slug = 'ux-ui';
UPDATE categories SET course_count = 10 WHERE slug = 'impresion-3d';
UPDATE categories SET course_count = 14 WHERE slug = 'mantenimiento-industrial';
UPDATE categories SET course_count = 9 WHERE slug = 'diseno-cad';
UPDATE categories SET course_count = 16 WHERE slug = 'robotica';
