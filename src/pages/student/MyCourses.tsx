import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Award, Clock, Search } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const MY_COURSES = [
  { id: '1', title: 'React desde Cero', category: 'Programación', progress: 65, image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400', instructor: 'Carlos Mendoza', totalHours: 28, completedLessons: 31, totalLessons: 48, lastLesson: 'Custom Hooks', status: 'active' },
  { id: '2', title: 'TypeScript Profesional', category: 'Programación', progress: 30, image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400', instructor: 'Carlos Mendoza', totalHours: 22, completedLessons: 11, totalLessons: 36, lastLesson: 'Interfaces avanzadas', status: 'active' },
  { id: '3', title: 'Docker para Desarrolladores', category: 'Cloud Computing', progress: 10, image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400', instructor: 'Ana Torres', totalHours: 18, completedLessons: 3, totalLessons: 28, lastLesson: 'Instalación de Docker', status: 'active' },
];

export default function MyCourses() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filtered = MY_COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Cursos</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Todos los cursos que has adquirido</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar mis cursos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                  filter === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'active' ? 'En progreso' : 'Completados'}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(course => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-40">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-white text-xs font-medium">{course.progress}% completado</span>
                      <span className="text-white/80 text-xs">{course.completedLessons}/{course.totalLessons} lecciones</span>
                    </div>
                  </div>
                  {course.progress === 100 && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                      <Award className="w-3 h-3" /> Completado
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">{course.category}</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">por {course.instructor}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.totalHours}h</span>
                    <span>Última: {course.lastLesson}</span>
                  </div>

                  <Link
                    to={`/curso/${course.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {course.progress === 100 ? 'Revisar' : 'Continuar'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
              <Play className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {search ? 'No se encontraron resultados' : 'Aún no tienes cursos'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              {search ? 'Intenta con otro término' : 'Explora el catálogo y compra tu primer curso'}
            </p>
            <Link to="/catalogo" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              Explorar cursos
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
