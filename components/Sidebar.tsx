import React from 'react';
import { LayoutDashboard, Package, ArrowRightLeft, Bot, Box, Banknote } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'inventory', label: 'Estoque', icon: Package },
    { id: 'operations', label: 'Entrada/Saída & Recibos', icon: ArrowRightLeft },
    { id: 'financial', label: 'Financeiro & NFs', icon: Banknote },
    { id: 'ai-assistant', label: 'IA Specialist', icon: Bot },
  ];

  return (
    <aside className="w-64 bg-[#0B1121] text-white flex flex-col h-full no-print border-r border-white/5 shadow-2xl relative z-20 font-sans">
      {/* Header / Logo Area */}
      <div className="p-6 pt-8 pb-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Box strokeWidth={1.5} size={32} className="text-blue-500" />
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full"></div>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white leading-none">Almoxarifado Digital</h1>
            <span className="text-xs text-slate-400 font-medium block mt-1">Sistema Integrado</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2 : 1.5}
                className={`transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} 
              />
              <span className="tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 mt-auto">
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-[11px] text-slate-500 font-medium tracking-wider opacity-60 hover:opacity-100 transition-opacity">
            Desenvolvido por dn3j
          </p>
        </div>
      </div>
    </aside>
  );
};