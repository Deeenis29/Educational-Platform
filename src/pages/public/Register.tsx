import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName, role);
    setLoading(false);
    if (error) {
      setError(error.message.includes('already registered')
        ? 'Este correo ya está registrado. Intenta iniciar sesión.'
        : 'Error al crear la cuenta. Intenta de nuevo.');
      return;
    }
    navigate(role === 'instructor' ? '/instructor' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-700 to-indigo-700 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">CodeHive <span className="text-amber-300">Learning</span></span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Únete a la comunidad</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Más de 15,000 profesionales ya están aprendiendo y creciendo con CodeHive.
          </p>
          <div className="space-y-4">
            {[
              { title: 'Como Estudiante', desc: 'Accede a cursos técnicos y tecnológicos de alta calidad' },
              { title: 'Como Instructor', desc: 'Comparte tu conocimiento y genera ingresos adicionales' },
            ].map(item => (
              <div key={item.title} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crear Cuenta</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Comienza gratis, sin tarjeta requerida</p>
            </div>

            {/* Role selector */}
            <div className="grid grid-cols-2 gap-2 mb-5 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
              {(['student', 'instructor'] as const).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    role === r
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {r === 'student' ? 'Soy Estudiante' : 'Soy Instructor'}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 flex items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nombre completo</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  placeholder="Tu nombre completo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="tu@correo.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {password && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className={`h-1 flex-1 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'}`} />
                    <div className={`h-1 flex-1 rounded-full ${password.length >= 10 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'}`} />
                    <div className={`h-1 flex-1 rounded-full ${password.length >= 12 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'}`} />
                    <span className={`text-xs ${password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                      {password.length >= 12 ? 'Fuerte' : password.length >= 8 ? 'Buena' : 'Débil'}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta Gratis'}
              </button>
            </form>

            <div className="mt-4 flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Al registrarte aceptas los{' '}
                <Link to="/terminos" className="text-indigo-600 dark:text-indigo-400 hover:underline">Términos de Servicio</Link>
                {' '}y la{' '}
                <Link to="/privacidad" className="text-indigo-600 dark:text-indigo-400 hover:underline">Política de Privacidad</Link>
              </p>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-5">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
