import { Link } from 'react-router-dom';
import { Users, BookOpen, DollarSign, TrendingUp, CheckCircle, Clock, AlertCircle, BarChart2, ArrowRight } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const PENDING_COURSES = [
  { id: '1', title: 'PostgreSQL para Producción', instructor: 'Diego López', category: 'Programación', submitted: 'Hace 2h' },
  { id: '2', title: 'Lubricación Industrial', instructor: 'Ing. Rosa Castro', category: 'Mantenimiento Industrial', submitted: 'Hace 5h' },
  { id: '3', title: 'Impresión 3D Profesional', instructor: 'Andrea Martínez', category: 'Impresión 3D', submitted: 'Ayer' },
];

const RECENT_USERS = [
  { name: 'Sofía Herrera', role: 'student', joined: 'Hace 1h' },
  { name: 'Ing. Manuel Torres', role: 'instructor', joined: 'Hace 3h' },
  { name: 'TechCorp MX', role: 'instructor', joined: 'Hace 6h' },
  { name: 'Alejandro Ríos', role: 'student', joined: 'Ayer' },
];

const roleColors: Record<string, string> = {
  student: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  instructor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function AdminDashboard() {
  const stats = [
    { label: 'Usuarios Totales', value: '15,842', icon: <Users className="w-5 h-5" />, change: '+234 esta semana', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' },
    { label: 'Cursos Activos', value: '354', icon: <BookOpen className="w-5 h-5" />, change: '12 pendientes', color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30' },
    { label: 'Ingresos del Mes', value: '$48,240', icon: <DollarSign className="w-5 h-5" />, change: '+15% vs mes anterior', color: 'text-green-600 bg-green-50 dark:bg-green-900/30' },
    { label: 'Nuevas Inscripciones', value: '1,284', icon: <TrendingUp className="w-5 h-5" />, change: 'Este mes', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Administrador</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Vista general de CodeHive Learning</p>
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Cursos Pendientes</h3>
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              </div>
              <Link to="/admin/cursos" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                Ver todos <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {PENDING_COURSES.map(course => (
                <div key={course.id} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800/30">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{course.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{course.instructor} · {course.category}</p>
                    <p className="text-xs text-gray-400">{course.submitted}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button className="p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-lg hover:bg-red-200 transition-colors">
                      <Clock className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Nuevos Usuarios</h3>
              <Link to="/admin/usuarios" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                Ver todos <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {RECENT_USERS.map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.joined}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${roleColors[user.role]}`}>
                    {user.role === 'student' ? 'Estudiante' : user.role === 'instructor' ? 'Instructor' : 'Admin'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white">Ingresos de la Plataforma</h3>
            <BarChart2 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-end gap-3 h-40">
            {[28400, 32100, 29800, 38200, 41700, 48240].map((v, i) => {
              const months = ['Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar'];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col justify-end" style={{ height: '100%' }}>
                    <div
                      className="bg-gradient-to-t from-indigo-600 to-cyan-500 rounded-lg"
                      style={{ height: `${(v / 50000) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{months[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Gestionar Usuarios', to: '/admin/usuarios', icon: <Users className="w-5 h-5" /> },
            { label: 'Revisar Cursos', to: '/admin/cursos', icon: <BookOpen className="w-5 h-5" /> },
            { label: 'Ver Pagos', to: '/admin/pagos', icon: <DollarSign className="w-5 h-5" /> },
            { label: 'Reportes', to: '/admin/reportes', icon: <BarChart2 className="w-5 h-5" /> },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-sm transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
