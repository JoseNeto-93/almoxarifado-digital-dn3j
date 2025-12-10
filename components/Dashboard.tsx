import React from 'react';
import { InventoryItem } from '../types';
import { AlertTriangle, PackageCheck, TrendingDown, Archive } from 'lucide-react';

interface DashboardProps {
  items: InventoryItem[];
}

export const Dashboard: React.FC<DashboardProps> = ({ items }) => {
  const lowStockItems = items.filter(i => i.quantity <= i.minStock);
  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const distinctProducts = items.length;
  const criticalCount = lowStockItems.length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Painel de Controle</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total de Itens</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{totalItems}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Archive size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Produtos Distintos</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{distinctProducts}</h3>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <PackageCheck size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Estoque Baixo</p>
              <h3 className={`text-3xl font-bold mt-2 ${criticalCount > 0 ? 'text-red-600' : 'text-slate-800'}`}>
                {criticalCount}
              </h3>
            </div>
            <div className={`p-2 rounded-lg ${criticalCount > 0 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'}`}>
              <TrendingDown size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={20} />
          <h3 className="font-semibold text-slate-800">Alertas de Reposição</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Produto</th>
                <th className="px-6 py-3">Categoria</th>
                <th className="px-6 py-3 text-right">Quantidade Atual</th>
                <th className="px-6 py-3 text-right">Mínimo</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lowStockItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhum item com estoque crítico no momento.
                  </td>
                </tr>
              ) : (
                lowStockItems.map((item) => (
                  <tr key={item.id} className="hover:bg-red-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-slate-500">{item.category}</td>
                    <td className="px-6 py-4 text-right font-bold text-red-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-right text-slate-500">{item.minStock}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        CRÍTICO
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};