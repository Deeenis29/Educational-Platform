/*
  # CodeHive Learning Platform - Seed Data
  Demo categories, courses, roadmaps, and events for MVP demonstration.
  Note: Demo user accounts are created separately via auth.
*/

-- Insert categories
INSERT INTO categories (name, slug, description, icon, color) VALUES
  ('Programación', 'programacion', 'Desarrollo de software y aplicaciones', 'Code', '#4F46E5'),
  ('Electricidad Industrial', 'electricidad-industrial', 'Sistemas eléctricos industriales', 'Zap', '#F59E0B'),
  ('Automatización', 'automatizacion', 'Automatización de procesos industriales', 'Settings', '#06B6D4'),
  ('PLC & SCADA', 'plc-scada', 'Controladores lógicos programables', 'Cpu', '#10B981'),
  ('Inteligencia Artificial', 'inteligencia-artificial', 'IA, Machine Learning y Deep Learning', 'Brain', '#8B5CF6'),
  ('Ciberseguridad', 'ciberseguridad', 'Seguridad informática y redes', '#EF4444', 'Shield'),
  ('Cloud Computing', 'cloud-computing', 'Computación en la nube y DevOps', 'Cloud', '#3B82F6'),
  ('Diseño CAD', 'diseno-cad', 'Diseño asistido por computadora', 'PenTool', '#EC4899'),
  ('Robótica', 'robotica', 'Robótica industrial y programación', 'Bot', '#F97316'),
  ('Data Analytics', 'data-analytics', 'Análisis de datos y visualización', 'BarChart', '#14B8A6'),
  ('Marketing Digital', 'marketing-digital', 'Marketing online y redes sociales', 'TrendingUp', '#A855F7'),
  ('UX/UI', 'ux-ui', 'Diseño de experiencia e interfaces', 'Layers', '#06B6D4'),
  ('Impresión 3D', 'impresion-3d', 'Modelado e impresión 3D', 'Box', '#84CC16'),
  ('Mantenimiento Industrial', 'mantenimiento-industrial', 'Mantenimiento preventivo y correctivo', 'Wrench', '#64748B')
ON CONFLICT (slug) DO NOTHING;

