import React, { useState } from 'react';
import { InventoryItem, StockMovement } from '../types';
import { PlusCircle, MinusCircle, Printer, Save, History, FileText } from 'lucide-react';
import { Receipt } from './Receipt';

interface StockOperationsProps {
  items: InventoryItem[];
  history: StockMovement[];
  onUpdateStock: (itemId: string, newQuantity: number, movement: StockMovement) => void;
}

export const StockOperations: React.FC<StockOperationsProps> = ({ items, history, onUpdateStock }) => {
  const [operationType, setOperationType] = useState<'IN' | 'OUT'>('OUT');
  const [selectedItemId, setSelectedItemId] = useState(items[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [employeeName, setEmployeeName] = useState('');
  
  // States for Receipt Modal
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptMovement, setReceiptMovement] = useState<StockMovement | null>(null);

  const selectedItem = items.find(i => i.id === selectedItemId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    if (operationType === 'OUT' && quantity > selectedItem.quantity) {
      alert("Erro: Quantidade solicitada maior que o estoque disponível.");
      return;
    }

    const newQty = operationType === 'IN' 
      ? selectedItem.quantity + quantity 
      : selectedItem.quantity - quantity;

    const movement: StockMovement = {
      id: crypto.randomUUID(),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      type: operationType,
      quantity,
      date: new Date().toISOString(),
      employeeName: operationType === 'OUT' ? employeeName : undefined
    };

    onUpdateStock(selectedItem.id, newQty, movement);
    
    // Reset form partially
    setQuantity(1);
    
    if (operationType === 'OUT') {
      setReceiptMovement(movement);
      setShowReceipt(true);
      setEmployeeName(''); // Limpa nome apenas se foi sucesso
    } else {
      alert("Entrada registrada com sucesso!");
    }
  };

  const handleOpenReceipt = (movement: StockMovement) => {
    setReceiptMovement(movement);
    setShowReceipt(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-slate-800">Operações de Estoque</h2>

      {/* OPERAÇÕES CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-100 pb-4">
          <button
            onClick={() => setOperationType('OUT')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-medium ${
              operationType === 'OUT' 
                ? 'bg-amber-100 text-amber-800 shadow-sm ring-1 ring-amber-200' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <MinusCircle size={20} />
            Baixa (Saída/EPI)
          </button>
          <button
            onClick={() => setOperationType('IN')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-medium ${
              operationType === 'IN' 
                ? 'bg-blue-100 text-blue-800 shadow-sm ring-1 ring-blue-200' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <PlusCircle size={20} />
            Cadastro (Entrada)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Selecione o Produto</label>
              <select
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900"
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
              >
                {items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} (Prateleira: {item.location}) - {item.quantity} {item.unit}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Quantidade</label>
              <div className="flex items-center">
                 <input
                  type="number"
                  min="1"
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                />
                <span className="ml-3 text-slate-500 font-medium w-16 bg-slate-100 p-3 rounded-lg text-center border border-slate-200">
                  {selectedItem?.unit || '-'}
                </span>
              </div>
            </div>

            {operationType === 'OUT' && (
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Nome do Funcionário (Recebedor)</label>
                <input
                  type="text"
                  required
                  placeholder="Nome completo do colaborador"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Printer size={12} />
                  Ao registrar a saída, um recibo digital será gerado automaticamente.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className={`px-8 py-3 rounded-lg text-white font-medium shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2 ${
                operationType === 'IN' ? 'bg-blue-600' : 'bg-amber-600'
              }`}
            >
              <Save size={20} />
              {operationType === 'IN' ? 'Registrar Entrada' : 'Registrar Baixa e Gerar Recibo'}
            </button>
          </div>
        </form>
      </div>

      {/* HISTÓRICO DE MOVIMENTAÇÕES */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="text-slate-400" size={20} />
            <h3 className="font-bold text-slate-800">Histórico Recente</h3>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            Últimos registros
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Data/Hora</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Qtd.</th>
                <th className="px-6 py-4">Funcionário / Obs</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500 italic">
                    Nenhuma movimentação registrada ainda.
                  </td>
                </tr>
              ) : (
                history.map((mov) => (
                  <tr key={mov.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(mov.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        mov.type === 'IN' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {mov.type === 'IN' ? 'ENTRADA' : 'SAÍDA'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{mov.itemName}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{mov.quantity}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {mov.employeeName || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {mov.type === 'OUT' && (
                        <button 
                          onClick={() => handleOpenReceipt(mov)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium inline-flex items-center gap-1 hover:underline"
                        >
                          <FileText size={14} />
                          Ver Recibo
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showReceipt && receiptMovement && (
        <Receipt 
          movement={receiptMovement}
          item={items.find(i => i.id === receiptMovement.itemId) || null}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};