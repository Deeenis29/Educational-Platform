import { DollarSign, TrendingUp, Download } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const PAYMENTS = [
  { id: '#P001', student: 'María González', course: 'React desde Cero', instructor: 'Carlos Mendoza', total: 49, platform: 14.7, instructor_amt: 34.3, method: 'Tarjeta', date: '2024-03-28', status: 'approved' },
  { id: '#P002', student: 'Pedro Ramírez', course: 'TypeScript Profesional', instructor: 'Carlos Mendoza', total: 59, platform: 17.7, instructor_amt: 41.3, method: 'Mercado Pago', date: '2024-03-27', status: 'approved' },
  { id: '#P003', student: 'Laura Díaz', course: 'Electricidad Industrial', instructor: 'Ing. Roberto Vargas', total: 59, platform: 17.7, instructor_amt: 41.3, method: 'Tarjeta', date: '2024-03-27', status: 'approved' },
  { id: '#P004', student: 'Carlos Morales', course: 'PLC Siemens Nivel 1', instructor: 'Ing. Ana Torres', total: 79, platform: 23.7, instructor_amt: 55.3, method: 'Transferencia', date: '2024-03-26', status: 'approved' },
  { id: '#P005', student: 'Ana Jiménez', course: 'Docker para Desarrolladores', instructor: 'Ana Torres', total: 55, platform: 16.5, instructor_amt: 38.5, method: 'Tarjeta', date: '2024-03-25', status: 'approved' },
];

export default function AdminPayments() {
  const totalRevenue = PAYMENTS.reduce((sum, p) => sum + p.platform, 0);
  const totalTransactions = PAYMENTS.length;
  const totalVolume = PAYMENTS.reduce((sum, p) => sum + p.total, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestionar Pagos</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Historial completo de transacciones</p>
          </div>
          <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" /> Exportar
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Comisiones Recaudadas', value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign className="w-5 h-5" />, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' },
            { label: 'Volumen Total', value: `$${totalVolume.toFixed(2)}`, icon: <TrendingUp className="w-5 h-5" />, color: 'text-green-600 bg-green-50 dark:bg-green-900/30' },
            { label: 'Transacciones', value: totalTransactions, icon: <DollarSign className="w-5 h-5" />, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>{s.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  {['ID', 'Estudiante', 'Curso', 'Instructor', 'Total', 'Comisión', 'Instructor', 'Método', 'Fecha', 'Estado'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PAYMENTS.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500 dark:text-gray-400">{p.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{p.student}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-[140px] truncate">{p.course}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{p.instructor}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">${p.total}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-indigo-600">${p.platform.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-green-600">${p.instructor_amt.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{p.method}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{p.date}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                        Aprobado
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