-- Insert roadmaps
INSERT INTO roadmaps (title, slug, description, icon, color, level, estimated_months, is_featured) VALUES
  ('Frontend Developer', 'frontend-developer', 'Conviértete en desarrollador frontend completo dominando HTML, CSS, JavaScript, TypeScript y React', 'Monitor', '#4F46E5', 'beginner', 8, true),
  ('Backend Developer', 'backend-developer', 'Aprende a construir APIs robustas y escalables con Node.js, bases de datos y arquitecturas modernas', 'Server', '#06B6D4', 'intermediate', 10, true),
  ('DevOps Engineer', 'devops-engineer', 'Domina Linux, Docker, CI/CD y Cloud Computing para automatizar el ciclo de vida del software', 'GitBranch', '#10B981', 'advanced', 12, true),
  ('Inteligencia Artificial', 'inteligencia-artificial', 'Aprende Python, Machine Learning, Deep Learning y LLMs para proyectos de IA reales', 'Brain', '#8B5CF6', 'intermediate', 10, true),
  ('Automatización Industrial', 'automatizacion-industrial', 'Domina electricidad, PLC, SCADA y sensores industriales para automatizar procesos', 'Settings', '#F59E0B', 'beginner', 9, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert roadmap steps for Frontend Developer
INSERT INTO roadmap_steps (roadmap_id, title, description, order_index, is_required) VALUES
  ((SELECT id FROM roadmaps WHERE slug = 'frontend-developer'), 'HTML Fundamentals', 'Estructura semántica, formularios y accesibilidad', 1, true),
  ((SELECT id FROM roadmaps WHERE slug = 'frontend-developer'), 'CSS & Diseño Web', 'Flexbox, Grid, animaciones y diseño responsivo', 2, true),
  ((SELECT id FROM roadmaps WHERE slug = 'frontend-developer'), 'JavaScript ES6+', 'Variables, funciones, promesas, async/await y DOM', 3, true),
  ((SELECT id FROM roadmaps WHERE slug = 'frontend-developer'), 'TypeScript', 'Tipos, interfaces, genéricos y decoradores', 4, true),
  ((SELECT id FROM roadmaps WHERE slug = 'frontend-developer'), 'React', 'Componentes, hooks, contexto y optimización', 5, true),
  ((SELECT id FROM roadmaps WHERE slug = 'frontend-developer'), 'Next.js', 'SSR, SSG, API Routes y deployment', 6, false);

-- Insert roadmap steps for Backend Developer
INSERT INTO roadmap_steps (roadmap_id, title, description, order_index, is_required) VALUES
  ((SELECT id FROM roadmaps WHERE slug = 'backend-developer'), 'Node.js Fundamentos', 'Event loop, módulos y npm', 1, true),
  ((SELECT id FROM roadmaps WHERE slug = 'backend-developer'), 'Bases de Datos', 'PostgreSQL, MongoDB y Redis', 2, true),
  ((SELECT id FROM roadmaps WHERE slug = 'backend-developer'), 'APIs REST & GraphQL', 'Diseño de APIs, autenticación y documentación', 3, true),
  ((SELECT id FROM roadmaps WHERE slug = 'backend-developer'), 'Arquitectura de Software', 'Microservicios, DDD y clean architecture', 4, false);

-- Insert roadmap steps for DevOps
INSERT INTO roadmap_steps (roadmap_id, title, description, order_index, is_required) VALUES
  ((SELECT id FROM roadmaps WHERE slug = 'devops-engineer'), 'Linux para DevOps', 'Comandos, scripting y administración de servidores', 1, true),
  ((SELECT id FROM roadmaps WHERE slug = 'devops-engineer'), 'Docker & Contenedores', 'Imágenes, volúmenes, redes y compose', 2, true),
  ((SELECT id FROM roadmaps WHERE slug = 'devops-engineer'), 'CI/CD Pipelines', 'GitHub Actions, Jenkins y automatización de despliegues', 3, true),
  ((SELECT id FROM roadmaps WHERE slug = 'devops-engineer'), 'Cloud Computing', 'AWS, GCP o Azure: servicios esenciales', 4, false);

-- Insert roadmap steps for IA
INSERT INTO roadmap_steps (roadmap_id, title, description, order_index, is_required) VALUES
  ((SELECT id FROM roadmaps WHERE slug = 'inteligencia-artificial'), 'Python para IA', 'Pandas, NumPy y visualización de datos', 1, true),
  ((SELECT id FROM roadmaps WHERE slug = 'inteligencia-artificial'), 'Machine Learning', 'Algoritmos clásicos, scikit-learn y validación', 2, true),
  ((SELECT id FROM roadmaps WHERE slug = 'inteligencia-artificial'), 'Deep Learning', 'Redes neuronales, TensorFlow y PyTorch', 3, true),
  ((SELECT id FROM roadmaps WHERE slug = 'inteligencia-artificial'), 'LLMs y GenAI', 'GPT, fine-tuning y aplicaciones con LangChain', 4, false);

-- Insert roadmap steps for Automatización Industrial
INSERT INTO roadmap_steps (roadmap_id, title, description, order_index, is_required) VALUES
  ((SELECT id FROM roadmaps WHERE slug = 'automatizacion-industrial'), 'Electricidad Industrial', 'Fundamentos eléctricos, tableros y seguridad', 1, true),
  ((SELECT id FROM roadmaps WHERE slug = 'automatizacion-industrial'), 'PLC Siemens', 'Programación en Ladder, FBD y STL', 2, true),
  ((SELECT id FROM roadmaps WHERE slug = 'automatizacion-industrial'), 'SCADA & HMI', 'Supervisión y control de procesos industriales', 3, true),
  ((SELECT id FROM roadmaps WHERE slug = 'automatizacion-industrial'), 'Sensores e Instrumentación', 'Tipos de sensores, calibración y conexión', 4, false);
