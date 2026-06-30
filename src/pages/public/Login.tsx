import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || null;

  const getRedirect = (role: string) => {
    if (from) return from;
    if (role === 'admin') return '/admin';
    if (role === 'instructor') return '/instructor';
    return '/dashboard';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError('Correo o contraseña incorrectos. Verifica tus credenciales.');
      return;
    }
    // profile will be loaded by AuthContext
    setTimeout(() => {
      const role = localStorage.getItem('lastRole') || 'student';
      navigate(getRedirect(role));
    }, 300);
  };

  const handleDemoLogin = async (demoEmail: string, role: string) => {
    setEmail(demoEmail);
    setPassword('CodeHive123');
    setLoading(true);
    const { error } = await signIn(demoEmail, 'CodeHive123');
    setLoading(false);
    if (!error) {
      localStorage.setItem('lastRole', role);
      navigate(getRedirect(role));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 to-cyan-700 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">CodeHive <span className="text-amber-300">Learning</span></span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Bienvenido de vuelta</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Continúa aprendiendo donde lo dejaste. Más de 350 cursos te esperan.
          </p>
          <div className="space-y-3">
            {['Acceso 24/7 a todos tus cursos', 'Certificados verificables', 'Comunidad de +15,000 estudiantes'].map(item => (
              <div key={item} className="flex items-center gap-2 text-white/90">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                CodeHive <span className="text-amber-500">Learning</span>
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Iniciar Sesión</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Ingresa tus credenciales para continuar</p>
            </div>

            {error && (
              <div className="mb-4 flex items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="tu@correo.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-5">
              <div className="relative flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-xs text-gray-400">Cuentas demo</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Admin', email: 'admin@codehive.com', role: 'admin', color: 'border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400' },
                  { label: 'Instructor', email: 'instructor@codehive.com', role: 'instructor', color: 'border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' },
                  { label: 'Estudiante', email: 'estudiante@codehive.com', role: 'student', color: 'border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400' },
                ].map(demo => (
                  <button
                    key={demo.role}
                    onClick={() => handleDemoLogin(demo.email, demo.role)}
                    disabled={loading}
                    className={`text-xs font-medium py-2 px-3 rounded-lg border ${demo.color} transition-colors disabled:opacity-50`}
                  >
                    {demo.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-5">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
