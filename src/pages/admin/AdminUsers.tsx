import { useState } from 'react';
import { Search, Shield, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const USERS = [
  { id: '1', name: 'Admin CodeHive', email: 'admin@codehive.com', role: 'admin', status: 'active', joined: '2023-01-01', courses: 0 },
  { id: '2', name: 'Carlos Mendoza', email: 'instructor@codehive.com', role: 'instructor', status: 'active', joined: '2023-02-15', courses: 2 },
  { id: '3', name: 'Estudiante Demo', email: 'estudiante@codehive.com', role: 'student', status: 'active', joined: '2023-03-10', courses: 3 },
  { id: '4', name: 'María González', email: 'maria@example.com', role: 'student', status: 'active', joined: '2024-01-05', courses: 2 },
  { id: '5', name: 'Ing. Roberto Vargas', email: 'roberto@example.com', role: 'instructor', status: 'active', joined: '2023-11-20', courses: 3 },
  { id: '6', name: 'Laura Díaz', email: 'laura@example.com', role: 'student', status: 'active', joined: '2024-02-14', courses: 1 },
];

const roleColors: Record<string, string> = {
  student: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  instructor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = USERS.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search);
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestionar Usuarios</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{USERS.length} usuarios registrados en la plataforma</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'student', 'instructor', 'admin'].map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                  roleFilter === r ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {r === 'all' ? 'Todos' : r === 'student' ? 'Estudiantes' : r === 'instructor' ? 'Instructores' : 'Admins'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  {['Usuario', 'Rol', 'Estado', 'Cursos', 'Registrado', 'Acciones'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(user => (
                  <tr key={user.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full w-fit ${roleColors[user.role]}`}>
                        {user.role === 'admin' && <Shield className="w-3 h-3" />}
                        {user.role === 'student' ? 'Estudiante' : user.role === 'instructor' ? 'Instructor' : 'Admin'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                        <CheckCircle className="w-3.5 h-3.5" /> Activo
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{user.courses}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.joined}</td>
                    <td className="px-6 py-4">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
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
