import React, { useState, useMemo } from 'react';
import { InventoryItem, FinancialRecord } from '../types';
import { PlusCircle, DollarSign, Receipt, TrendingUp, BarChart3, Trash2, AlertTriangle, X } from 'lucide-react';

interface FinancialDashboardProps {
  items: InventoryItem[];
  financialRecords: FinancialRecord[];
  onRegisterInvoice: (record: FinancialRecord) => void;
  onClearAllRecords: () => void;
  onDeleteRecord: (id: string) => void;
}

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ 
  items, 
  financialRecords, 
  onRegisterInvoice, 
  onClearAllRecords,
  onDeleteRecord 
}) => {
  // Form State
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [supplier, setSupplier] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  // Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'ALL' | 'SINGLE';
    id?: string;
  }>({ isOpen: false, type: 'ALL' });

  // Filter State
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly');

  const selectedItem = items.find(i => i.id === selectedItemId);
  const totalPrice = quantity * unitPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || quantity <= 0 || unitPrice <= 0) return;

    const newRecord: FinancialRecord = {
      id: crypto.randomUUID(),
      invoiceNumber,
      supplier,
      date,
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      quantity,
      unitPrice,
      totalPrice
    };

    onRegisterInvoice(newRecord);

    // Reset fields keeping Invoice Info for potential multiple items
    setSelectedItemId('');
    setQuantity(0);
    setUnitPrice(0);
  };

  // Handlers para abrir o modal
  const requestClearAll = () => {
    setConfirmModal({ isOpen: true, type: 'ALL' });
  };

  const requestDeleteSingle = (id: string) => {
    setConfirmModal({ isOpen: true, type: 'SINGLE', id });
  };

  // Executar a ação após confirmação
  const handleConfirmAction = () => {
    if (confirmModal.type === 'ALL') {
        onClearAllRecords();
    } else if (confirmModal.type === 'SINGLE' && confirmModal.id) {
        onDeleteRecord(confirmModal.id);
    }
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  // --- CHART LOGIC ---
  const chartData = useMemo(() => {
    const data: Record<string, number> = {};
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Initialize chart structure
    if (viewMode === 'monthly') {
        const currentYear = new Date().getFullYear();
        months.forEach((m, index) => {
            data[`${m}`] = 0;
        });
    }

    // Aggregate Data
    financialRecords.forEach(record => {
        const recDate = new Date(record.date);
        const monthIndex = recDate.getMonth();
        const year = recDate.getFullYear();
        
        if (viewMode === 'monthly' && year === new Date().getFullYear()) {
            data[months[monthIndex]] += record.totalPrice;
        }
    });

    return Object.entries(data).map(([label, value]) => ({ label, value }));
  }, [financialRecords, viewMode]);

  const totalExpense = financialRecords.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const maxChartValue = Math.max(...chartData.map(d => d.value), 100);

  return (
    <div className="space-y-8 pb-10 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Gestão Financeira e Notas Fiscais</h2>
        
        <button 
            type="button"
            onClick={requestClearAll}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 hover:shadow-md active:scale-95 transition-all shadow-sm text-sm font-medium border border-red-200 cursor-pointer"
        >
            <Trash2 size={16} />
            Limpar Todo Histórico
        </button>
      </div>

      {/* --- KPI CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500">Gasto Total Acumulado</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-2">
                        {totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </h3>
                </div>
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                    <DollarSign size={24} />
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500">Notas Lançadas</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-2">
                        {new Set(financialRecords.map(r => r.invoiceNumber)).size}
                    </h3>
                </div>
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Receipt size={24} />
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500">Custo Médio por Item</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-2">
                        {(totalExpense / (financialRecords.reduce((acc, r) => acc + r.quantity, 0) || 1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </h3>
                </div>
                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                    <TrendingUp size={24} />
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- FORMULÁRIO DE LANÇAMENTO --- */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <PlusCircle size={20} className="text-blue-600" />
                    Lançar Nota Fiscal (Entrada)
                </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Nº da Nota Fiscal</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Ex: 12345"
                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Data de Emissão</label>
                        <input 
                            type="date" 
                            required
                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Fornecedor</label>
                    <input 
                        type="text" 
                        required
                        placeholder="Nome da Empresa / Fornecedor"
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                        value={supplier}
                        onChange={(e) => setSupplier(e.target.value)}
                    />
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Detalhes do Item</p>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Produto</label>
                            <select
                                required
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                                value={selectedItemId}
                                onChange={(e) => setSelectedItemId(e.target.value)}
                            >
                                <option value="">Selecione um produto...</option>
                                {items.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Quantidade</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    required
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                                    value={quantity || ''}
                                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Preço Unitário (R$)</label>
                                <input 
                                    type="number" 
                                    min="0.01"
                                    step="0.01"
                                    required
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                                    value={unitPrice || ''}
                                    onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                                />
                            </div>
                        </div>
                        
                        <div className="bg-slate-100 p-3 rounded-lg flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-600">Valor Total do Item:</span>
                            <span className="text-lg font-bold text-slate-900">
                                {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </div>
                    </div>
                </div>

                <button 
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                >
                    <PlusCircle size={20} />
                    Lançar Nota e Atualizar Estoque
                </button>
            </form>
        </div>

        {/* --- DASHBOARD CHART --- */}
        <div className="flex flex-col space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1 min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 size={20} className="text-emerald-600" />
                        Despesas do Almoxarifado
                    </h3>
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        <button 
                            onClick={() => setViewMode('monthly')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${viewMode === 'monthly' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
                        >
                            Mensal
                        </button>
                    </div>
                </div>

                {/* SVG CHART */}
                <div className="w-full h-64 relative mt-8">
                     {/* Y-Axis Grid */}
                     <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400 pointer-events-none">
                        <div className="border-b border-slate-100 w-full h-0 relative"><span className="absolute -top-3 right-full pr-2">R$ {maxChartValue}</span></div>
                        <div className="border-b border-slate-100 w-full h-0 relative"><span className="absolute -top-3 right-full pr-2">R$ {Math.round(maxChartValue * 0.5)}</span></div>
                        <div className="border-b border-slate-100 w-full h-0 relative"><span className="absolute -top-3 right-full pr-2">0</span></div>
                     </div>

                     <div className="absolute inset-0 flex items-end justify-between pl-12 pr-4 pb-6 pt-2 gap-2">
                        {chartData.map((data, index) => {
                            const heightPercentage = (data.value / maxChartValue) * 100;
                            return (
                                <div key={index} className="flex-1 flex flex-col justify-end items-center h-full group relative">
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        R$ {data.value.toLocaleString('pt-BR')}
                                    </div>
                                    
                                    {/* Bar */}
                                    <div 
                                        className="w-full bg-blue-200 rounded-t-sm hover:bg-blue-500 transition-all duration-300 relative"
                                        style={{ height: `${heightPercentage}%` }}
                                    >
                                    </div>
                                    
                                    {/* Label */}
                                    <span className="text-[10px] text-slate-500 mt-2 font-medium">{data.label}</span>
                                </div>
                            );
                        })}
                     </div>
                     
                     {/* SVG Trend Line Overlay (Simplified representation) */}
                     <svg className="absolute inset-0 w-full h-full pointer-events-none pl-12 pr-4 pb-6 pt-2 hidden md:block" preserveAspectRatio="none">
                         <polyline 
                            fill="none" 
                            stroke="#10b981" 
                            strokeWidth="2" 
                            points={chartData.map((d, i) => {
                                const x = (i / (chartData.length - 1)) * 100; // Approximate X %
                                const y = 100 - ((d.value / maxChartValue) * 100); // Inverted Y %
                                return `${x * (chartData.length > 1 ? (chartData.length - 0.5) / chartData.length : 1)}%,${y}%`; 
                            }).join(' ')}
                            vectorEffect="non-scaling-stroke"
                            className="opacity-50"
                         />
                     </svg>
                </div>
                
                <div className="flex justify-center items-center gap-6 mt-6 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                        <span>Despesas (Barras)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span>Tendência (Linha)</span>
                    </div>
                </div>
            </div>

            {/* Recent Invoices Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1">
                <h3 className="font-bold text-slate-800 mb-4">Últimas Notas Lançadas</h3>
                <div className="overflow-y-auto max-h-[200px]">
                    <table className="w-full text-left text-xs">
                        <thead className="text-slate-500 font-medium border-b border-slate-100 bg-slate-50 sticky top-0">
                            <tr>
                                <th className="py-2 px-2">Data</th>
                                <th className="py-2 px-2">Nota Fiscal</th>
                                <th className="py-2 px-2">Fornecedor</th>
                                <th className="py-2 px-2 text-right">Valor</th>
                                <th className="py-2 px-2 text-center w-10">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {financialRecords.slice().reverse().map(record => (
                                <tr key={record.id} className="group hover:bg-slate-50">
                                    <td className="py-2 px-2">{new Date(record.date).toLocaleDateString()}</td>
                                    <td className="py-2 px-2 font-medium">{record.invoiceNumber}</td>
                                    <td className="py-2 px-2 text-slate-600 truncate max-w-[100px]">{record.supplier}</td>
                                    <td className="py-2 px-2 text-right font-bold text-slate-800">
                                        {record.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td className="py-2 px-2 text-center">
                                        <button 
                                            onClick={() => requestDeleteSingle(record.id)}
                                            className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                            title="Excluir Registro"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {financialRecords.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-4 text-center text-slate-400">Nenhum registro encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* --- CUSTOM CONFIRMATION MODAL --- */}
        {confirmModal.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden transform scale-100">
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle size={32} className="text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                            {confirmModal.type === 'ALL' ? 'Excluir Todo o Histórico?' : 'Excluir Registro?'}
                        </h3>
                        <p className="text-slate-500 text-sm mb-6">
                            {confirmModal.type === 'ALL' 
                                ? 'Esta ação apagará permanentemente todos os lançamentos financeiros. Não será possível recuperar.' 
                                : 'Tem certeza que deseja remover esta nota fiscal do histórico?'}
                        </p>
                        
                        <div className="flex gap-3 justify-center">
                            <button 
                                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                                className="px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleConfirmAction}
                                className="px-5 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 shadow-lg shadow-red-500/30 transition-colors flex items-center gap-2"
                            >
                                <Trash2 size={18} />
                                Confirmar Exclusão
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};