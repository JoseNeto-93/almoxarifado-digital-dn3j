import React, { useState } from 'react';
import { Box, User, Building2, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (userData: { name: string; unit: string; city: string }) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    unit: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name.trim() && formData.unit.trim()) {
      onLogin({
        name: formData.name,
        unit: formData.unit,
        city: 'Localização Padrão' // Valor padrão já que o campo foi removido para simplificação
      });
    } else {
      alert("Por favor, preencha seu nome e a unidade.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-4xl h-auto md:min-h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-500 m-4">
        
        {/* Left Side - Brand Area */}
        <div className="w-full md:w-1/2 bg-[#0B1121] text-white p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-[-50%] left-[-50%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/50">
                <Box size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Almoxarifado Digital</h1>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed">
              Gestão completa de estoque, controle financeiro e organização logística em uma única plataforma inteligente.
            </p>
          </div>

          <div className="relative z-10 mt-8 md:mt-0">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Sistema Online</span>
              <span>Desenvolvido por dn3j</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form Area */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Acessar Sistema
            </h2>
            <p className="text-slate-500">
              Identifique-se para acessar o painel de controle.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              {/* Nome */}
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Seu Nome Completo"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-800"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Unidade */}
              <div className="relative group">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Nome da Unidade / Fábrica"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-800"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mt-6"
            >
              Entrar
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};