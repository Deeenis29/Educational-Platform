import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Clock, Users, Award, Check, Play, Lock, BookOpen,
  Globe, ChevronDown, ChevronUp, ShoppingCart, Heart, Share2, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import StarRating from '../../components/ui/StarRating';

const COURSE_DATA: Record<string, any> = {
  'react-desde-cero': {
    id: '1', title: 'React desde Cero', slug: 'react-desde-cero',
    description: 'Aprende React desde los fundamentos hasta proyectos avanzados. Este curso te enseña React moderno con hooks, Context API, React Router, optimización y las mejores prácticas de la industria. Ideal para desarrolladores que conocen JavaScript y quieren dominar el framework más popular del mundo.',
    price: 49, original_price: 99, level: 'beginner', duration_hours: 28, rating: 4.8, review_count: 1240, student_count: 8420, has_certificate: true, language: 'Español', is_free: false,
    image_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: { name: 'Programación' },
    instructor: { full_name: 'Carlos Mendoza', headline: 'Senior Frontend Developer · 8 años de experiencia', bio: 'Desarrollador Senior con experiencia en empresas como Google y Meta. Especialista en React y el ecosistema JavaScript moderno.', avatar: 'C', students: 28000, courses: 12 },
    objectives: ['Dominar React 18 con Hooks modernos', 'Construir aplicaciones SPA completas', 'Manejar estado global con Context y Zustand', 'Integrar APIs REST y GraphQL', 'Optimizar rendimiento con memoización', 'Desplegar en Vercel y Netlify'],
    requirements: ['Conocimientos básicos de JavaScript', 'HTML y CSS fundamentales', 'Ganas de aprender'],
    modules: [
      { title: 'Módulo 1: Introducción y Setup', lessons: [
        { title: 'Bienvenida al curso', duration: 5, is_preview: true, type: 'video' },
        { title: 'Instalación y configuración del entorno', duration: 12, is_preview: true, type: 'video' },
        { title: 'Tu primer componente React', duration: 18, is_preview: true, type: 'video' },
        { title: 'JSX en profundidad', duration: 22, is_preview: false, type: 'video' },
      ]},
      { title: 'Módulo 2: Componentes y Props', lessons: [
        { title: 'Props y composición', duration: 20, is_preview: false, type: 'video' },
        { title: 'Children y slots', duration: 15, is_preview: false, type: 'video' },
        { title: 'Ejercicio: Construye una card', duration: 30, is_preview: false, type: 'exercise' },
      ]},
      { title: 'Módulo 3: Hooks Esenciales', lessons: [
        { title: 'useState y ciclo de vida', duration: 25, is_preview: false, type: 'video' },
        { title: 'useEffect en detalle', duration: 30, is_preview: false, type: 'video' },
        { title: 'useContext y estado global', duration: 28, is_preview: false, type: 'video' },
        { title: 'Custom Hooks', duration: 35, is_preview: false, type: 'video' },
        { title: 'Quiz: Hooks', duration: 15, is_preview: false, type: 'quiz' },
      ]},
      { title: 'Módulo 4: Proyecto Final', lessons: [
        { title: 'Planificación del proyecto', duration: 10, is_preview: false, type: 'video' },
        { title: 'Construcción paso a paso', duration: 90, is_preview: false, type: 'project' },
        { title: 'Despliegue a producción', duration: 20, is_preview: false, type: 'video' },
      ]},
    ],
    reviews: [
      { name: 'María G.', rating: 5, comment: 'Excelente curso, explica muy bien todos los conceptos.', date: 'Hace 2 semanas' },
      { name: 'Pedro R.', rating: 5, comment: 'El mejor curso de React en español. Muy práctico.', date: 'Hace 1 mes' },
      { name: 'Laura M.', rating: 4, comment: 'Muy buen contenido, podría tener más ejercicios.', date: 'Hace 2 meses' },
    ],
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'SPA'],
    updated_at: '2024-03-15',
  },
};

