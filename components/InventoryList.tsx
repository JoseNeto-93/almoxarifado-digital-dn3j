import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { Search, Filter, AlertCircle, Plus, X, Save, MapPin } from 'lucide-react';

interface InventoryListProps {
  items: InventoryItem[];
  onAddProduct: (item: InventoryItem) => void;
}

export const InventoryList: React.FC<InventoryListProps> = ({ items, onAddProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemMinStock, setNewItemMinStock] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('un');
  const [newItemQuantity, setNewItemQuantity] = useState('0');
  const [newItemLocation, setNewItemLocation] = useState('');

  const categories = ['Todas', ...Array.from(new Set(items.map(i => i.category)))];
  const uniqueCategories = Array.from(new Set(items.map(i => i.category)));

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Todas' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItemName || !newItemCategory || !newItemMinStock || !newItemUnit || !newItemLocation) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const newItem: InventoryItem = {
      id: crypto.randomUUID(),
      name: newItemName,
      category: newItemCategory,
      quantity: parseInt(newItemQuantity) || 0,
      minStock: parseInt(newItemMinStock) || 0,
      unit: newItemUnit,
      location: newItemLocation,
      lastUpdated: new Date().toISOString()
    };

    onAddProduct(newItem);
    
    // Reset Form
    setNewItemName('');
    setNewItemCategory('');
    setNewItemMinStock('');
    setNewItemUnit('un');
    setNewItemQuantity('0');
    setNewItemLocation('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Estoque Atual</h2>
        
        <div className="flex flex-wrap gap-2">
           <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            <Plus size={18} />
            Novo Produto
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Pesquisar produto ou prateleira..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full md:w-64 text-slate-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              className="pl-10 pr-8 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none min-w-[150px] text-slate-900"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4 text-center">Prateleira</th>
                <th className="px-6 py-4 text-right">Qtd. Atual</th>
                <th className="px-6 py-4 text-right">Qtd. Mínima</th>
                <th className="px-6 py-4 text-center">Unidade</th>
                <th className="px-6 py-4 text-right">Última Atualização</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const isLowStock = item.quantity <= item.minStock;
                return (
                  <tr 
                    key={item.id} 
                    className={`transition-colors hover:bg-slate-50 ${isLowStock ? 'bg-red-50/70' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {isLowStock && <AlertCircle size={16} className="text-red-600" />}
                        <span className={`font-medium ${isLowStock ? 'text-red-700' : 'text-slate-900'}`}>
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{item.category}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 text-xs font-mono">
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${isLowStock ? 'text-red-700' : 'text-slate-700'}`}>
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500">{item.minStock}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{item.unit}</td>
                    <td className="px-6 py-4 text-right text-slate-500 text-xs">
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            Nenhum item encontrado.
          </div>
        )}
      </div>

      {/* MODAL DE CADASTRO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Cadastrar Novo Produto</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nome do Produto *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Luva de Raspa"
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder-slate-400"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Categoria *</label>
                  <input 
                    type="text" 
                    required
                    list="categories-list"
                    placeholder="Ex: EPI"
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder-slate-400"
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                  />
                  <datalist id="categories-list">
                    {uniqueCategories.map(cat => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Prateleira *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: A-10"
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder-slate-400"
                    value={newItemLocation}
                    onChange={(e) => setNewItemLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Unidade *</label>
                  <select 
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                  >
                    <option value="un">Unidade (un)</option>
                    <option value="par">Par</option>
                    <option value="kg">Quilo (kg)</option>
                    <option value="l">Litro (l)</option>
                    <option value="cx">Caixa (cx)</option>
                    <option value="m">Metro (m)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Estoque Inicial</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder-slate-400"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Estoque Mínimo *</label>
                <input 
                  type="number" 
                  min="0"
                  required
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder-slate-400"
                  value={newItemMinStock}
                  onChange={(e) => setNewItemMinStock(e.target.value)}
                />
                <p className="text-[10px] text-slate-500">Alerta de reposição será ativado abaixo deste valor.</p>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};