import { Download, Award, ExternalLink } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

const CERTIFICATES: any[] = [];

export default function Certificates() {
  const { profile } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Certificados</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Certificados digitales obtenidos al completar cursos</p>
        </div>

        {CERTIFICATES.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {CERTIFICATES.map(cert => (
              <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <p>{cert.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Aún no tienes certificados</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
              Completa un curso al 100% para obtener tu certificado digital verificable.
            </p>
          </div>
        )}

        {/* Certificate Preview */}
        <div className="bg-gradient-to-br from-indigo-900 to-cyan-900 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="relative z-10">
            <Award className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h3 className="text-white font-bold text-xl mb-2">Ejemplo de Certificado</h3>
            <p className="text-indigo-200 text-sm mb-1">Este certificado es para confirmar que</p>
            <p className="text-white font-bold text-2xl mb-1">{profile?.full_name || 'Tu Nombre'}</p>
            <p className="text-indigo-200 text-sm mb-4">ha completado satisfactoriamente el curso de</p>
            <p className="text-amber-400 font-bold text-lg mb-6">[Nombre del Curso]</p>
            <div className="flex items-center justify-center gap-6 text-xs text-indigo-300">
              <span>Instructor: CodeHive Learning</span>
              <span>Fecha: {new Date().toLocaleDateString('es-MX')}</span>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-white" />
              <span className="text-white text-xs font-mono">codehive.io/verify/XXXXXX</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
