import { Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function Favorites() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Favoritos</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Cursos que guardaste para ver más tarde</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No tienes cursos favoritos</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 max-w-xs mx-auto">
            Haz clic en el ícono de corazón en cualquier curso para guardarlo aquí.
          </p>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Explorar Cursos
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
