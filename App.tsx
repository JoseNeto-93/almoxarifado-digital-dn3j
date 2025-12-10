import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { InventoryList } from './components/InventoryList';
import { StockOperations } from './components/StockOperations';
import { AIAssistant } from './components/AIAssistant';
import { FinancialDashboard } from './components/FinancialDashboard';
import { LoginScreen } from './components/LoginScreen';
import { InventoryItem, StockMovement, FinancialRecord } from './types';
import { Building2, MapPin, User, Settings, Save, X, LogOut, AlertTriangle } from 'lucide-react';

// Initial Mock Data
const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Calçado de Segurança (Botina)', category: 'EPI - Pés', quantity: 12, minStock: 15, unit: 'par', location: 'A-10', lastUpdated: new Date().toISOString() },
  { id: '2', name: 'Capacete com Jugular', category: 'EPI - Cabeça', quantity: 45, minStock: 10, unit: 'un', location: 'B-04', lastUpdated: new Date().toISOString() },
  { id: '3', name: 'Luva de Vaqueta', category: 'EPI - Mãos', quantity: 8, minStock: 20, unit: 'par', location: 'A-12', lastUpdated: new Date().toISOString() },
  { id: '4', name: 'Protetor Auditivo Plug', category: 'EPI - Audição', quantity: 150, minStock: 50, unit: 'par', location: 'C-01', lastUpdated: new Date().toISOString() },
  { id: '5', name: 'Camisa Uniforme G', category: 'Uniforme', quantity: 30, minStock: 10, unit: 'un', location: 'D-22', lastUpdated: new Date().toISOString() },
  { id: '6', name: 'Óculos de Proteção Incolor', category: 'EPI - Olhos', quantity: 18, minStock: 15, unit: 'un', location: 'A-05', lastUpdated: new Date().toISOString() },
  { id: '7', name: 'Cinto de Segurança PQD', category: 'EPI - Altura', quantity: 5, minStock: 3, unit: 'un', location: 'E-08', lastUpdated: new Date().toISOString() },
];

const INITIAL_FINANCIAL: FinancialRecord[] = [
  { 
    id: 'f1', invoiceNumber: '001234', supplier: 'Safety Brasil Ltda', date: '2025-01-15', 
    itemId: '1', itemName: 'Calçado de Segurança (Botina)', quantity: 10, unitPrice: 85.50, totalPrice: 855.00 
  },
  { 
    id: 'f2', invoiceNumber: '001299', supplier: 'Protege Tudo SA', date: '2025-02-10', 
    itemId: '3', itemName: 'Luva de Vaqueta', quantity: 20, unitPrice: 12.00, totalPrice: 240.00 
  },
  { 
    id: 'f3', invoiceNumber: '001299', supplier: 'Protege Tudo SA', date: '2025-02-10', 
    itemId: '4', itemName: 'Protetor Auditivo Plug', quantity: 100, unitPrice: 1.50, totalPrice: 150.00 
  },
  { 
    id: 'f4', invoiceNumber: '002010', supplier: 'Uniformix Confecções', date: '2025-03-05', 
    itemId: '5', itemName: 'Camisa Uniforme G', quantity: 30, unitPrice: 45.00, totalPrice: 1350.00 
  },
];

