export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="bg-gradient-to-br from-indigo-900 to-cyan-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Política de Privacidad</h1>
          <p className="text-indigo-200">Última actualización: 1 de enero de 2024</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 space-y-6">
          {[
            { title: 'Información que Recopilamos', content: 'Recopilamos información que proporcionas directamente: nombre, correo electrónico, datos de pago. También recopilamos automáticamente datos de uso, dirección IP y cookies para mejorar tu experiencia.' },
            { title: 'Uso de la Información', content: 'Usamos tu información para procesar pagos, personalizar tu experiencia de aprendizaje, enviarte comunicaciones relacionadas con el servicio y mejorar nuestra plataforma.' },
            { title: 'Compartir Información', content: 'No vendemos tu información personal. Compartimos datos con proveedores de pago (Stripe, Mercado Pago) únicamente para procesar transacciones. Los instructores pueden ver estadísticas agregadas de sus cursos.' },
            { title: 'Seguridad de Datos', content: 'Implementamos medidas de seguridad técnicas y organizacionales para proteger tu información, incluyendo cifrado SSL/TLS, almacenamiento seguro de contraseñas y acceso restringido a datos sensibles.' },
            { title: 'Cookies', content: 'Usamos cookies para mantener tu sesión activa, recordar preferencias y analizar el uso de la plataforma. Puedes controlar las cookies desde la configuración de tu navegador.' },
            { title: 'Tus Derechos', content: 'Tienes derecho a acceder, corregir o eliminar tus datos personales. Para ejercer estos derechos, contáctanos en privacidad@codehive.io con tu solicitud.' },
          ].map(section => (
            <div key={section.title}>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{section.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
