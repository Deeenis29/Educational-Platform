import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useDarkMode } from './hooks/useDarkMode';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Landing from './pages/public/Landing';
import Catalog from './pages/public/Catalog';
import CourseDetail from './pages/public/CourseDetail';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Roadmaps from './pages/public/Roadmaps';
import Instructors from './pages/public/Instructors';
import Contact from './pages/public/Contact';
import FAQs from './pages/public/FAQs';
import Terms from './pages/public/Terms';
import Privacy from './pages/public/Privacy';

// Student Dashboard
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import Favorites from './pages/student/Favorites';
import Certificates from './pages/student/Certificates';
import Progress from './pages/student/Progress';
import Profile from './pages/student/Profile';
import Settings from './pages/student/Settings';

// Instructor Dashboard
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import InstructorCourses from './pages/instructor/InstructorCourses';
import NewCourse from './pages/instructor/NewCourse';
import InstructorSales from './pages/instructor/InstructorSales';

// Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCourses from './pages/admin/AdminCourses';
import AdminPayments from './pages/admin/AdminPayments';

// Public layout wrapper (with navbar + footer)
function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

// Route guards
function RequireAuth({ children, role }: { children: ReactNode; role?: string }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (role && profile?.role !== role && profile?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  useDarkMode();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
      <Route path="/catalogo" element={<PublicLayout><Catalog /></PublicLayout>} />
      <Route path="/curso/:slug" element={<PublicLayout><CourseDetail /></PublicLayout>} />
      <Route path="/roadmaps" element={<PublicLayout><Roadmaps /></PublicLayout>} />
      <Route path="/instructores" element={<PublicLayout><Instructors /></PublicLayout>} />
      <Route path="/contacto" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/faqs" element={<PublicLayout><FAQs /></PublicLayout>} />
      <Route path="/terminos" element={<PublicLayout><Terms /></PublicLayout>} />
      <Route path="/privacidad" element={<PublicLayout><Privacy /></PublicLayout>} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      {/* Student Dashboard */}
      <Route path="/dashboard" element={<RequireAuth><StudentDashboard /></RequireAuth>} />
      <Route path="/dashboard/mis-cursos" element={<RequireAuth><MyCourses /></RequireAuth>} />
      <Route path="/dashboard/favoritos" element={<RequireAuth><Favorites /></RequireAuth>} />
      <Route path="/dashboard/certificados" element={<RequireAuth><Certificates /></RequireAuth>} />
      <Route path="/dashboard/progreso" element={<RequireAuth><Progress /></RequireAuth>} />
      <Route path="/dashboard/perfil" element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="/dashboard/configuracion" element={<RequireAuth><Settings /></RequireAuth>} />

      {/* Instructor Dashboard */}
      <Route path="/instructor" element={<RequireAuth role="instructor"><InstructorDashboard /></RequireAuth>} />
      <Route path="/instructor/cursos" element={<RequireAuth role="instructor"><InstructorCourses /></RequireAuth>} />
      <Route path="/instructor/cursos/nuevo" element={<RequireAuth role="instructor"><NewCourse /></RequireAuth>} />
      <Route path="/instructor/borradores" element={<RequireAuth role="instructor"><InstructorCourses /></RequireAuth>} />
      <Route path="/instructor/ventas" element={<RequireAuth role="instructor"><InstructorSales /></RequireAuth>} />
      <Route path="/instructor/estudiantes" element={<RequireAuth role="instructor"><InstructorDashboard /></RequireAuth>} />
      <Route path="/instructor/eventos" element={<RequireAuth role="instructor"><InstructorDashboard /></RequireAuth>} />
      <Route path="/instructor/perfil" element={<RequireAuth role="instructor"><Profile /></RequireAuth>} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<RequireAuth role="admin"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/usuarios" element={<RequireAuth role="admin"><AdminUsers /></RequireAuth>} />
      <Route path="/admin/cursos" element={<RequireAuth role="admin"><AdminCourses /></RequireAuth>} />
      <Route path="/admin/pagos" element={<RequireAuth role="admin"><AdminPayments /></RequireAuth>} />
      <Route path="/admin/comisiones" element={<RequireAuth role="admin"><AdminPayments /></RequireAuth>} />
      <Route path="/admin/reportes" element={<RequireAuth role="admin"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/roadmaps" element={<RequireAuth role="admin"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/eventos" element={<RequireAuth role="admin"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/certificados" element={<RequireAuth role="admin"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/categorias" element={<RequireAuth role="admin"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/configuracion" element={<RequireAuth role="admin"><Settings /></RequireAuth>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
