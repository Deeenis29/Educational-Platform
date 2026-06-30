import { Link } from 'react-router-dom';
import { BookOpen, Twitter, Linkedin, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                CodeHive <span className="text-amber-400">Learning</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Aprende habilidades que generan oportunidades. Cursos técnicos, tecnológicos e industriales para tu crecimiento profesional.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Plataforma</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Explorar Cursos', to: '/catalogo' },
                { label: 'Roadmaps', to: '/roadmaps' },
                { label: 'Instructores', to: '/instructores' },
                { label: 'Empresas', to: '/instructores' },
                { label: 'Certificaciones', to: '/catalogo' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Empresa</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Sobre CodeHive', to: '/' },
                { label: 'Convertirme en Instructor', to: '/instructores' },
                { label: 'Contacto', to: '/contacto' },
                { label: 'Preguntas Frecuentes', to: '/faqs' },
                { label: 'Blog', to: '/' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>hola@codehive.io</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} CodeHive Learning. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terminos" className="text-xs hover:text-white transition-colors">Términos de Uso</Link>
            <Link to="/privacidad" className="text-xs hover:text-white transition-colors">Privacidad</Link>
            <Link to="/faqs" className="text-xs hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
