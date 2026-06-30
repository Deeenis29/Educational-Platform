import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen, User, LogOut, Settings, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDarkMode } from '../../hooks/useDarkMode';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!profile) return '/dashboard';
    if (profile.role === 'admin') return '/admin';
    if (profile.role === 'instructor') return '/instructor';
    return '/dashboard';
  };

  const navBg = isLanding && !scrolled
    ? 'bg-transparent'
    : 'bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800';

  const textColor = isLanding && !scrolled
    ? 'text-white'
    : 'text-gray-700 dark:text-gray-200';

  const logoColor = isLanding && !scrolled ? 'text-white' : 'text-indigo-600 dark:text-indigo-400';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isLanding && !scrolled ? 'bg-white/20' : 'bg-indigo-600'}`}>
              <BookOpen className={`w-5 h-5 ${isLanding && !scrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <span className={`font-bold text-lg tracking-tight ${logoColor}`}>
              CodeHive <span className={isLanding && !scrolled ? 'text-amber-300' : 'text-amber-500'}>Learning</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/catalogo" className={`text-sm font-medium hover:text-indigo-500 transition-colors ${textColor}`}>
              Cursos
            </Link>
            <Link to="/roadmaps" className={`text-sm font-medium hover:text-indigo-500 transition-colors ${textColor}`}>
              Roadmaps
            </Link>
            <Link to="/instructores" className={`text-sm font-medium hover:text-indigo-500 transition-colors ${textColor}`}>
              Instructores
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${textColor}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user && profile ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {profile.full_name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`text-sm font-medium ${textColor}`}>{profile.full_name.split(' ')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 ${textColor}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Conectado como</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{profile.full_name}</p>
                      <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full capitalize">{profile.role}</span>
                    </div>
                    <Link to={getDashboardLink()} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/dashboard/perfil" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <User className="w-4 h-4" /> Mi Perfil
                    </Link>
                    <Link to="/dashboard/configuracion" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Settings className="w-4 h-4" /> Configuración
                    </Link>
                    <hr className="my-1 border-gray-100 dark:border-gray-700" />
                    <button onClick={handleSignOut} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="w-4 h-4" /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-colors ${
                    isLanding && !scrolled
                      ? 'text-white hover:bg-white/10'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="text-sm font-medium px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg ${textColor}`}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-4 space-y-2">
          <Link to="/catalogo" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200">Cursos</Link>
          <Link to="/roadmaps" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200">Roadmaps</Link>
          <Link to="/instructores" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200">Instructores</Link>
          <hr className="border-gray-100 dark:border-gray-700" />
          {user && profile ? (
            <>
              <Link to={getDashboardLink()} className="block py-2 text-sm font-medium text-indigo-600">Dashboard</Link>
              <button onClick={handleSignOut} className="block w-full text-left py-2 text-sm font-medium text-red-600">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200">Iniciar Sesión</Link>
              <Link to="/registro" className="block py-2 text-sm font-medium text-indigo-600">Registrarse</Link>
            </>
          )}
          <button onClick={toggleDarkMode} className="flex items-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-300">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>
      )}
    </nav>
  );
}
