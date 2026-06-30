import { DollarSign, TrendingUp, Users, Download } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const SALES = [
  { id: '#001', student: 'María González', course: 'React desde Cero', amount: 49, commission: 14.7, net: 34.3, method: 'Tarjeta', date: '2024-03-28', status: 'approved' },
  { id: '#002', student: 'Pedro Ramírez', course: 'TypeScript Profesional', amount: 59, commission: 17.7, net: 41.3, method: 'Mercado Pago', date: '2024-03-27', status: 'approved' },
  { id: '#003', student: 'Laura Díaz', course: 'React desde Cero', amount: 49, commission: 14.7, net: 34.3, method: 'Tarjeta', date: '2024-03-27', status: 'approved' },
  { id: '#004', student: 'Carlos Morales', course: 'React desde Cero', amount: 49, commission: 14.7, net: 34.3, method: 'Transferencia', date: '2024-03-26', status: 'approved' },
  { id: '#005', student: 'Ana Jiménez', course: 'TypeScript Profesional', amount: 59, commission: 17.7, net: 41.3, method: 'Tarjeta', date: '2024-03-25', status: 'approved' },
];

export default function InstructorSales() {
  const totalRevenue = SALES.reduce((sum, s) => sum + s.net, 0);
  const totalSales = SALES.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Ventas</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Historial de ventas y comisiones</p>
          </div>
          <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Ingresos Netos', value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign className="w-5 h-5" />, color: 'text-green-600 bg-green-50 dark:bg-green-900/30' },
            { label: 'Total Ventas', value: totalSales, icon: <TrendingUp className="w-5 h-5" />, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' },
            { label: 'Nuevos Estudiantes', value: totalSales, icon: <Users className="w-5 h-5" />, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30' },
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
                  {['ID', 'Estudiante', 'Curso', 'Total', 'Comisión (30%)', 'Mi ingreso', 'Método', 'Fecha'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-5 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SALES.map(sale => (
                  <tr key={sale.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-mono text-gray-500 dark:text-gray-400">{sale.id}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-900 dark:text-white">{sale.student}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-700 dark:text-gray-300">{sale.course}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 dark:text-white">${sale.amount}</td>
                    <td className="px-5 py-3.5 text-sm text-red-500">-${sale.commission.toFixed(2)}</td>
                    <td className="px-5 py-3.5 text-sm font-bold text-green-600">${sale.net.toFixed(2)}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600 dark:text-gray-400">{sale.method}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500 dark:text-gray-400">{sale.date}</td>
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
