import { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen, LayoutDashboard, BookMarked, Heart, Award, TrendingUp,
  User, Settings, LogOut, ChevronLeft, ChevronRight, Menu, X,
  GraduationCap, BarChart2, Users, Tag, CreditCard, FileText,
  Map, Calendar, Shield, Video
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDarkMode } from '../../hooks/useDarkMode';
import { Sun, Moon } from 'lucide-react';

interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

const studentNav: NavItem[] = [
  { label: 'Resumen', to: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Mis Cursos', to: '/dashboard/mis-cursos', icon: <BookMarked className="w-4 h-4" /> },
  { label: 'Favoritos', to: '/dashboard/favoritos', icon: <Heart className="w-4 h-4" /> },
  { label: 'Certificados', to: '/dashboard/certificados', icon: <Award className="w-4 h-4" /> },
  { label: 'Mi Progreso', to: '/dashboard/progreso', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'Mi Perfil', to: '/dashboard/perfil', icon: <User className="w-4 h-4" /> },
  { label: 'Configuración', to: '/dashboard/configuracion', icon: <Settings className="w-4 h-4" /> },
];

const instructorNav: NavItem[] = [
  { label: 'Resumen', to: '/instructor', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Mis Cursos', to: '/instructor/cursos', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Borradores', to: '/instructor/borradores', icon: <FileText className="w-4 h-4" /> },
  { label: 'Ventas', to: '/instructor/ventas', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Estudiantes', to: '/instructor/estudiantes', icon: <Users className="w-4 h-4" /> },
  { label: 'Eventos', to: '/instructor/eventos', icon: <Video className="w-4 h-4" /> },
  { label: 'Mi Perfil', to: '/instructor/perfil', icon: <User className="w-4 h-4" /> },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard', to: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Usuarios', to: '/admin/usuarios', icon: <Users className="w-4 h-4" /> },
  { label: 'Cursos', to: '/admin/cursos', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Categorías', to: '/admin/categorias', icon: <Tag className="w-4 h-4" /> },
  { label: 'Pagos', to: '/admin/pagos', icon: <CreditCard className="w-4 h-4" /> },
  { label: 'Comisiones', to: '/admin/comisiones', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Reportes', to: '/admin/reportes', icon: <FileText className="w-4 h-4" /> },
  { label: 'Roadmaps', to: '/admin/roadmaps', icon: <Map className="w-4 h-4" /> },
  { label: 'Eventos', to: '/admin/eventos', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Certificados', to: '/admin/certificados', icon: <Award className="w-4 h-4" /> },
  { label: 'Configuración', to: '/admin/configuracion', icon: <Settings className="w-4 h-4" /> },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile, signOut } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = profile?.role === 'admin' ? adminNav
    : profile?.role === 'instructor' ? instructorNav
    : studentNav;

  const roleLabel = profile?.role === 'admin' ? 'Administrador'
    : profile?.role === 'instructor' ? 'Instructor'
    : 'Estudiante';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (to: string) => {
    if (to === '/dashboard' || to === '/instructor' || to === '/admin') {
      return location.pathname === to;
    }
    return location.pathname.startsWith(to);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100 dark:border-gray-700">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-gray-900 dark:text-white text-sm">
            CodeHive <span className="text-amber-500">Learning</span>
          </span>
        )}
      </div>

      {/* Role Badge */}
      {!collapsed && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl px-3 py-2">
            <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{roleLabel}</span>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive(item.to)
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-gray-100 dark:border-gray-700 space-y-0.5">
        <Link to="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all`}>
          <GraduationCap className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Ir al Catálogo</span>}
        </Link>
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          {darkMode ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
          {!collapsed && <span>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>}
        </button>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transition-all duration-300 flex-shrink-0 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-full w-5 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-r-lg flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-10"
          style={{ left: collapsed ? '4rem' : '15rem' }}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-60 bg-white dark:bg-gray-800 h-full flex flex-col z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            {profile && (
              <div className="flex items-center gap-2.5">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{profile.full_name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{profile.email}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {profile.full_name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
