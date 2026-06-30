import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Upload, Plus, Trash2, ArrowLeft } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

const CATEGORIES = [
  'Programación', 'Electricidad Industrial', 'Automatización', 'PLC & SCADA',
  'Inteligencia Artificial', 'Ciberseguridad', 'Cloud Computing', 'Diseño CAD',
  'Robótica', 'Data Analytics', 'Marketing Digital', 'UX/UI', 'Impresión 3D', 'Mantenimiento Industrial'
];

export default function NewCourse() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    category: '',
    level: 'beginner',
    description: '',
    price: '',
    originalPrice: '',
    language: 'Español',
    objectives: ['', '', ''],
    requirements: ['', ''],
    status: 'draft',
  });

  const setField = (key: string, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = async (publish = false) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    navigate('/instructor/cursos');
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/instructor/cursos')} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crear Nuevo Curso</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Completa la información de tu curso</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-3">
          {[1, 2, 3].map(s => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                step === s ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step === s ? 'bg-white text-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`}>{s}</span>
              {s === 1 ? 'Información' : s === 2 ? 'Contenido' : 'Precio'}
            </button>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
            <h3 className="font-semibold text-gray-900 dark:text-white">Información Básica</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Título del curso *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setField('title', e.target.value)}
                placeholder="ej. React desde Cero: De Principiante a Experto"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Categoría *</label>
                <select
                  value={form.category}
                  onChange={e => setField('category', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Seleccionar...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nivel *</label>
                <select
                  value={form.level}
                  onChange={e => setField('level', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Descripción *</label>
              <textarea
                value={form.description}
                onChange={e => setField('description', e.target.value)}
                placeholder="Describe qué aprenderán los estudiantes, a quién está dirigido y qué hace especial tu curso..."
                rows={5}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            {/* Objectives */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Lo que aprenderán los estudiantes
              </label>
              {form.objectives.map((obj, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={obj}
                    onChange={e => {
                      const updated = [...form.objectives];
                      updated[i] = e.target.value;
                      setField('objectives', updated);
                    }}
                    placeholder={`Objetivo ${i + 1}`}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {form.objectives.length > 1 && (
                    <button
                      onClick={() => setField('objectives', form.objectives.filter((_, idx) => idx !== i))}
                      className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setField('objectives', [...form.objectives, ''])}
                className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar objetivo
              </button>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Imagen del curso</label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Arrastra una imagen o haz clic para subir</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 2MB · Recomendado 1280x720px</p>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition-colors">
              Siguiente: Contenido
            </button>
          </div>
        )}

        {/* Step 2: Content */}
        {step === 2 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
            <h3 className="font-semibold text-gray-900 dark:text-white">Estructura del Curso</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Organiza tu curso en módulos y lecciones. Puedes agregar videos, PDFs, ejercicios y evaluaciones.
            </p>

            <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium text-gray-900 dark:text-white text-sm">Módulo 1</p>
                <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Agregar lección
                </button>
              </div>
              <input
                type="text"
                placeholder="Título del módulo"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
              />
              <div className="pl-4 space-y-2">
                {['Introducción al curso', 'Configuración del entorno'].map((l, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs text-indigo-600 dark:text-indigo-400">
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{l}</span>
                    <span className="text-xs text-gray-400">Video</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 px-4 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
              <Plus className="w-4 h-4" /> Agregar Módulo
            </button>

            <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Atrás
              </button>
              <button onClick={() => setStep(3)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition-colors">
                Siguiente: Precio
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 3 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
            <h3 className="font-semibold text-gray-900 dark:text-white">Precio y Publicación</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Precio (USD) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setField('price', e.target.value)}
                    placeholder="49"
                    min="0"
                    className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Precio original</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={e => setField('originalPrice', e.target.value)}
                    placeholder="99"
                    min="0"
                    className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
              <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200 mb-1">Modelo comercial: Comisión</p>
              <p className="text-xs text-indigo-700 dark:text-indigo-300">
                CodeHive retiene el 30% por cada venta. Tú recibes el 70% restante de forma automática.
              </p>
            </div>

            <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Atrás
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-60"
              >
                <Save className="w-4 h-4" /> Guardar borrador
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition-colors disabled:opacity-60"
              >
                {saving ? 'Enviando...' : 'Enviar para revisión'}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
