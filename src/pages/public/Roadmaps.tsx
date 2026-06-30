import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Server, GitBranch, Brain, Settings, ChevronRight, ArrowRight, Clock, BookOpen } from 'lucide-react';

const ROADMAPS = [
  {
    id: '1', title: 'Frontend Developer', slug: 'frontend-developer', color: 'from-indigo-600 to-indigo-400',
    icon: <Monitor className="w-6 h-6" />, level: 'Principiante → Intermedio', months: 8, courses: 6,
    description: 'Conviértete en desarrollador frontend completo dominando HTML, CSS, JavaScript, TypeScript y React',
    steps: ['HTML & CSS', 'JavaScript ES6+', 'TypeScript', 'React', 'Next.js', 'Deploy'],
  },
  {
    id: '2', title: 'Backend Developer', slug: 'backend-developer', color: 'from-cyan-600 to-cyan-400',
    icon: <Server className="w-6 h-6" />, level: 'Intermedio', months: 10, courses: 4,
    description: 'Aprende a construir APIs robustas con Node.js, bases de datos y arquitecturas escalables',
    steps: ['Node.js', 'Bases de Datos', 'APIs REST', 'Arquitectura'],
  },
  {
    id: '3', title: 'DevOps Engineer', slug: 'devops-engineer', color: 'from-green-600 to-green-400',
    icon: <GitBranch className="w-6 h-6" />, level: 'Avanzado', months: 12, courses: 4,
    description: 'Domina Linux, Docker, CI/CD y Cloud Computing para automatizar el ciclo de vida del software',
    steps: ['Linux', 'Docker', 'CI/CD', 'Cloud AWS'],
  },
  {
    id: '4', title: 'Inteligencia Artificial', slug: 'inteligencia-artificial', color: 'from-violet-600 to-violet-400',
    icon: <Brain className="w-6 h-6" />, level: 'Intermedio', months: 10, courses: 4,
    description: 'Aprende Python, Machine Learning, Deep Learning y LLMs para proyectos de IA reales',
    steps: ['Python para IA', 'Machine Learning', 'Deep Learning', 'LLMs'],
  },
  {
    id: '5', title: 'Automatización Industrial', slug: 'automatizacion-industrial', color: 'from-amber-600 to-amber-400',
    icon: <Settings className="w-6 h-6" />, level: 'Principiante → Avanzado', months: 9, courses: 4,
    description: 'Domina electricidad, PLC, SCADA y sensores industriales para automatizar procesos',
    steps: ['Electricidad', 'PLC Siemens', 'SCADA/HMI', 'Sensores'],
  },
];

export default function Roadmaps() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-900 to-cyan-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Rutas de Aprendizaje</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            Guías visuales con el camino exacto que debes seguir para dominar cada área. Desde cero hasta experto.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROADMAPS.map(rm => (
            <div
              key={rm.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl border overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                selected === rm.id ? 'border-indigo-400 dark:border-indigo-600 shadow-lg' : 'border-gray-100 dark:border-gray-700'
              }`}
              onClick={() => setSelected(selected === rm.id ? null : rm.id)}
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-br ${rm.color} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    {rm.icon}
                  </div>
                  <ChevronRight className={`w-5 h-5 text-white/70 transition-transform ${selected === rm.id ? 'rotate-90' : ''}`} />
                </div>
                <h3 className="text-xl font-bold text-white mt-4 mb-1">{rm.title}</h3>
                <p className="text-white/80 text-sm">{rm.level}</p>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{rm.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {rm.months} meses</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {rm.courses} cursos</span>
                </div>

                {/* Steps */}
                {selected === rm.id ? (
                  <div className="space-y-2 mt-4">
                    {rm.steps.map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-gradient-to-br ${rm.color} text-white`}>
                          {i + 1}
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                        {i < rm.steps.length - 1 && (
                          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700" />
                        )}
                      </div>
                    ))}
                    <Link
                      to="/catalogo"
                      className="mt-4 flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      Comenzar Roadmap <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-1.5 flex-wrap">
                    {rm.steps.map(step => (
                      <span key={step} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                        {step}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-indigo-900 dark:bg-indigo-950 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-white mb-3">¿No sabes por dónde empezar?</h2>
          <p className="text-indigo-200 mb-6">Toma nuestro cuestionario de orientación y te recomendamos el mejor camino para tus objetivos.</p>
          <Link
            to="/registro"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Crear cuenta gratis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
