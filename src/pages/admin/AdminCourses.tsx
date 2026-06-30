import { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';

const COURSES = [
  { id: '1', title: 'React desde Cero', instructor: 'Carlos Mendoza', category: 'Programación', students: 8420, price: 49, status: 'published', submitted: '2023-02-15', slug: 'react-desde-cero' },
  { id: '2', title: 'Electricidad Industrial Básica', instructor: 'Ing. Roberto Vargas', category: 'Electricidad Industrial', students: 5230, price: 59, status: 'published', submitted: '2023-03-01', slug: 'electricidad-industrial-basica' },
  { id: '3', title: 'PLC Siemens Nivel 1', instructor: 'Ing. Ana Torres', category: 'PLC & SCADA', students: 3120, price: 79, status: 'published', submitted: '2023-04-10', slug: 'plc-siemens-nivel-1' },
  { id: '4', title: 'PostgreSQL para Producción', instructor: 'Diego López', category: 'Programación', students: 0, price: 69, status: 'pending', submitted: '2024-03-28', slug: 'postgresql-produccion' },
  { id: '5', title: 'Lubricación Industrial', instructor: 'Ing. Rosa Castro', category: 'Mantenimiento Industrial', students: 0, price: 55, status: 'pending', submitted: '2024-03-27', slug: 'lubricacion-industrial' },
  { id: '6', title: 'Node.js Avanzado', instructor: 'Carlos Mendoza', category: 'Programación', students: 0, price: 65, status: 'draft', submitted: '2024-03-25', slug: 'nodejs-avanzado' },
];

const statusStyles: Record<string, { label: string; style: string }> = {
  published: { label: 'Publicado', style: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  draft: { label: 'Borrador', style: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' },
  pending: { label: 'Pendiente', style: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  rejected: { label: 'Rechazado', style: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
};

export default function AdminCourses() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courses, setCourses] = useState(COURSES);

  const approve = (id: string) => setCourses(prev => prev.map(c => c.id === id ? { ...c, status: 'published' } : c));
  const reject = (id: string) => setCourses(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' } : c));

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestionar Cursos</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Administra y modera todos los cursos</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'published', 'pending', 'draft', 'rejected'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                  statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {s === 'all' ? 'Todos' : statusStyles[s]?.label || s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  {['Curso', 'Instructor', 'Categoría', 'Precio', 'Estudiantes', 'Estado', 'Acciones'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-5 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(course => (
                  <tr key={course.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white max-w-[200px] truncate">{course.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{course.submitted}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">{course.instructor}</td>
                    <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">{course.category}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">${course.price}</td>
                    <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">{course.students.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[course.status]?.style}`}>
                        {statusStyles[course.status]?.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Link to={`/curso/${course.slug}`} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        {course.status === 'pending' && (
                          <>
                            <button
                              onClick={() => approve(course.id)}
                              className="p-1.5 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => reject(course.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
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
