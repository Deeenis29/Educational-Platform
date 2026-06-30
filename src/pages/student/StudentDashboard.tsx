import { Link } from 'react-router-dom';
import { BookMarked, Award, TrendingUp, Clock, Play, ArrowRight, Zap, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ENROLLED_COURSES = [
  { id: '1', title: 'React desde Cero', category: 'Programación', progress: 65, image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400', instructor: 'Carlos Mendoza', totalLessons: 48, completedLessons: 31 },
  { id: '2', title: 'TypeScript Profesional', category: 'Programación', progress: 30, image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400', instructor: 'Carlos Mendoza', totalLessons: 36, completedLessons: 11 },
  { id: '3', title: 'Docker para Desarrolladores', category: 'Cloud Computing', progress: 10, image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400', instructor: 'Ana Torres', totalLessons: 28, completedLessons: 3 },
];

const ACHIEVEMENTS = [
  { icon: <Zap className="w-5 h-5 text-amber-500" />, label: 'Primera lección completada', earned: true },
  { icon: <Star className="w-5 h-5 text-indigo-500" />, label: 'Primera semana activo', earned: true },
  { icon: <Award className="w-5 h-5 text-green-500" />, label: 'Primer certificado', earned: false },
  { icon: <BookMarked className="w-5 h-5 text-cyan-500" />, label: '3 cursos inscritos', earned: true },
];

export default function StudentDashboard() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Cursos Inscritos', value: 3, icon: <BookMarked className="w-5 h-5" />, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' },
    { label: 'Lecciones Completadas', value: 45, icon: <Play className="w-5 h-5" />, color: 'text-green-600 bg-green-50 dark:bg-green-900/30' },
    { label: 'Certificados', value: 0, icon: <Award className="w-5 h-5" />, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30' },
    { label: 'Horas de Estudio', value: 28, icon: <Clock className="w-5 h-5" />, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hola, {profile?.full_name.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Continúa donde lo dejaste. Tienes 3 cursos en progreso.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Current Courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Continuar Aprendiendo</h2>
            <Link to="/dashboard/mis-cursos" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {ENROLLED_COURSES.map(course => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-32">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-white text-xs">{course.progress}% completado</span>
                      <span className="text-white/80 text-xs">{course.completedLessons}/{course.totalLessons}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">{course.category}</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3 line-clamp-1">{course.title}</h3>
                  <Link
                    to={`/curso/${course.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" /> Continuar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Progress Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Mi Progreso</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">Esta semana</span>
            </div>
            <div className="space-y-3">
              {ENROLLED_COURSES.map(c => (
                <div key={c.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[180px]">{c.title}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{c.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link to="/dashboard/progreso" className="mt-4 flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              <TrendingUp className="w-3.5 h-3.5" /> Ver estadísticas completas
            </Link>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Logros</h3>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
                Nivel {profile?.level || 1}
              </span>
            </div>

            {/* Points bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>{profile?.points || 450} puntos</span>
                <span>1000 pts para nivel 2</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(profile?.points || 450) / 10}%` }} />
              </div>
            </div>

            <div className="space-y-2.5">
              {ACHIEVEMENTS.map(a => (
                <div
                  key={a.label}
                  className={`flex items-center gap-3 p-2.5 rounded-xl ${a.earned ? 'bg-gray-50 dark:bg-gray-700' : 'opacity-40'}`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${a.earned ? 'bg-white dark:bg-gray-600 shadow-sm' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    {a.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{a.label}</span>
                  {a.earned && <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