const FALLBACK_COURSE = COURSE_DATA['react-desde-cero'];

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const course = COURSE_DATA[slug || ''] || { ...FALLBACK_COURSE, title: slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Curso' };

  const totalLessons = course.modules?.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0;
  const previewLessons = course.modules?.flatMap((m: any) => m.lessons).filter((l: any) => l.is_preview) || [];

  const levelLabels: Record<string, string> = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' };

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/curso/${slug}` } });
      return;
    }
    setPurchasing(true);
    await new Promise(r => setTimeout(r, 1500));
    setPurchased(true);
    setPurchasing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Breadcrumb */}
      <div className="bg-indigo-900 dark:bg-gray-950 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <Link to="/catalogo" className="flex items-center gap-1 text-indigo-200 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Catálogo
          </Link>
          <span className="text-indigo-400">/</span>
          <span className="text-indigo-200">{course.category?.name}</span>
          <span className="text-indigo-400">/</span>
          <span className="text-white truncate max-w-xs">{course.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-2.5 py-1 rounded-full font-medium">
                  {course.category?.name}
                </span>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full font-medium">
                  {levelLabels[course.level] || course.level}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">{course.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{course.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">{course.rating}</span>
                  <span>({course.review_count?.toLocaleString()} reseñas)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>{course.student_count?.toLocaleString()} estudiantes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration_hours}h de contenido</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>{course.language}</span>
                </div>
                {course.has_certificate && (
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Certificado incluido</span>
                  </div>
                )}
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {course.instructor?.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{course.instructor?.full_name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{course.instructor?.headline}</p>
                </div>
              </div>
            </div>

            {/* What you'll learn */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Lo que aprenderás</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {course.objectives?.map((obj: string) => (
                  <div key={obj} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Contenido del Curso</h2>
                <span className="text-xs text-gray-500 dark:text-gray-400">{totalLessons} lecciones · {course.duration_hours}h total</span>
              </div>

              <div className="space-y-2">
                {course.modules?.map((module: any, i: number) => (
                  <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenModule(openModule === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{module.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{module.lessons.length} lecciones</p>
                      </div>
                      {openModule === i
                        ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      }
                    </button>

                    {openModule === i && (
                      <div className="border-t border-gray-100 dark:border-gray-700">
                        {module.lessons.map((lesson: any, j: number) => (
                          <div
                            key={j}
                            className={`flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-700 last:border-0 ${lesson.is_preview || purchased ? '' : 'opacity-60'}`}
                          >
                            <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                              lesson.type === 'video' ? 'bg-indigo-50 dark:bg-indigo-900/30' :
                              lesson.type === 'quiz' ? 'bg-amber-50 dark:bg-amber-900/30' :
                              lesson.type === 'project' ? 'bg-green-50 dark:bg-green-900/30' :
                              'bg-gray-50 dark:bg-gray-700'
                            }`}>
                              {lesson.is_preview || purchased
                                ? <Play className={`w-3.5 h-3.5 ${lesson.type === 'video' ? 'text-indigo-600' : lesson.type === 'quiz' ? 'text-amber-600' : 'text-green-600'}`} />
                                : <Lock className="w-3.5 h-3.5 text-gray-400" />
                              }
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800 dark:text-gray-200 truncate">{lesson.title}</p>
                              {lesson.is_preview && <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Vista previa gratuita</span>}
                            </div>
                            <span className="text-xs text-gray-400 flex-shrink-0">{lesson.duration}min</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!purchased && (
                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                  <p className="text-sm text-amber-800 dark:text-amber-300 text-center font-medium">
                    Compra este curso para desbloquear todo el contenido
                  </p>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Reseñas de Estudiantes</h2>
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">{course.rating}</div>
                  <StarRating rating={course.rating} size="md" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Valoración del curso</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${s === 5 ? 75 : s === 4 ? 18 : s === 3 ? 5 : 1}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-3">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {course.reviews?.map((r: any, i: number) => (
                  <div key={i} className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm flex-shrink-0">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{r.name}</span>
                        <StarRating rating={r.rating} size="sm" />
                        <span className="text-xs text-gray-400">{r.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-lg">
                {/* Course Image */}
                <div className="relative h-44">
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-indigo-600 ml-0.5" />
                    </div>
                  </button>
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    Vista previa
                  </div>
                </div>

                <div className="p-5">
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    {course.is_free ? (
                      <span className="text-3xl font-bold text-green-600">Gratis</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${course.price}</span>
                        {course.original_price > course.price && (
                          <>
                            <span className="text-lg text-gray-400 line-through">${course.original_price}</span>
                            <span className="text-sm font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-lg">
                              {Math.round((1 - course.price / course.original_price) * 100)}% OFF
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {purchased ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <p className="text-sm font-semibold text-green-700 dark:text-green-400">¡Curso adquirido!</p>
                      </div>
                      <Link
                        to="/dashboard/mis-cursos"
                        className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
                      >
                        Ir a mis cursos
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={handlePurchase}
                        disabled={purchasing}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 shadow-md shadow-indigo-600/20"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {purchasing ? 'Procesando...' : course.is_free ? 'Inscribirse Gratis' : 'Comprar Ahora'}
                      </button>
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-colors text-sm font-medium ${
                          isFavorite
                            ? 'border-red-200 dark:border-red-800 text-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
                        {isFavorite ? 'En favoritos' : 'Agregar a favoritos'}
                      </button>
                    </div>
                  )}

                  {/* Course includes */}
                  <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Este curso incluye:</p>
                    <ul className="space-y-2">
                      {[
                        `${course.duration_hours}h de video bajo demanda`,
                        `${totalLessons} lecciones`,
                        'Acceso de por vida',
                        'Recursos descargables',
                        'Acceso en móvil y escritorio',
                        course.has_certificate ? 'Certificado digital' : null,
                      ].filter(Boolean).map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                    <Share2 className="w-4 h-4" /> Compartir curso
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
