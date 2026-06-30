import { useState } from 'react';
import { Bell, Shield, Globe, Trash2 } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useDarkMode } from '../../hooks/useDarkMode';

export default function Settings() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [notifications, setNotifications] = useState({ email: true, push: false, marketing: false });

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configuración</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Gestiona tus preferencias y configuración de cuenta</p>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Apariencia</h3>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">Modo Oscuro</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Cambia entre modo claro y oscuro</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${darkMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Notificaciones</h3>
          </div>
          <div className="space-y-3">
            {[
              { key: 'email' as const, label: 'Notificaciones por email', desc: 'Recibe actualizaciones sobre tus cursos' },
              { key: 'push' as const, label: 'Notificaciones push', desc: 'Recordatorios de estudio y nuevas lecciones' },
              { key: 'marketing' as const, label: 'Correos de marketing', desc: 'Ofertas y nuevos cursos disponibles' },
            ].map(n => (
              <div key={n.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{n.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{n.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${notifications[n.key] ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications[n.key] ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Seguridad</h3>
          </div>
          <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            Cambiar contraseña
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-red-700 dark:text-red-400">Zona de Peligro</h3>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400 mb-3">
            Eliminar tu cuenta es una acción permanente e irreversible.
          </p>
          <button className="text-sm font-medium text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
            Eliminar mi cuenta
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
