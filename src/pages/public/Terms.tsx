export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="bg-gradient-to-br from-indigo-900 to-cyan-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Términos de Servicio</h1>
          <p className="text-indigo-200">Última actualización: 1 de enero de 2024</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12 prose prose-gray dark:prose-invert max-w-none">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 space-y-6">
          {[
            { title: '1. Aceptación de Términos', content: 'Al acceder y utilizar CodeHive Learning, aceptas quedar vinculado por estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio.' },
            { title: '2. Descripción del Servicio', content: 'CodeHive Learning es una plataforma educativa en línea que ofrece acceso a cursos técnicos, tecnológicos e industriales. Los cursos son creados por instructores independientes y por el equipo de CodeHive.' },
            { title: '3. Cuentas de Usuario', content: 'Para acceder a la mayoría de las funciones de la plataforma, debes crear una cuenta. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.' },
            { title: '4. Compras y Pagos', content: 'Todos los precios están en USD. Las compras son definitivas salvo que se aplique nuestra política de reembolso de 30 días. No nos hacemos responsables por cargos bancarios adicionales.' },
            { title: '5. Propiedad Intelectual', content: 'Todo el contenido de la plataforma, incluyendo cursos, videos, textos e imágenes, está protegido por derechos de autor. No puedes reproducir, distribuir o crear obras derivadas sin permiso expreso.' },
            { title: '6. Conducta del Usuario', content: 'Te comprometes a no utilizar la plataforma para actividades ilegales, no hacer ingeniería inversa del software, no compartir tus credenciales de acceso y respetar los derechos de otros usuarios.' },
          ].map(section => (
            <div key={section.title}>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{section.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Para preguntas sobre estos términos, contáctanos en: <a href="mailto:legal@codehive.io" className="text-indigo-600 dark:text-indigo-400">legal@codehive.io</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
