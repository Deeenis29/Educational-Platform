import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SECTIONS = [
  {
    title: 'General',
    faqs: [
      { q: '¿Qué es CodeHive Learning?', a: 'CodeHive Learning es una plataforma educativa especializada en cursos técnicos, tecnológicos e industriales. Conectamos estudiantes con expertos de la industria para aprender habilidades prácticas y relevantes.' },
      { q: '¿Cómo funciona el acceso a los cursos?', a: 'Una vez que compras un curso, tienes acceso de por vida. Puedes verlo cuando quieras, en cualquier dispositivo, a tu propio ritmo. No hay fechas de expiración.' },
      { q: '¿Necesito conocimientos previos?', a: 'Depende del curso. Cada curso especifica el nivel requerido (principiante, intermedio o avanzado). Muchos de nuestros cursos están diseñados para comenzar desde cero.' },
    ],
  },
  {
    title: 'Pagos y Precios',
    faqs: [
      { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos tarjetas de crédito y débito (Visa, MasterCard, AmEx), Mercado Pago y transferencia bancaria. Todos los pagos son procesados con cifrado SSL de 256 bits.' },
      { q: '¿Tienen política de reembolso?', a: 'Sí. Ofrecemos garantía de reembolso de 30 días si no estás satisfecho con el contenido del curso. Solo necesitas contactar a soporte con tu solicitud.' },
      { q: '¿Los precios incluyen IVA?', a: 'Los precios mostrados no incluyen impuestos locales. El IVA correspondiente se calcula y muestra durante el proceso de pago según tu país de residencia.' },
    ],
  },
  {
    title: 'Certificados',
    faqs: [
      { q: '¿Los certificados son reconocidos?', a: 'Nuestros certificados digitales son valorados por empresas tecnológicas e industriales en toda Latinoamérica. Incluyen un código único de verificación y pueden compartirse en LinkedIn.' },
      { q: '¿Cómo obtengo mi certificado?', a: 'Para obtener tu certificado debes completar el 100% del curso, incluyendo todos los videos, ejercicios y la evaluación final. El certificado se genera automáticamente.' },
      { q: '¿Puedo verificar un certificado?', a: 'Sí. Cualquier persona puede verificar un certificado de CodeHive ingresando el código único en nuestra página de verificación. Los certificados no tienen fecha de vencimiento.' },
    ],
  },
  {
    title: 'Instructores',
    faqs: [
      { q: '¿Cómo puedo convertirme en instructor?', a: 'Si eres experto en tu área, puedes aplicar como instructor desde la página de Instructores. Revisamos tu perfil y experiencia, y en 48h te damos acceso para crear y publicar tus cursos.' },
      { q: '¿Cuánto ganan los instructores?', a: 'Los instructores reciben el 70% de cada venta bajo el modelo de comisión. También existe la opción de que CodeHive compre el curso completo y lo comercialice. Los pagos se realizan mensualmente.' },
      { q: '¿Qué soporte reciben los instructores?', a: 'Ofrecemos soporte pedagógico, guías de creación de contenido, revisión técnica de los cursos, y herramientas de análisis para entender el progreso de sus estudiantes.' },
    ],
  },
];

export default function FAQs() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setOpenMap(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="bg-gradient-to-br from-indigo-900 to-cyan-900 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h1>
          <p className="text-indigo-200 text-lg">Encuentra respuestas a las preguntas más comunes sobre nuestra plataforma.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {SECTIONS.map(section => (
          <div key={section.title} className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
            <div className="space-y-2">
              {section.faqs.map((faq, i) => {
                const key = `${section.title}-${i}`;
                const open = openMap[key];
                return (
                  <div key={key} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-medium text-gray-900 dark:text-white text-sm pr-4">{faq.q}</span>
                      {open ? <ChevronUp className="w-4 h-4 text-indigo-600 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                    </button>
                    {open && (
                      <div className="px-5 pb-5">
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 p-6 text-center">
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">¿No encontraste tu respuesta?</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Nuestro equipo de soporte está disponible de lunes a viernes de 9am a 6pm.</p>
          <a href="mailto:soporte@codehive.io" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Contactar Soporte →
          </a>
        </div>
      </div>
    </div>
  );
}
