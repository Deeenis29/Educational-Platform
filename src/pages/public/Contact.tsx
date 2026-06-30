import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="bg-gradient-to-br from-indigo-900 to-cyan-900 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contáctanos</h1>
          <p className="text-indigo-200 text-lg">Estamos aquí para ayudarte. Escríbenos y te responderemos pronto.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Información de Contacto</h3>
              <div className="space-y-4">
                {[
                  { icon: <Mail className="w-5 h-5 text-indigo-600" />, label: 'Email', value: 'hola@codehive.io' },
                  { icon: <Phone className="w-5 h-5 text-indigo-600" />, label: 'Teléfono', value: '+1 (555) 000-0000' },
                  { icon: <MapPin className="w-5 h-5 text-indigo-600" />, label: 'Ubicación', value: 'Ciudad de México, México' },
                ].map(item => (
                  <div key={item.label} className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
              <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 mb-1">Horario de Soporte</p>
              <p className="text-xs text-indigo-700 dark:text-indigo-300">Lun – Vie: 9:00 AM – 6:00 PM CST</p>
              <p className="text-xs text-indigo-700 dark:text-indigo-300">Sáb: 10:00 AM – 2:00 PM CST</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {sent ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">¡Mensaje enviado!</h3>
                <p className="text-gray-600 dark:text-gray-400">Te responderemos en menos de 24 horas hábiles.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nombre *</label>
                    <input
                      type="text" required
                      value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Tu nombre"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                    <input
                      type="email" required
                      value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="tu@correo.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Asunto *</label>
                  <input
                    type="text" required
                    value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mensaje *</label>
                  <textarea
                    required rows={5}
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Cuéntanos tu consulta con detalle..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4" /> Enviar Mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
