import { TrendingUp, Clock, BookOpen, Zap } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const WEEKLY = [
  { day: 'Lun', minutes: 45 },
  { day: 'Mar', minutes: 90 },
  { day: 'Mié', minutes: 30 },
  { day: 'Jue', minutes: 120 },
  { day: 'Vie', minutes: 75 },
  { day: 'Sáb', minutes: 60 },
  { day: 'Dom', minutes: 0 },
];

export default function Progress() {
  const maxMinutes = Math.max(...WEEKLY.map(w => w.minutes));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi Progreso</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Estadísticas detalladas de tu aprendizaje</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Días activo', value: '12', icon: <Zap className="w-5 h-5" />, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30' },
            { label: 'Horas esta semana', value: '7h 30min', icon: <Clock className="w-5 h-5" />, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30' },
            { label: 'Lecciones completadas', value: '45', icon: <BookOpen className="w-5 h-5" />, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' },
            { label: 'Racha actual', value: '5 días', icon: <TrendingUp className="w-5 h-5" />, color: 'text-green-600 bg-green-50 dark:bg-green-900/30' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>{s.icon}</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">Actividad Semanal</h3>
          <div className="flex items-end gap-3 h-40">
            {WEEKLY.map(day => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative" style={{ height: '100%' }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-lg transition-all duration-500"
                    style={{ height: `${maxMinutes > 0 ? (day.minutes / maxMinutes) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Total esta semana: 7h 00min</span>
            <span>Promedio: 1h/día</span>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">Progreso por Curso</h3>
          <div className="space-y-5">
            {[
              { name: 'React desde Cero', progress: 65, color: 'from-indigo-500 to-cyan-500', completed: 31, total: 48 },
              { name: 'TypeScript Profesional', progress: 30, color: 'from-blue-500 to-indigo-500', completed: 11, total: 36 },
              { name: 'Docker para Desarrolladores', progress: 10, color: 'from-cyan-500 to-teal-500', completed: 3, total: 28 },
            ].map(c => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{c.name}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{c.progress}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${c.color} rounded-full`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">{c.completed} de {c.total} lecciones</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