const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // App State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [history, setHistory] = useState<StockMovement[]>([]);
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>(INITIAL_FINANCIAL);

  // Estado para Configurações do Sistema (Usuário e Local)
  const [config, setConfig] = useState({
    userName: '',
    unitName: '',
    city: ''
  });
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  // Estado temporário para o formulário de configuração
  const [tempConfig, setTempConfig] = useState(config);

  const handleLogin = (userData: { name: string; unit: string; city: string }) => {
    setConfig({
      userName: userData.name,
      unitName: userData.unit,
      city: userData.city
    });
    setTempConfig({
      userName: userData.name,
      unitName: userData.unit,
      city: userData.city
    });
    setIsAuthenticated(true);
  };

  const handleLogoutRequest = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsAuthenticated(false);
    setConfig({ userName: '', unitName: '', city: '' });
    setIsLogoutModalOpen(false);
  };

  const handleUpdateStock = (itemId: string, newQuantity: number, movement: StockMovement) => {
    // Atualiza o estoque
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity, lastUpdated: new Date().toISOString() };
      }
      return item;
    }));

    // Registra no histórico com o nome do usuário atual se não for especificado
    const movementWithUser = {
      ...movement,
      // Se for entrada (IN), quem registrou foi o usuário do sistema. Se for saída (OUT), mantém o employeeName do form.
      employeeName: movement.type === 'IN' ? config.userName : movement.employeeName 
    };

    setHistory(prev => [movementWithUser, ...prev]);
  };

  const handleAddProduct = (newItem: InventoryItem) => {
    setInventory(prev => [...prev, newItem]);
  };

  const handleUpdateProduct = (updatedItem: InventoryItem) => {
    setInventory(prev => prev.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    }));
  };

  const handleZeroStock = (itemId: string) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: 0, lastUpdated: new Date().toISOString() };
      }
      return item;
    }));
  };

  const handleRegisterInvoice = (record: FinancialRecord) => {
    // 1. Salvar Registro Financeiro
    setFinancialRecords(prev => [...prev, record]);

    // 2. Atualizar Estoque (Entrada)
    const item = inventory.find(i => i.id === record.itemId);
    if (item) {
        const newQty = item.quantity + record.quantity;
        
        // Criar movimento de entrada automaticamente
        const movement: StockMovement = {
            id: crypto.randomUUID(),
            itemId: item.id,
            itemName: item.name,
            type: 'IN',
            quantity: record.quantity,
            date: new Date().toISOString(),
            employeeName: `NF ${record.invoiceNumber} - ${record.supplier}`
        };

        handleUpdateStock(item.id, newQty, movement);
    }
  };

  const handleClearFinancialRecords = () => {
    setFinancialRecords([]);
  };

  const handleDeleteFinancialRecord = (id: string) => {
    // A confirmação visual é feita no componente FinancialDashboard
    setFinancialRecords(prev => prev.filter(record => record.id !== id));
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(tempConfig);
    setIsConfigOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard items={inventory} />;
      case 'inventory':
        return <InventoryList items={inventory} onAddProduct={handleAddProduct} onZeroStock={handleZeroStock} onUpdateProduct={handleUpdateProduct} />;
      case 'operations':
        return <StockOperations items={inventory} history={history} onUpdateStock={handleUpdateStock} />;
      case 'financial':
        return <FinancialDashboard 
          items={inventory} 
          financialRecords={financialRecords} 
          onRegisterInvoice={handleRegisterInvoice}
          onClearAllRecords={handleClearFinancialRecords}
          onDeleteRecord={handleDeleteFinancialRecord}
        />;
      case 'ai-assistant':
        return <AIAssistant />;
      default:
        return <Dashboard items={inventory} />;
    }
  };

  // --- RENDERIZAR TELA DE LOGIN SE NÃO ESTIVER AUTENTICADO ---
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden relative font-sans">
      
      {/* --- BACKGROUND IMAGE WITH OVERLAY --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        {/* Dark Overlay for readability and professional look */}
        <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[2px]"></div>
      </div>

      {/* Sidebar - Z-Index alto para ficar sobre o fundo */}
      <div className="relative z-20 h-full shadow-2xl border-r border-white/10">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 bg-transparent">
        {/* TOP HEADER - Contexto do Usuário e Local */}
        <header className="bg-white/90 backdrop-blur-md border-b border-white/50 h-20 flex items-center justify-between px-8 shadow-sm z-10 no-print flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Building2 size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg leading-tight tracking-tight">{config.unitName}</h2>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <MapPin size={12} className="text-blue-600" />
                {config.city || 'Localização Padrão'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-700">Olá, {config.userName}</p>
              <p className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-slate-200">Administrador</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-slate-600 border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                <User size={20} />
              </div>
              <button 
                onClick={() => {
                  setTempConfig(config);
                  setIsConfigOpen(true);
                }}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Configurações de Local"
              >
                <Settings size={20} />
              </button>
              <button 
                onClick={handleLogoutRequest}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Sair do Sistema"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 no-print scroll-smooth">
          {renderContent()}
        </main>
      </div>

      {/* MODAL DE CONFIGURAÇÃO */}
      {isConfigOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden ring-1 ring-white/50">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Settings size={18} className="text-blue-600" />
                Configurar Unidade
              </h3>
              <button onClick={() => setIsConfigOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveConfig} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nome da Unidade / Fábrica / Fazenda</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 transition-shadow shadow-sm"
                  value={tempConfig.unitName}
                  onChange={(e) => setTempConfig({...tempConfig, unitName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Cidade / Localização</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 transition-shadow shadow-sm"
                  value={tempConfig.city}
                  onChange={(e) => setTempConfig({...tempConfig, city: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Seu Nome (Usuário)</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 transition-shadow shadow-sm"
                  value={tempConfig.userName}
                  onChange={(e) => setTempConfig({...tempConfig, userName: e.target.value})}
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsConfigOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <Save size={18} />
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE LOGOUT */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={32} className="text-red-600 ml-1" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Sair do Sistema?
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Você será desconectado e retornará à tela de login.
              </p>
              
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={confirmLogout}
                  className="px-5 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 shadow-lg shadow-red-500/30 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;