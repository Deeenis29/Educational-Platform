import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Course, Category } from '../../types';
import CourseCard from '../../components/ui/CourseCard';
import { useAuth } from '../../contexts/AuthContext';

const DEMO_COURSES: Course[] = [
  { id: '1', title: 'React desde Cero', slug: 'react-desde-cero', description: 'Aprende React desde los fundamentos hasta proyectos avanzados con hooks modernos, Context API, React Router y mejores prácticas del ecosistema.', short_description: '', category_id: 'prog', instructor_id: '1', price: 49, original_price: 99, level: 'beginner', duration_hours: 28, image_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.8, review_count: 1240, student_count: 8420, language: 'Español', objectives: [], requirements: [], tags: ['React', 'JavaScript'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'prog', name: 'Programación', slug: 'programacion', description: '', icon: '', color: '#4F46E5', course_count: 0, created_at: '' }, instructor: { id: '1', full_name: 'Carlos Mendoza', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '2', title: 'TypeScript Profesional', slug: 'typescript-profesional', description: '', short_description: '', category_id: 'prog', instructor_id: '1', price: 59, original_price: 110, level: 'intermediate', duration_hours: 22, image_url: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.7, review_count: 843, student_count: 5200, language: 'Español', objectives: [], requirements: [], tags: ['TypeScript'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'prog', name: 'Programación', slug: 'programacion', description: '', icon: '', color: '#4F46E5', course_count: 0, created_at: '' }, instructor: { id: '1', full_name: 'Carlos Mendoza', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '3', title: 'Node.js y APIs REST', slug: 'nodejs-apis-rest', description: '', short_description: '', category_id: 'prog', instructor_id: '2', price: 69, original_price: 130, level: 'intermediate', duration_hours: 35, image_url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.6, review_count: 721, student_count: 4100, language: 'Español', objectives: [], requirements: [], tags: ['Node.js', 'APIs'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'prog', name: 'Programación', slug: 'programacion', description: '', icon: '', color: '#4F46E5', course_count: 0, created_at: '' }, instructor: { id: '2', full_name: 'Ana Torres', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '4', title: 'Electricidad Industrial Básica', slug: 'electricidad-industrial-basica', description: '', short_description: '', category_id: 'elec', instructor_id: '3', price: 59, original_price: 120, level: 'beginner', duration_hours: 32, image_url: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.9, review_count: 876, student_count: 5230, language: 'Español', objectives: [], requirements: [], tags: ['Electricidad'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'elec', name: 'Electricidad Industrial', slug: 'electricidad-industrial', description: '', icon: '', color: '#F59E0B', course_count: 0, created_at: '' }, instructor: { id: '3', full_name: 'Ing. Roberto Vargas', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '5', title: 'PLC Siemens Nivel 1', slug: 'plc-siemens-nivel-1', description: '', short_description: '', category_id: 'plc', instructor_id: '4', price: 79, original_price: 150, level: 'intermediate', duration_hours: 40, image_url: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.7, review_count: 543, student_count: 3120, language: 'Español', objectives: [], requirements: [], tags: ['PLC', 'Siemens'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'plc', name: 'PLC & SCADA', slug: 'plc-scada', description: '', icon: '', color: '#10B981', course_count: 0, created_at: '' }, instructor: { id: '4', full_name: 'Ing. Ana Torres', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '6', title: 'Automatización Industrial', slug: 'automatizacion-industrial', description: '', short_description: '', category_id: 'auto', instructor_id: '3', price: 89, original_price: 160, level: 'advanced', duration_hours: 45, image_url: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.8, review_count: 412, student_count: 2800, language: 'Español', objectives: [], requirements: [], tags: ['Automatización'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'auto', name: 'Automatización', slug: 'automatizacion', description: '', icon: '', color: '#06B6D4', course_count: 0, created_at: '' }, instructor: { id: '3', full_name: 'Ing. Roberto Vargas', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '7', title: 'Inteligencia Artificial Aplicada', slug: 'inteligencia-artificial-aplicada', description: '', short_description: '', category_id: 'ia', instructor_id: '5', price: 89, original_price: 180, level: 'intermediate', duration_hours: 50, image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.8, review_count: 921, student_count: 6780, language: 'Español', objectives: [], requirements: [], tags: ['IA', 'ML'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'ia', name: 'Inteligencia Artificial', slug: 'inteligencia-artificial', description: '', icon: '', color: '#8B5CF6', course_count: 0, created_at: '' }, instructor: { id: '5', full_name: 'Dr. Luis Sánchez', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '8', title: 'Docker para Desarrolladores', slug: 'docker-para-desarrolladores', description: '', short_description: '', category_id: 'cloud', instructor_id: '2', price: 55, original_price: 110, level: 'intermediate', duration_hours: 18, image_url: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.6, review_count: 634, student_count: 4320, language: 'Español', objectives: [], requirements: [], tags: ['Docker', 'DevOps'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'cloud', name: 'Cloud Computing', slug: 'cloud-computing', description: '', icon: '', color: '#3B82F6', course_count: 0, created_at: '' }, instructor: { id: '2', full_name: 'Ana Torres', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '9', title: 'Ciberseguridad Fundamental', slug: 'ciberseguridad-fundamental', description: '', short_description: '', category_id: 'cyber', instructor_id: '6', price: 75, original_price: 150, level: 'beginner', duration_hours: 30, image_url: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.7, review_count: 587, student_count: 3910, language: 'Español', objectives: [], requirements: [], tags: ['Seguridad'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'cyber', name: 'Ciberseguridad', slug: 'ciberseguridad', description: '', icon: '', color: '#EF4444', course_count: 0, created_at: '' }, instructor: { id: '6', full_name: 'Ing. Patricia López', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '10', title: 'Machine Learning para Empresas', slug: 'machine-learning-empresas', description: '', short_description: '', category_id: 'ia', instructor_id: '5', price: 99, original_price: 200, level: 'advanced', duration_hours: 60, image_url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.9, review_count: 344, student_count: 2150, language: 'Español', objectives: [], requirements: [], tags: ['ML', 'Python'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'ia', name: 'Inteligencia Artificial', slug: 'inteligencia-artificial', description: '', icon: '', color: '#8B5CF6', course_count: 0, created_at: '' }, instructor: { id: '5', full_name: 'Dr. Luis Sánchez', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '11', title: 'Diseño CAD con AutoCAD', slug: 'diseno-cad-autocad', description: '', short_description: '', category_id: 'cad', instructor_id: '7', price: 65, original_price: 130, level: 'beginner', duration_hours: 24, image_url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.6, review_count: 421, student_count: 2890, language: 'Español', objectives: [], requirements: [], tags: ['CAD', 'AutoCAD'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'cad', name: 'Diseño CAD', slug: 'diseno-cad', description: '', icon: '', color: '#EC4899', course_count: 0, created_at: '' }, instructor: { id: '7', full_name: 'Arq. Marina Flores', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
  { id: '12', title: 'Cloud Computing AWS', slug: 'cloud-computing-aws', description: '', short_description: '', category_id: 'cloud', instructor_id: '2', price: 85, original_price: 170, level: 'intermediate', duration_hours: 42, image_url: 'https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=600', trailer_url: '', status: 'published', is_free: false, has_certificate: true, rating: 4.8, review_count: 712, student_count: 5100, language: 'Español', objectives: [], requirements: [], tags: ['AWS', 'Cloud'], commercial_model: 'commission', commission_rate: 30, created_at: '', updated_at: '', category: { id: 'cloud', name: 'Cloud Computing', slug: 'cloud-computing', description: '', icon: '', color: '#3B82F6', course_count: 0, created_at: '' }, instructor: { id: '2', full_name: 'Ana Torres', email: '', avatar_url: '', bio: '', role: 'instructor', headline: '', website: '', points: 0, level: 1, is_approved: true, created_at: '', updated_at: '' } },
];

const LEVELS = [
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Más populares' },
  { value: 'rating', label: 'Mejor valorados' },
  { value: 'newest', label: 'Más recientes' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
];

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || '');

  const categories = Array.from(new Set(DEMO_COURSES.map(c => c.category?.name || ''))).filter(Boolean);

  const filtered = DEMO_COURSES
    .filter(c => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
      const matchLevel = selectedLevel.length === 0 || selectedLevel.includes(c.level);
      const matchCategory = !selectedCategory || c.category?.name === selectedCategory;
      const matchPrice = priceRange === 'all' ? true
        : priceRange === 'free' ? c.is_free
        : priceRange === 'under50' ? c.price < 50
        : priceRange === 'under100' ? c.price < 100
        : true;
      return matchSearch && matchLevel && matchCategory && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return b.student_count - a.student_count;
    });

  const clearFilters = () => {
    setSearch('');
    setSelectedLevel([]);
    setPriceRange('all');
    setSortBy('popular');
    setSelectedCategory('');
  };

  const hasFilters = search || selectedLevel.length > 0 || priceRange !== 'all' || selectedCategory;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Header */}
      <div className="bg-indigo-900 dark:bg-gray-950 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Catálogo de Cursos</h1>
          <p className="text-indigo-200 mb-6">Descubre más de 350 cursos técnicos y tecnológicos</p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Busca cursos, tecnologías, habilidades..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> cursos encontrados
            </p>
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-lg">
                <X className="w-3 h-3" /> Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filtros
              {hasFilters && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none pr-8"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 mb-6">
            <div className="grid sm:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Categoría</h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${!selectedCategory ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    Todas
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Nivel</h4>
                <div className="space-y-1.5">
                  {LEVELS.map(l => (
                    <label key={l.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLevel.includes(l.value)}
                        onChange={e => setSelectedLevel(prev =>
                          e.target.checked ? [...prev, l.value] : prev.filter(v => v !== l.value)
                        )}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{l.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Precio</h4>
                <div className="space-y-1.5">
                  {[
                    { value: 'all', label: 'Todos los precios' },
                    { value: 'free', label: 'Gratuitos' },
                    { value: 'under50', label: 'Menos de $50' },
                    { value: 'under100', label: 'Menos de $100' },
                  ].map(p => (
                    <label key={p.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={p.value}
                        checked={priceRange === p.value}
                        onChange={() => setPriceRange(p.value)}
                        className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No se encontraron cursos</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Prueba con otros filtros o términos de búsqueda</p>
            <button onClick={clearFilters} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              Limpiar todos los filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
