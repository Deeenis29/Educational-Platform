import { Link } from 'react-router-dom';
import { Star, Users, BookOpen, ArrowRight, Check, DollarSign } from 'lucide-react';

const INSTRUCTORS = [
  { name: 'Carlos Mendoza', headline: 'Senior Frontend Developer', bio: 'Ex-Google. 8+ años en React y el ecosistema JavaScript. Apasionado por enseñar de forma práctica.', courses: 2, students: 13620, rating: 4.8, avatar: 'C', specialty: 'Programación' },
  { name: 'Ing. Roberto Vargas', headline: 'Especialista en Sistemas Eléctricos', bio: 'Ingeniero eléctrico con 15 años de experiencia en plantas industriales. Certificado Siemens.', courses: 3, students: 5230, rating: 4.9, avatar: 'R', specialty: 'Electricidad Industrial' },
  { name: 'Ana Torres', headline: 'DevOps & Cloud Architect', bio: 'Arquitecta de soluciones cloud en AWS y Azure. Especialista en automatización y CI/CD.', courses: 2, students: 8420, rating: 4.6, avatar: 'A', specialty: 'Cloud Computing' },
  { name: 'Dr. Luis Sánchez', headline: 'Investigador en IA y Machine Learning', bio: 'Doctor en Ciencias Computacionales. Investigador con publicaciones en las principales revistas de ML.', courses: 2, students: 8930, rating: 4.9, avatar: 'L', specialty: 'Inteligencia Artificial' },
  { name: 'Ing. Ana Torres', headline: 'Automatización y PLC Siemens', bio: 'Ingeniera en automatización industrial con 12 años programando PLCs y sistemas SCADA.', courses: 2, students: 5920, rating: 4.7, avatar: 'A', specialty: 'PLC & SCADA' },
  { name: 'Ing. Patricia López', headline: 'Especialista en Ciberseguridad', bio: 'CISSP certificada con experiencia en pentesting y hardening de infraestructuras críticas.', courses: 1, students: 3910, rating: 4.7, avatar: 'P', specialty: 'Ciberseguridad' },
];

export default function Instructors() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-900 to-indigo-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Nuestros Instructores</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            Aprende de expertos activos en la industria con experiencia comprobada en sus áreas.
          </p>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {INSTRUCTORS.map(inst => (
            <div key={inst.name} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {inst.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{inst.name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">{inst.headline}</p>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full mt-1 inline-block">
                    {inst.specialty}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{inst.bio}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{inst.rating}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {inst.students.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {inst.courses} cursos
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Become Instructor */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                ¿Eres experto en tu área?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Únete a nuestra comunidad de instructores y comparte tu conocimiento con miles de estudiantes en toda Latinoamérica.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  'Recibe hasta 70% de comisión por cada venta',
                  'Acceso a herramientas profesionales de creación',
                  'Soporte pedagógico de nuestro equipo',
                  'Pagos mensuales puntuales',
                  'Dashboard con métricas en tiempo real',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/registro"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Aplicar como Instructor <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-4xl font-bold mb-2">70%</p>
                <p className="text-xl font-semibold mb-2">de comisión</p>
                <p className="text-white/80 text-sm max-w-xs">
                  Los mejores instructores ganan más de $5,000 USD al mes en nuestra plataforma.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-2xl font-bold">80+</p>
                    <p className="text-white/70 text-xs">Instructores activos</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-2xl font-bold">350+</p>
                    <p className="text-white/70 text-xs">Cursos publicados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
