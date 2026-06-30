import { Link } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2, Users, Star, DollarSign } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const COURSES = [
  { id: '1', title: 'React desde Cero', category: 'Programación', students: 8420, revenue: 41258, rating: 4.8, reviews: 1240, status: 'published', slug: 'react-desde-cero', image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '2', title: 'TypeScript Profesional', category: 'Programación', students: 5200, revenue: 30680, rating: 4.7, reviews: 843, status: 'published', slug: 'typescript-profesional', image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '3', title: 'Node.js Avanzado', category: 'Programación', students: 0, revenue: 0, rating: 0, reviews: 0, status: 'draft', slug: 'nodejs-avanzado', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const statusStyles: Record<string, string> = {
  published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  draft: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const statusLabels: Record<string, string> = {
  published: 'Publicado', draft: 'Borrador', pending: 'Pendiente', rejected: 'Rechazado',
};

export default function InstructorCourses() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Cursos</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Gestiona todos tus cursos</p>
          </div>
          <Link
            to="/instructor/cursos/nuevo"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> Crear Curso
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-6 py-4">Curso</th>
                  <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-6 py-4">Estado</th>
                  <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-6 py-4">Estudiantes</th>
                  <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-6 py-4">Ingresos</th>
                  <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-6 py-4">Valoración</th>
                  <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-6 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map(course => (
                  <tr key={course.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={course.image} alt={course.title} className="w-12 h-9 rounded-lg object-cover flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{course.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{course.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[course.status]}`}>
                        {statusLabels[course.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="flex items-center gap-1 justify-end text-sm text-gray-700 dark:text-gray-300">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        {course.students.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="flex items-center gap-1 justify-end text-sm font-semibold text-gray-900 dark:text-white">
                        <DollarSign className="w-3.5 h-3.5 text-green-500" />
                        {course.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {course.rating > 0 ? (
                        <span className="flex items-center gap-1 justify-end text-sm text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating}
                        </span>
                      ) : <span className="text-xs text-gray-400">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link to={`/curso/${course.slug}`} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link to={`/instructor/cursos/${course.id}/editar`} className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
