import { Link } from 'react-router-dom';
import { BookOpen, Users, DollarSign, TrendingUp, Plus, Eye, BarChart2, Star } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

const MY_COURSES = [
  { id: '1', title: 'React desde Cero', students: 8420, revenue: 41258, rating: 4.8, status: 'published', slug: 'react-desde-cero' },
  { id: '2', title: 'TypeScript Profesional', students: 5200, revenue: 30680, rating: 4.7, status: 'published', slug: 'typescript-profesional' },
  { id: '3', title: 'Node.js Avanzado', students: 0, revenue: 0, rating: 0, status: 'draft', slug: 'nodejs-avanzado' },
];

const RECENT_SALES = [
  { student: 'María G.', course: 'React desde Cero', amount: 49, date: 'Hace 2h' },
  { student: 'Pedro R.', course: 'TypeScript Profesional', amount: 59, date: 'Hace 5h' },
  { student: 'Laura M.', course: 'React desde Cero', amount: 49, date: 'Ayer' },
  { student: 'Carlos B.', course: 'React desde Cero', amount: 49, date: 'Ayer' },
];

const statusLabel: Record<string, { label: string; color: string }> = {
  published: { label: 'Publicado', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  draft: { label: 'Borrador', color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' },
  pending: { label: 'Pendiente', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  rejected: { label: 'Rechazado', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
};

export default function InstructorDashboard() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Total Estudiantes', value: '13,620', icon: <Users className="w-5 h-5" />, change: '+12% este mes', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' },
    { label: 'Ingresos Totales', value: '$71,938', icon: <DollarSign className="w-5 h-5" />, change: '+8% este mes', color: 'text-green-600 bg-green-50 dark:bg-green-900/30' },
    { label: 'Cursos Activos', value: '2', icon: <BookOpen className="w-5 h-5" />, change: '1 borrador', color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30' },
    { label: 'Valoración Media', value: '4.75', icon: <Star className="w-5 h-5" />, change: '2,440 reseñas', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hola, {profile?.full_name.split(' ')[0]}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Panel de Instructor</p>
          </div>
          <Link
            to="/instructor/cursos/nuevo"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Nuevo Curso
          </Link>
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
              <div className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">{stat.change}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Courses */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Mis Cursos</h3>
              <Link to="/instructor/cursos" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Ver todos</Link>
            </div>
            <div className="space-y-3">
              {MY_COURSES.map(course => (
                <div key={course.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{course.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusLabel[course.status]?.color}`}>
                        {statusLabel[course.status]?.label}
                      </span>
                      {course.students > 0 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Users className="w-3 h-3" /> {course.students.toLocaleString()}
                        </span>
                      )}
                      {course.rating > 0 && (
                        <span className="text-xs text-amber-500 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" /> {course.rating}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                      {course.revenue > 0 ? `$${course.revenue.toLocaleString()}` : '—'}
                    </p>
                    <Link to={`/curso/${course.slug}`} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 justify-end">
                      <Eye className="w-3 h-3" /> Ver
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Ventas Recientes</h3>
              <Link to="/instructor/ventas" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Ver todas</Link>
            </div>
            <div className="space-y-3">
              {RECENT_SALES.map((sale, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-xs flex-shrink-0">
                    {sale.student.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{sale.student}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{sale.course}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-green-600">${sale.amount}</p>
                    <p className="text-xs text-gray-400">{sale.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Este mes</span>
                <span className="font-bold text-gray-900 dark:text-white">$5,842</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Ingresos Mensuales</h3>
            <BarChart2 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-end gap-2 h-32">
            {[3200, 4100, 3800, 5200, 4700, 5842].map((v, i) => {
              const months = ['Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar'];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-t-lg overflow-hidden" style={{ height: '100%' }}>
                    <div
                      className="bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all"
                      style={{ height: `${(v / 6000) * 100}%`, marginTop: 'auto' }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{months[i]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
