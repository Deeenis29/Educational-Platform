import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, Star, Users, Award, BookOpen, Zap, Brain,
  Monitor, Server, Settings, Code, ChevronDown, ChevronUp,
  Check, Globe, Clock, Shield, TrendingUp, Video, MapPin
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Course, Category } from '../../types';
import CourseCard from '../../components/ui/CourseCard';

const DEMO_COURSES: Course[] = [
  { id: '1', title: 'React desde Cero', slug: 'react-desde-cero', description: '', short_description: 'Aprende React moderno con hooks y mejores prácticas', category_id: '', instructor_id: '', price: 49, original_price: 99, level: 'beginner', duration_hours: 28, image_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.8, review_count: 1240, student_count: 8420, language: 'Español', objectives: [], requirements: [], tags: [], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: '1', name: 'Programación', slug: 'programacion', description: '', icon: '', color: '#4F46E5', course_count: 0, created_at: '' }, instructor: { id: '1', full_name: 'Carlos Mendoza', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '2', title: 'Electricidad Industrial Básica', slug: 'electricidad-industrial-basica', description: '', short_description: 'Fundamentos de electricidad industrial y seguridad', category_id: '', instructor_id: '', price: 59, original_price: 120, level: 'beginner', duration_hours: 32, image_url: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.9, review_count: 876, student_count: 5230, language: 'Español', objectives: [], requirements: [], tags: [], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: '2', name: 'Electricidad Industrial', slug: 'electricidad-industrial', description: '', icon: '', color: '#F59E0B', course_count: 0, created_at: '' }, instructor: { id: '2', full_name: 'Ing. Roberto Vargas', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '3', title: 'PLC Siemens Nivel 1', slug: 'plc-siemens-nivel-1', description: '', short_description: 'Programación profesional de PLCs Siemens S7-1200', category_id: '', instructor_id: '', price: 79, original_price: 150, level: 'intermediate', duration_hours: 40, image_url: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.7, review_count: 543, student_count: 3120, language: 'Español', objectives: [], requirements: [], tags: [], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: '3', name: 'PLC & SCADA', slug: 'plc-scada', description: '', icon: '', color: '#10B981', course_count: 0, created_at: '' }, instructor: { id: '3', full_name: 'Ing. Ana Torres', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '4', title: 'Inteligencia Artificial Aplicada', slug: 'inteligencia-artificial-aplicada', description: '', short_description: 'Machine Learning y Deep Learning para proyectos reales', category_id: '', instructor_id: '', price: 89, original_price: 180, level: 'intermediate', duration_hours: 50, image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.8, review_count: 921, student_count: 6780, language: 'Español', objectives: [], requirements: [], tags: [], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: '4', name: 'Inteligencia Artificial', slug: 'inteligencia-artificial', description: '', icon: '', color: '#8B5CF6', course_count: 0, created_at: '' }, instructor: { id: '4', full_name: 'Dr. Luis Sánchez', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
];

const CATEGORIES = [
  { icon: <Code className="w-5 h-5" />, name: 'Programación', count: 48, color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
  { icon: <Zap className="w-5 h-5" />, name: 'Electricidad Industrial', count: 24, color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  { icon: <Settings className="w-5 h-5" />, name: 'Automatización', count: 19, color: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' },
  { icon: <Monitor className="w-5 h-5" />, name: 'PLC & SCADA', count: 15, color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
  { icon: <Brain className="w-5 h-5" />, name: 'Inteligencia Artificial', count: 31, color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  { icon: <Shield className="w-5 h-5" />, name: 'Ciberseguridad', count: 22, color: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
  { icon: <Server className="w-5 h-5" />, name: 'Cloud Computing', count: 28, color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
  { icon: <TrendingUp className="w-5 h-5" />, name: 'Data Analytics', count: 17, color: 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' },
];

const TESTIMONIALS = [
  { name: 'María González', role: 'Técnica en Automatización', company: 'AutoTech MX', text: 'Gracias a CodeHive pude certificarme en PLC Siemens y conseguir un aumento del 40%. El contenido es de muy alta calidad y los instructores responden rápidamente.', rating: 5, avatar: 'M' },
  { name: 'Jorge Ramírez', role: 'Desarrollador Frontend', company: 'StartupHub LATAM', text: 'El roadmap de Frontend Developer fue clave para estructurar mi aprendizaje. Conseguí mi primer empleo remoto 3 meses después de completar el curso de React.', rating: 5, avatar: 'J' },
  { name: 'Laura Díaz', role: 'Ingeniera en Mantenimiento', company: 'IndustrialGroup', text: 'La mejor inversión que hice en mi carrera. Los cursos de electricidad industrial tienen proyectos reales que apliqué directamente en mi trabajo.', rating: 5, avatar: 'L' },
  { name: 'Andrés Morales', role: 'Especialista en IA', company: 'DataCorp', text: 'La calidad del curso de Machine Learning es comparable a programas de postgrado pero a una fracción del costo. Excelente plataforma.', rating: 5, avatar: 'A' },
];

const FAQS = [
  { q: '¿Cómo funciona el acceso a los cursos?', a: 'Una vez que compras un curso, tienes acceso de por vida. Puedes verlo cuando quieras, en cualquier dispositivo, a tu propio ritmo.' },
  { q: '¿Los certificados son reconocidos?', a: 'Nuestros certificados digitales incluyen un código único verificable. Son valorados por empresas tecnológicas e industriales en toda Latinoamérica.' },
  { q: '¿Puedo convertirme en instructor?', a: 'Sí. Si eres experto en tu área, puedes aplicar como instructor. Revisamos tu perfil y en 48h te damos acceso para crear y publicar tus cursos.' },
  { q: '¿Tienen clases en vivo?', a: 'Sí. Muchos cursos incluyen sesiones en vivo con el instructor. También organizamos webinars y eventos presenciales en diferentes ciudades.' },
  { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos tarjetas de crédito/débito, transferencia bancaria y Mercado Pago. Los pagos son procesados de forma segura con cifrado SSL.' },
];

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-cyan-900" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">+15,000 estudiantes activos</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Aprende habilidades reales con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
                expertos de la industria
              </span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
              Cursos técnicos, tecnológicos e industriales diseñados para acelerar tu crecimiento profesional.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                to="/catalogo"
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
              >
                Explorar Cursos <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/instructores"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-all border border-white/20 backdrop-blur-sm"
              >
                <Play className="w-4 h-4" /> Convertirme en Instructor
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {[
                { value: '350+', label: 'Cursos' },
                { value: '80+', label: 'Instructores' },
                { value: '15K+', label: 'Estudiantes' },
                { value: '4.8', label: 'Valoración' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">React desde Cero</p>
                    <p className="text-white/60 text-xs">Carlos Mendoza</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-amber-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">$49</span>
                  </div>
                </div>

                {/* Progress bars */}
                {['Módulo 1: Fundamentos', 'Módulo 2: Hooks', 'Módulo 3: Router'].map((mod, i) => (
                  <div key={mod} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/80 text-xs">{mod}</span>
                      <span className="text-white/60 text-xs">{[100, 65, 20][i]}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full transition-all"
                        style={{ width: `${[100, 65, 20][i]}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-white/60 text-xs ml-1">4.8 (1,240)</span>
                  </div>
                  <span className="text-xs text-white/60 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> 8,420
                  </span>
                </div>
              </div>

              {/* Floating badge - certificate */}
              <div className="absolute -bottom-4 -left-6 bg-white dark:bg-gray-800 rounded-xl px-3 py-2 shadow-xl flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-gray-800 dark:text-white">Certificado Digital</span>
              </div>

              {/* Floating badge - live */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl px-3 py-2 shadow-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold text-gray-800 dark:text-white">Clase en Vivo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">El Problema</span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                El conocimiento técnico está disperso y desactualizado
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Muchas personas desean aprender habilidades prácticas, pero encuentran contenido disperso, poco actualizado o sin acompañamiento profesional. Los cursos genéricos no sirven para la industria real.
              </p>
              <ul className="space-y-3">
                {['Contenido desactualizado que no refleja la industria real', 'Sin soporte ni comunidad de aprendizaje', 'Sin certificaciones reconocidas por empresas', 'Sin rutas de aprendizaje estructuradas'].map(item => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">La Solución</span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                CodeHive conecta expertos con quienes quieren crecer
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Conectamos estudiantes con expertos y empresas para aprender mediante cursos estructurados, clases en vivo y experiencias prácticas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: <BookOpen className="w-6 h-6 text-indigo-600" />, title: 'Cursos Online', desc: 'Aprende a tu ritmo con proyectos reales', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
                  { icon: <Video className="w-6 h-6 text-cyan-600" />, title: 'Sesiones en Vivo', desc: 'Interactúa con expertos en tiempo real', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
                  { icon: <MapPin className="w-6 h-6 text-amber-600" />, title: 'Formación Presencial', desc: 'Talleres y eventos en tu ciudad', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                ].map(card => (
                  <div key={card.title} className={`${card.bg} rounded-xl p-4`}>
                    <div className="mb-2">{card.icon}</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{card.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Aprende lo que necesitas</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Categorías Destacadas</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Especialidades técnicas y tecnológicas de alta demanda</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                to={`/catalogo?categoria=${cat.name}`}
                className="group flex flex-col items-center gap-3 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{cat.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{cat.count} cursos</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/catalogo" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 justify-center">
              Ver todas las categorías <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Simple y efectivo</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">¿Cómo Funciona?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', icon: <BookOpen className="w-6 h-6" />, title: 'Explora cursos', desc: 'Navega nuestro catálogo de más de 350 cursos técnicos y tecnológicos.' },
              { step: '02', icon: <Award className="w-6 h-6" />, title: 'Compra o inscríbete', desc: 'Adquiere el curso con pago seguro o accede a contenido gratuito.' },
              { step: '03', icon: <Clock className="w-6 h-6" />, title: 'Aprende a tu ritmo', desc: 'Acceso 24/7 desde cualquier dispositivo. Tú decides cuándo y cómo.' },
              { step: '04', icon: <Globe className="w-6 h-6" />, title: 'Obtén certificación', desc: 'Recibe tu certificado digital verificable al completar el curso.' },
            ].map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-indigo-100 dark:bg-indigo-900/50 z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-indigo-600/20">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-indigo-400 mb-1">{step.step}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Más populares</span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">Cursos Destacados</h2>
            </div>
            <Link to="/catalogo" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline hidden sm:flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEMO_COURSES.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-indigo-900 dark:bg-indigo-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">¿Por Qué CodeHive?</h2>
            <p className="text-indigo-200">Todo lo que necesitas para aprender y crecer profesionalmente</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Clock className="w-6 h-6" />, title: 'Acceso 24/7', desc: 'Aprende en cualquier momento y desde cualquier dispositivo', color: 'text-cyan-400' },
              { icon: <Users className="w-6 h-6" />, title: 'Profesores Especializados', desc: 'Instructores activos en la industria con experiencia comprobada', color: 'text-amber-400' },
              { icon: <Award className="w-6 h-6" />, title: 'Certificados Digitales', desc: 'Certificados verificables reconocidos por empresas líderes', color: 'text-green-400' },
              { icon: <Video className="w-6 h-6" />, title: 'Clases en Vivo', desc: 'Sesiones interactivas en tiempo real con preguntas y respuestas', color: 'text-indigo-400' },
              { icon: <BookOpen className="w-6 h-6" />, title: 'Recursos Descargables', desc: 'PDFs, ejercicios y proyectos para seguir practicando', color: 'text-pink-400' },
              { icon: <TrendingUp className="w-6 h-6" />, title: 'Roadmaps Personalizados', desc: 'Rutas de aprendizaje estructuradas para tu área objetivo', color: 'text-yellow-400' },
              { icon: <Globe className="w-6 h-6" />, title: 'Comunidad Global', desc: 'Conecta con miles de estudiantes y profesionales', color: 'text-teal-400' },
              { icon: <Shield className="w-6 h-6" />, title: 'Garantía de Calidad', desc: 'Cursos revisados y aprobados por nuestro equipo editorial', color: 'text-orange-400' },
            ].map(benefit => (
              <div key={benefit.title} className="flex gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className={`flex-shrink-0 mt-0.5 ${benefit.color}`}>{benefit.icon}</div>
                <div>
                  <h4 className="font-semibold text-white text-sm mb-1">{benefit.title}</h4>
                  <p className="text-indigo-200 text-xs leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Lo que dicen nuestros estudiantes</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Historias de Éxito</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Preguntas Frecuentes</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/faqs" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              Ver todas las preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Comienza hoy tu próxima habilidad profesional
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Únete a más de 15,000 estudiantes que ya están transformando sus carreras.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/catalogo"
              className="flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-all shadow-lg"
            >
              <BookOpen className="w-4 h-4" /> Explorar Cursos
            </Link>
            <Link
              to="/registro"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-all border border-white/20"
            >
              Crear Cuenta Gratis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-white/70 text-xs">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Sin tarjeta requerida</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Acceso inmediato</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Cancela cuando quieras</span>
          </div>
        </div>
      </section>
    </div>
  );
}
