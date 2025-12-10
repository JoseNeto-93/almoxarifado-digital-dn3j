import React, { useState } from 'react';
import { TrainingModule } from '../types';
import { 
  FileText, ArrowLeft, ArrowRight, Clock, Download, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Search, Trash2, Box, ClipboardCheck, LayoutGrid, 
  FileSpreadsheet, FileType, MousePointerClick, ShieldCheck, CheckCircle2,
  ListTodo, Layers, ArrowDownUp, Target, Eye, RefreshCw, Users, BarChart3,
  Lightbulb, Settings, Play, Trophy, AlertTriangle, Table, Calculator, Calendar,
  Palette, Grid, Filter, PieChart, Save, CornerUpLeft, Scissors, AlertCircle
} from 'lucide-react';

// Dados definidos para os cursos
const MODULES: TrainingModule[] = [
  {
    id: '5s',
    title: 'Ebook 5S: Guia Completo',
    description: 'Descubra como a metodologia japonesa 5S pode revolucionar sua organização, aumentar a produtividade e criar um ambiente mais eficiente.',
    category: 'organization',
    duration: '10 Páginas',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'almox',
    title: 'Organização de Almoxarifado',
    description: 'Técnicas de layout, endereçamento logístico, curva ABC e fluxo de recebimento para otimizar o espaço e o tempo.',
    category: 'organization',
    duration: '6 Páginas',
    imageUrl: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'excel',
    title: 'Noções Básicas de Excel',
    description: 'Guia prático para iniciantes: domine células, fórmulas, formatação e gráficos na ferramenta mais utilizada do mundo corporativo.',
    category: 'office',
    duration: '10 Páginas',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713df548e9cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const Training: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  const activeModule = MODULES.find(m => m.id === selectedModuleId);
  
  // Dynamic page count based on module
  const getTotalPages = (id: string) => {
    if (id === '5s') return 10;
    if (id === 'excel') return 10;
    return 6;
  };

  const totalPages = activeModule ? getTotalPages(activeModule.id) : 1;

  const handleOpenModule = (id: string) => {
    setSelectedModuleId(id);
    setCurrentPage(1);
  };

  const handleBack = () => {
    setSelectedModuleId(null);
    setCurrentPage(1);
  };

  const nextPage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const prevPage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("PDF baixado com sucesso!");
    }, 1500);
  };

  // Renderização do Conteúdo Específico por Curso e Página
  const renderSlideContent = () => {
    if (!activeModule) return null;

    // --- CURSO 1: EBOOK 5S (Novo Conteúdo) ---
    if (activeModule.id === '5s') {
      const darkThemeClass = "h-full bg-[#050A18] text-slate-200 p-8 md:p-12 flex flex-col overflow-y-auto";
      
      switch (currentPage) {
        case 1: // Capa
          return (
            <div className={`${darkThemeClass} items-center justify-center text-center relative overflow-hidden`}>
              {/* Background decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                 <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-600 rounded-full blur-3xl"></div>
              </div>

              <div className="z-10 max-w-2xl space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
                  Metodologia Lean
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Ebook 5S: Guia Completo para Organizar e Transformar Seu Ambiente de Trabalho
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Descubra como a metodologia japonesa 5S pode revolucionar sua organização, aumentar a produtividade e criar um ambiente de trabalho mais eficiente e motivador.
                </p>
                <div className="pt-8 flex justify-center">
                   <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded"></div>
                </div>
              </div>
            </div>
          );

        case 2: // Introdução
          return (
            <div className={darkThemeClass}>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-600 pl-4">Introdução à Metodologia 5S</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                <div className="space-y-6 text-sm md:text-base leading-relaxed">
                  <p>
                    A metodologia 5S nasceu no Japão durante a década de 1950, como parte fundamental do revolucionário 
                    <span className="text-blue-400 font-bold"> Sistema Toyota de Produção</span>.
                  </p>
                  <p>
                    Os <strong className="text-white">cinco pilares</strong> representam palavras japonesas que começam com a letra S:
                  </p>
                  <ul className="space-y-3 pl-2">
                    <li className="flex items-center gap-2"><span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs font-bold">Seiri</span> Separar</li>
                    <li className="flex items-center gap-2"><span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs font-bold">Seiton</span> Organizar</li>
                    <li className="flex items-center gap-2"><span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs font-bold">Seiso</span> Limpar</li>
                    <li className="flex items-center gap-2"><span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs font-bold">Seiketsu</span> Padronizar</li>
                    <li className="flex items-center gap-2"><span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs font-bold">Shitsuke</span> Sustentar</li>
                  </ul>
                  <p className="text-slate-400 text-sm pt-4 border-t border-slate-800">
                    Hoje, o 5S serve como alicerce do Lean Manufacturing e da cultura de melhoria contínua.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-1 shadow-2xl border border-slate-700/50">
                   <img 
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Fábrica Organizada" 
                    className="w-full h-64 object-cover rounded-lg opacity-80"
                   />
                </div>
              </div>
            </div>
          );

        case 3: // 1º S - Seiri
          return (
            <div className={darkThemeClass}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">1º S - Seiri (Separar)</h2>
                <h3 className="text-xl text-blue-400">Eliminar o Desnecessário</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
                  <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                    <Search size={20} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Identificar</h4>
                  <p className="text-sm text-slate-400">Analise todos os itens do seu ambiente e classifique-os por utilidade e frequência de uso.</p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
                  <div className="w-10 h-10 bg-red-900/30 rounded-lg flex items-center justify-center mb-4 text-red-400">
                    <Trash2 size={20} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Remover</h4>
                  <p className="text-sm text-slate-400">Descarte documentos obsoletos, ferramentas quebradas e materiais que não agregam valor.</p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
                  <div className="w-10 h-10 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
                    <Target size={20} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Focar</h4>
                  <p className="text-sm text-slate-400">Mantenha apenas o essencial para maximizar o espaço disponível e aumentar a eficiência.</p>
                </div>
              </div>

              <div className="mt-auto bg-slate-800/30 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-sm italic">
                  <strong className="text-blue-400 not-italic">Ferramentas práticas:</strong> Utilize checklists de avaliação e "etiquetas vermelhas" para identificar itens obsoletos e áreas de triagem.
                </p>
              </div>
            </div>
          );

        case 4: // 2º S - Seiton
          return (
            <div className={darkThemeClass}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">2º S - Seiton (Organizar)</h2>
                <h3 className="text-xl text-blue-400">Colocar Cada Coisa em Seu Lugar</h3>
              </div>

              <p className="text-slate-300 mb-8 max-w-3xl">
                Após eliminar o desnecessário, é hora de organizar estrategicamente. Itens de uso frequente devem estar ao alcance imediato.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                   <div className="h-1 w-12 bg-indigo-500 mb-2"></div>
                   <h4 className="text-lg font-bold text-white">Sistema Visual</h4>
                   <p className="text-sm text-slate-400">Implemente etiquetas, códigos de cores e mapas de localização para identificar rapidamente onde cada item está.</p>
                </div>
                <div className="space-y-2">
                   <div className="h-1 w-12 bg-pink-500 mb-2"></div>
                   <h4 className="text-lg font-bold text-white">Critérios Inteligentes</h4>
                   <p className="text-sm text-slate-400">Organize considerando frequência de uso, peso, tamanho e acessibilidade para otimizar o fluxo.</p>
                </div>
                <div className="space-y-2">
                   <div className="h-1 w-12 bg-cyan-500 mb-2"></div>
                   <h4 className="text-lg font-bold text-white">Redução de Tempo</h4>
                   <p className="text-sm text-slate-400">Elimine o tempo desperdiçado procurando ferramentas. Estudos mostram redução de até 50% no tempo de busca.</p>
                </div>
              </div>
            </div>
          );

        case 5: // 3º S - Seiso
          return (
            <div className={darkThemeClass}>
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">3º S - Seiso (Limpar)</h2>
                  <h3 className="text-xl text-blue-400 mb-6">Manter o Ambiente Impecável</h3>
                  
                  <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/20 mb-6">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                      <Eye size={18} />
                      Limpeza é Inspeção
                    </h4>
                    <p className="text-sm text-slate-300">
                      O terceiro S vai além da limpeza superficial. É um processo de inspeção para detectar falhas precocemente e prevenir acidentes.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                     <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover opacity-60" alt="Limpeza Industrial" />
                     <span className="absolute bottom-4 left-4 text-white font-bold z-20">Inspeção Diária</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="border border-slate-700 p-4 rounded bg-slate-800/30">
                    <strong className="text-white block mb-1">Responsabilidade</strong>
                    <span className="text-xs text-slate-400">Envolver toda a equipe cria senso de propriedade.</span>
                 </div>
                 <div className="border border-slate-700 p-4 rounded bg-slate-800/30">
                    <strong className="text-white block mb-1">Rotinas</strong>
                    <span className="text-xs text-slate-400">Defina horários: Diário (área), Semanal (equipamentos).</span>
                 </div>
                 <div className="border border-slate-700 p-4 rounded bg-slate-800/30">
                    <strong className="text-white block mb-1">Prevenção</strong>
                    <span className="text-xs text-slate-400">Revela vazamentos e desgastes antes que quebrem.</span>
                 </div>
              </div>
            </div>
          );

        case 6: // 4º S - Seiketsu
          return (
            <div className={darkThemeClass}>
               <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">4º S - Seiketsu (Padronizar)</h2>
                <h3 className="text-xl text-blue-400">Criar Rotinas e Normas</h3>
              </div>
              
              <p className="text-slate-300 mb-8">
                Garante a sustentabilidade das melhorias. Padronizar significa estabelecer normas claras que todos possam seguir.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div>
                   <span className="text-4xl font-black text-slate-700 block mb-2">01</span>
                   <h4 className="text-lg font-bold text-white mb-1">Documentar Padrões</h4>
                   <p className="text-sm text-slate-400">Crie procedimentos operacionais (POPs), instruções visuais e checklists.</p>
                </div>
                <div>
                   <span className="text-4xl font-black text-slate-700 block mb-2">02</span>
                   <h4 className="text-lg font-bold text-white mb-1">Ferramentas Visuais</h4>
                   <p className="text-sm text-slate-400">Quadros de controle, sinalizações de piso e fotos do "estado ideal".</p>
                </div>
                <div>
                   <span className="text-4xl font-black text-slate-700 block mb-2">03</span>
                   <h4 className="text-lg font-bold text-white mb-1">Treinamento Facilitado</h4>
                   <p className="text-sm text-slate-400">Padrões claros simplificam o treinamento de novos colaboradores.</p>
                </div>
                <div>
                   <span className="text-4xl font-black text-slate-700 block mb-2">04</span>
                   <h4 className="text-lg font-bold text-white mb-1">Manutenção Contínua</h4>
                   <p className="text-sm text-slate-400">Auditorias diárias para verificar o cumprimento.</p>
                </div>
              </div>
              
              <div className="mt-auto pt-8 text-center">
                 <p className="text-lg font-serif italic text-blue-200">"A padronização transforma boas práticas individuais em conhecimento organizacional permanente."</p>
              </div>
            </div>
          );

        case 7: // 5º S - Shitsuke
          return (
             <div className={darkThemeClass}>
               <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">5º S - Shitsuke (Sustentar)</h2>
                <h3 className="text-xl text-blue-400">Disciplina e Melhoria Contínua</h3>
              </div>

              <div className="flex flex-col md:flex-row gap-10 items-center">
                 <div className="flex-1 space-y-6">
                    <p className="text-slate-300">
                      O passo mais desafiador: transformar o 5S em cultura. Significa desenvolver os hábitos para manter o sistema vivo.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-800 p-4 rounded border-t-2 border-blue-500">
                          <h5 className="font-bold text-white">Treinamento</h5>
                          <p className="text-xs text-slate-400 mt-1">Capacitação contínua da equipe.</p>
                       </div>
                       <div className="bg-slate-800 p-4 rounded border-t-2 border-purple-500">
                          <h5 className="font-bold text-white">Auditoria</h5>
                          <p className="text-xs text-slate-400 mt-1">Inspeções regulares de conformidade.</p>
                       </div>
                       <div className="bg-slate-800 p-4 rounded border-t-2 border-green-500">
                          <h5 className="font-bold text-white">Melhoria</h5>
                          <p className="text-xs text-slate-400 mt-1">Evolução constante do sistema.</p>
                       </div>
                       <div className="bg-slate-800 p-4 rounded border-t-2 border-amber-500">
                          <h5 className="font-bold text-white">Feedback</h5>
                          <p className="text-xs text-slate-400 mt-1">Comunicação aberta sobre resultados.</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative w-48 h-48">
                       <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <RefreshCw size={48} className="text-blue-500 animate-spin-slow" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-8 bg-blue-900/30 border border-blue-700/50 p-4 rounded-lg flex gap-4 items-start">
                 <Lightbulb className="text-yellow-400 shrink-0 mt-1" />
                 <div>
                    <h5 className="font-bold text-white text-sm">Exemplo Prático</h5>
                    <p className="text-xs text-slate-300 mt-1">Equipes de alta performance realizam auditorias semanais de 15 minutos e celebram conquistas para manter o engajamento alto.</p>
                 </div>
              </div>
            </div>
          );

        case 8: // Benefícios
          return (
             <div className={darkThemeClass}>
               <h2 className="text-2xl font-bold text-white mb-10 text-center">Benefícios Comprovados</h2>

               <div className="grid grid-cols-2 gap-8 h-full content-center">
                  <div className="text-center p-6 border border-slate-800 bg-slate-800/30 rounded-2xl">
                     <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">30%</div>
                     <h4 className="font-bold text-white mb-2">Redução de Busca</h4>
                     <p className="text-xs text-slate-400">Menos tempo procurando, mais tempo produzindo.</p>
                  </div>
                  <div className="text-center p-6 border border-slate-800 bg-slate-800/30 rounded-2xl">
                     <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2">40%</div>
                     <h4 className="font-bold text-white mb-2">Menos Acidentes</h4>
                     <p className="text-xs text-slate-400">Ambientes organizados reduzem riscos.</p>
                  </div>
                  <div className="text-center p-6 border border-slate-800 bg-slate-800/30 rounded-2xl">
                     <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">25%</div>
                     <h4 className="font-bold text-white mb-2">+ Produtividade</h4>
                     <p className="text-xs text-slate-400">Processos otimizados geram ganhos consistentes.</p>
                  </div>
                  <div className="text-center p-6 border border-slate-800 bg-slate-800/30 rounded-2xl">
                     <div className="text-4xl md:text-5xl font-bold text-purple-500 mb-2">50%</div>
                     <h4 className="font-bold text-white mb-2">Engajamento</h4>
                     <p className="text-xs text-slate-400">Colaboradores mais motivados.</p>
                  </div>
               </div>
            </div>
          );

        case 9: // Implementação
          return (
             <div className={darkThemeClass}>
               <h2 className="text-2xl font-bold text-white mb-6">Como Implementar</h2>
               
               <div className="space-y-4 mb-8">
                  <div className="flex gap-4 items-start">
                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-sm">1</div>
                     <div>
                        <h4 className="text-white font-bold text-sm">Formar Comitê 5S</h4>
                        <p className="text-xs text-slate-400">Líderes de diferentes áreas.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start">
                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-sm">2</div>
                     <div>
                        <h4 className="text-white font-bold text-sm">Diagnóstico Inicial</h4>
                        <p className="text-xs text-slate-400">Fotos e identificação de problemas.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start">
                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-sm">3</div>
                     <div>
                        <h4 className="text-white font-bold text-sm">Planejamento e Treinamento</h4>
                        <p className="text-xs text-slate-400">Workshops e "Dia D" de limpeza.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start">
                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-sm">4</div>
                     <div>
                        <h4 className="text-white font-bold text-sm">Monitoramento</h4>
                        <p className="text-xs text-slate-400">Auditorias regulares.</p>
                     </div>
                  </div>
               </div>

               <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                     <AlertTriangle size={16} className="text-amber-500" />
                     Superando Resistências
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                     <li>Demonstre benefícios com projetos piloto.</li>
                     <li>Envolva a liderança como exemplo.</li>
                     <li>Seja paciente - mudança cultural leva tempo.</li>
                  </ul>
               </div>
            </div>
          );

        case 10: // Conclusão
          return (
             <div className={`${darkThemeClass} items-center justify-center`}>
               <div className="max-w-2xl text-center space-y-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                     <Trophy size={40} className="text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white">Excelência Operacional</h2>
                  <p className="text-slate-400 text-lg">
                     A jornada começa com um único passo. O 5S não é apenas organização, é a fundação para a disciplina e a evolução constante.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                     <div className="bg-slate-800 p-4 rounded border border-slate-700">
                        <Play size={20} className="text-green-400 mb-2" />
                        <h5 className="text-white font-bold text-sm">Comece Hoje</h5>
                        <p className="text-xs text-slate-400">Escolha uma pequena área.</p>
                     </div>
                     <div className="bg-slate-800 p-4 rounded border border-slate-700">
                        <Users size={20} className="text-blue-400 mb-2" />
                        <h5 className="text-white font-bold text-sm">Cultive a Cultura</h5>
                        <p className="text-xs text-slate-400">Liderança pelo exemplo.</p>
                     </div>
                     <div className="bg-slate-800 p-4 rounded border border-slate-700">
                        <BarChart3 size={20} className="text-purple-400 mb-2" />
                        <h5 className="text-white font-bold text-sm">Meça e Celebre</h5>
                        <p className="text-xs text-slate-400">Acompanhe o progresso.</p>
                     </div>
                  </div>

                  <div className="pt-8">
                     <button onClick={handleBack} className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-lg">
                        Finalizar Curso
                     </button>
                  </div>
               </div>
            </div>
          );
      }
    }

    // --- CURSO 2: ORGANIZAÇÃO DE ALMOXARIFADO ---
    if (activeModule.id === 'almox') {
      switch (currentPage) {
        case 1:
          return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Layers size={48} className="text-amber-600" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900">{activeModule.title}</h1>
              <p className="text-xl text-slate-500 max-w-lg">Eficiência logística começa na organização física do espaço.</p>
              <div className="mt-8 border-t border-slate-200 pt-4 w-1/2">
                <p className="text-sm font-semibold text-slate-400 uppercase">Módulo 02 - Logística Interna</p>
              </div>
            </div>
          );
        case 2: // Layout
          return (
            <div className="h-full p-8 flex flex-col animate-in slide-in-from-right">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Layout e Fluxo</h2>
              <div className="flex-1 flex flex-col gap-6">
                <p className="text-slate-700">O desenho do almoxarifado deve evitar cruzamentos e reduzir distâncias.</p>
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-6 relative">
                  {/* Diagrama Simulado */}
                  <div className="absolute top-4 left-4 bg-green-200 px-3 py-1 rounded text-xs font-bold text-green-800">RECEBIMENTO</div>
                  <div className="absolute bottom-4 right-4 bg-blue-200 px-3 py-1 rounded text-xs font-bold text-blue-800">EXPEDIÇÃO</div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20 border-2 border-dashed border-slate-400 flex items-center justify-center text-xs text-slate-500 text-center rounded">
                    ESTOQUE<br/>(Prateleiras)
                  </div>
                  <ArrowRight className="absolute top-1/2 left-20 text-slate-400" />
                  <ArrowRight className="absolute top-1/2 right-20 text-slate-400" />
                </div>
                <p className="text-sm text-center text-slate-500 italic">Fluxo em "U" ou Linear são os mais comuns.</p>
              </div>
            </div>
          );
        case 3: // Endereçamento
          return (
            <div className="h-full p-8 flex flex-col animate-in slide-in-from-right">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Endereçamento Logístico</h2>
              <div className="space-y-6">
                <p className="text-slate-700">Como encontrar qualquer item em 30 segundos? Usando coordenadas.</p>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                  <h3 className="text-4xl font-mono font-bold text-slate-800 mb-2 tracking-widest">R1-P3-N2</h3>
                  <div className="flex justify-center gap-8 text-sm text-slate-500 mt-4">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-amber-600">R1</span>
                      <span>Rua 01</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-amber-600">P3</span>
                      <span>Prateleira 3</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-amber-600">N2</span>
                      <span>Nível 2</span>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded text-sm text-amber-900">
                  <strong>Dica:</strong> Sempre etiquete de baixo para cima e da esquerda para a direita.
                </div>
              </div>
            </div>
          );
        case 4: // Curva ABC
          return (
            <div className="h-full p-8 flex flex-col animate-in slide-in-from-right">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Curva ABC</h2>
              <div className="flex-1 flex flex-col gap-4">
                <p className="text-slate-700">Classifique os itens por importância e valor para definir onde guardá-los.</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center font-bold text-red-700 text-xl">A</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">Alta Prioridade (20% dos itens)</h4>
                      <p className="text-xs text-slate-500">Maior valor/giro. Devem ficar nos locais de mais fácil acesso.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded flex items-center justify-center font-bold text-yellow-700 text-xl">B</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">Média Prioridade (30% dos itens)</h4>
                      <p className="text-xs text-slate-500">Valor/giro intermediário. Acesso regular.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center font-bold text-green-700 text-xl">C</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">Baixa Prioridade (50% dos itens)</h4>
                      <p className="text-xs text-slate-500">Menor valor/giro. Podem ficar em locais mais altos ou distantes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case 5: // Recebimento
          return (
            <div className="h-full p-8 flex flex-col animate-in slide-in-from-right">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Recebimento e Conferência</h2>
              <div className="space-y-4">
                <p className="text-slate-700 mb-4">A conferência é a "portaria" do estoque. Erros aqui contaminam todo o sistema.</p>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 p-3 border-b border-slate-200 font-bold text-slate-600 text-sm">CHECKLIST DE RECEBIMENTO</div>
                  <div className="p-4 space-y-3">
                     <div className="flex items-center gap-3">
                       <input type="checkbox" checked readOnly className="accent-green-600" />
                       <span className="text-slate-700">Conferir Nota Fiscal x Pedido de Compra</span>
                     </div>
                     <div className="flex items-center gap-3">
                       <input type="checkbox" checked readOnly className="accent-green-600" />
                       <span className="text-slate-700">Verificar integridade da embalagem</span>
                     </div>
                     <div className="flex items-center gap-3">
                       <input type="checkbox" checked readOnly className="accent-green-600" />
                       <span className="text-slate-700">Contagem física (Cega)</span>
                     </div>
                     <div className="flex items-center gap-3">
                       <input type="checkbox" checked readOnly className="accent-green-600" />
                       <span className="text-slate-700">Etiquetagem imediata</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case 6: // Conclusão Almox
          return (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in slide-in-from-right bg-gradient-to-br from-white to-amber-50">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Módulo Concluído!</h2>
              <p className="text-slate-600 mb-8 max-w-md text-lg">
                Seu almoxarifado agora tem um plano de organização lógica. Revise o layout e o endereçamento dos itens.
              </p>
              <button onClick={handleBack} className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors shadow-lg">
                Voltar ao Menu
              </button>
            </div>
          );
      }
    }

    // --- CURSO 3: NOÇÕES BÁSICAS DE EXCEL ---
    if (activeModule.id === 'excel') {
      const excelThemeClass = "h-full bg-slate-50 text-slate-800 p-8 md:p-12 flex flex-col overflow-y-auto";
      
      switch (currentPage) {
        case 1: // Capa
          return (
            <div className="h-full bg-gradient-to-br from-emerald-50 to-white flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
               {/* Decorative Shapes */}
               <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-100 rounded-full opacity-50 blur-3xl"></div>
               <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-green-200 rounded-full opacity-40 blur-3xl"></div>
               
               <div className="z-10 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm rotate-3">
                    <FileSpreadsheet size={48} className="text-emerald-600" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                    Noções Básicas de Excel:<br/>
                    <span className="text-emerald-600">Guia Prático para Iniciantes</span>
                  </h1>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Domine o Microsoft Excel e transforme sua carreira! Um guia completo desenvolvido para quem deseja aprender as funcionalidades essenciais da ferramenta mais utilizada no mundo corporativo.
                  </p>
               </div>
            </div>
          );

        case 2: // Introdução
          return (
            <div className={excelThemeClass}>
              <h2 className="text-3xl font-bold text-emerald-800 mb-8 flex items-center gap-3">
                <Box className="text-emerald-600" /> Introdução ao Excel
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                 <div className="flex-1 space-y-6">
                    <p className="text-slate-700 leading-relaxed">
                      O Microsoft Excel é a ferramenta de planilhas eletrônicas mais utilizada globalmente. Uma planilha organiza dados em tabelas, permitindo realizar cálculos, criar gráficos e analisar informações.
                    </p>
                    
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                       <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Elementos Fundamentais</h3>
                       <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-sm text-slate-600">
                             <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">A1</div>
                             <strong>Células:</strong> Espaços individuais onde inserimos dados.
                          </li>
                          <li className="flex items-center gap-3 text-sm text-slate-600">
                             <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center font-bold text-blue-700">1</div>
                             <strong>Linhas:</strong> Organizadas horizontalmente por números.
                          </li>
                          <li className="flex items-center gap-3 text-sm text-slate-600">
                             <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center font-bold text-orange-700">A</div>
                             <strong>Colunas:</strong> Organizadas verticalmente por letras.
                          </li>
                       </ul>
                    </div>
                 </div>
                 
                 <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg border border-slate-200 p-2">
                    {/* Mock Excel Interface */}
                    <div className="bg-emerald-600 h-8 rounded-t flex items-center px-4 text-xs text-white gap-4">
                       <span>Arquivo</span><span>Página Inicial</span><span>Inserir</span>
                    </div>
                    <div className="p-4 grid grid-cols-4 gap-1 bg-slate-50 h-64 overflow-hidden text-xs text-center text-slate-400">
                       {[...Array(20)].map((_,i) => (
                          <div key={i} className="border border-slate-200 bg-white p-2">Cel</div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          );

        case 3: // Navegação
          return (
             <div className={excelThemeClass}>
               <div className="mb-8">
                  <h2 className="text-3xl font-bold text-emerald-800 mb-2">Navegando e Inserindo Dados</h2>
                  <p className="text-slate-600">Primeiro passo para trabalhar com eficiência.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
                     <FileText className="text-blue-500 mb-4 h-8 w-8" />
                     <h3 className="font-bold text-slate-800 mb-2">Textos</h3>
                     <p className="text-sm text-slate-500">Rótulos, nomes e descrições. Alinham-se à esquerda por padrão.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-emerald-500">
                     <Calculator className="text-emerald-500 mb-4 h-8 w-8" />
                     <h3 className="font-bold text-slate-800 mb-2">Números</h3>
                     <p className="text-sm text-slate-500">Valores para cálculo. Alinham-se à direita por padrão.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-purple-500">
                     <Calendar className="text-purple-500 mb-4 h-8 w-8" />
                     <h3 className="font-bold text-slate-800 mb-2">Datas</h3>
                     <p className="text-sm text-slate-500">Para cronogramas e prazos. O Excel as trata como números.</p>
                  </div>
               </div>

               <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4">
                  <MousePointerClick className="text-blue-600 mt-1 shrink-0" />
                  <div>
                     <h4 className="font-bold text-blue-800">Dica de Ouro: Preenchimento Automático</h4>
                     <p className="text-sm text-blue-700 mt-1">
                        Digite os primeiros valores de uma sequência (ex: Jan, Fev), selecione e arraste o "quadradinho" no canto inferior da célula. O Excel completa o resto para você!
                     </p>
                  </div>
               </div>
             </div>
          );

        case 4: // Formatação
          return (
             <div className={excelThemeClass}>
               <h2 className="text-3xl font-bold text-emerald-800 mb-6">Formatação Básica</h2>
               
               <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex-1 space-y-4">
                     <p className="text-slate-700">Uma planilha bem formatada comunica clareza e profissionalismo.</p>
                     
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white rounded shadow-sm">
                           <Palette className="text-purple-500" />
                           <span className="text-slate-700"><strong>Cores:</strong> Destaque cabeçalhos e totais.</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded shadow-sm">
                           <Grid className="text-slate-500" />
                           <span className="text-slate-700"><strong>Bordas:</strong> Separe visualmente áreas diferentes.</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded shadow-sm">
                           <ArrowDownUp className="text-blue-500" />
                           <span className="text-slate-700"><strong>Alinhamento:</strong> Centralize títulos para melhor leitura.</span>
                        </div>
                     </div>

                     <div className="mt-6 p-4 bg-emerald-100 rounded-lg text-emerald-800 text-sm">
                        <strong>Formatação Condicional:</strong> Um recurso poderoso que muda a cor da célula automaticamente baseada no valor (ex: vermelho se negativo).
                     </div>
                  </div>

                  <div className="flex-1 bg-white p-6 rounded-xl shadow border border-slate-200">
                     <p className="text-xs font-bold text-slate-400 uppercase mb-4">Exemplo Visual</p>
                     
                     <div className="border border-slate-300 rounded overflow-hidden">
                        <div className="bg-slate-800 text-white p-2 font-bold text-center">Relatório Mensal</div>
                        <div className="grid grid-cols-3 text-sm">
                           <div className="bg-slate-100 p-2 font-semibold border-b border-r">Item</div>
                           <div className="bg-slate-100 p-2 font-semibold border-b border-r text-center">Meta</div>
                           <div className="bg-slate-100 p-2 font-semibold border-b text-center">Real</div>
                           
                           <div className="p-2 border-r border-b">Vendas A</div>
                           <div className="p-2 border-r border-b text-center">100</div>
                           <div className="p-2 border-b text-center bg-green-100 text-green-700 font-bold">120</div>

                           <div className="p-2 border-r">Vendas B</div>
                           <div className="p-2 border-r text-center">100</div>
                           <div className="p-2 text-center bg-red-100 text-red-700 font-bold">80</div>
                        </div>
                     </div>
                  </div>
               </div>
             </div>
          );

        case 5: // Fórmulas
          return (
             <div className={excelThemeClass}>
               <h2 className="text-3xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-600 px-2 rounded">fx</span> Fórmulas Essenciais
               </h2>
               
               <p className="text-slate-600 mb-6">Toda fórmula começa com o sinal de <strong>= (igual)</strong>.</p>

               <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start">
                        <div>
                           <h4 className="font-bold text-blue-700 font-mono text-lg mb-1">=SOMA(A1:A10)</h4>
                           <p className="text-sm text-slate-600">Adiciona todos os valores do intervalo selecionado.</p>
                        </div>
                        <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded">Matemática</span>
                     </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start">
                        <div>
                           <h4 className="font-bold text-purple-700 font-mono text-lg mb-1">=MÉDIA(B1:B10)</h4>
                           <p className="text-sm text-slate-600">Calcula a média aritmética dos valores.</p>
                        </div>
                        <span className="text-xs font-bold bg-purple-100 text-purple-600 px-2 py-1 rounded">Estatística</span>
                     </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500 hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start">
                        <div>
                           <h4 className="font-bold text-orange-700 font-mono text-lg mb-1">=SE(C1&gt;10; "OK"; "Repor")</h4>
                           <p className="text-sm text-slate-600">Toma decisões: Se C1 maior que 10, escreve "OK", senão "Repor".</p>
                        </div>
                        <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded">Lógica</span>
                     </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-slate-500 hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start">
                        <div>
                           <h4 className="font-bold text-slate-700 font-mono text-lg mb-1">=MÍNIMO() e =MÁXIMO()</h4>
                           <p className="text-sm text-slate-600">Encontra o menor e o maior valor em uma lista.</p>
                        </div>
                        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">Análise</span>
                     </div>
                  </div>
               </div>
             </div>
          );

        case 6: // Organização e Gráficos
          return (
             <div className={excelThemeClass}>
               <h2 className="text-2xl font-bold text-emerald-800 mb-6">Organização e Análise</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-emerald-50 p-4 rounded-lg text-center">
                     <ListTodo className="mx-auto text-emerald-600 mb-2" />
                     <h4 className="font-bold text-sm">Classificação</h4>
                     <p className="text-xs text-slate-500 mt-1">Ordene A-Z ou numérico para organizar listas.</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                     <Filter className="mx-auto text-blue-600 mb-2" />
                     <h4 className="font-bold text-sm">Filtros</h4>
                     <p className="text-xs text-slate-500 mt-1">Visualize apenas o que importa no momento.</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                     <Table className="mx-auto text-purple-600 mb-2" />
                     <h4 className="font-bold text-sm">Tabelas</h4>
                     <p className="text-xs text-slate-500 mt-1">Formatação e filtros automáticos (Ctrl + T).</p>
                  </div>
               </div>

               <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <PieChart size={20} /> Visualização com Gráficos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="border rounded p-3 bg-white">
                        <div className="h-24 flex items-end justify-center gap-2 px-4 pb-2 border-b border-l border-slate-300">
                           <div className="w-8 bg-blue-400 h-[60%]"></div>
                           <div className="w-8 bg-blue-400 h-[80%]"></div>
                           <div className="w-8 bg-blue-400 h-[40%]"></div>
                        </div>
                        <p className="text-center text-xs font-bold mt-2">Colunas</p>
                        <p className="text-center text-[10px] text-slate-500">Comparar Categorias</p>
                     </div>
                     <div className="border rounded p-3 bg-white flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-4 border-emerald-400 border-t-emerald-600 rotate-45"></div>
                        <p className="text-center text-xs font-bold mt-2">Pizza</p>
                        <p className="text-center text-[10px] text-slate-500">Proporções (Partes do todo)</p>
                     </div>
                  </div>
               </div>
             </div>
          );

        case 7: // Arquivos
          return (
             <div className={excelThemeClass}>
               <h2 className="text-3xl font-bold text-emerald-800 mb-6">Trabalhando com Arquivos</h2>
               
               <div className="flex gap-8">
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                     <h3 className="font-bold text-slate-700 mb-4">Operações Essenciais</h3>
                     <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                           <span className="bg-slate-100 p-2 rounded font-mono text-xs font-bold">Ctrl + N</span>
                           <span className="text-sm">Criar nova pasta de trabalho</span>
                        </li>
                        <li className="flex items-center gap-3">
                           <span className="bg-slate-100 p-2 rounded font-mono text-xs font-bold">Ctrl + S</span>
                           <span className="text-sm">Salvar alterações (Faça sempre!)</span>
                        </li>
                        <li className="flex items-center gap-3">
                           <span className="bg-slate-100 p-2 rounded font-mono text-xs font-bold">Ctrl + O</span>
                           <span className="text-sm">Abrir arquivo existente</span>
                        </li>
                     </ul>
                  </div>

                  <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                     <h3 className="font-bold text-slate-700 mb-4">Gerenciando Planilhas (Abas)</h3>
                     <div className="flex flex-col gap-2">
                        <div className="bg-slate-100 p-2 rounded border-b-4 border-emerald-500 w-32 text-center text-xs font-bold">Planilha 1</div>
                        <p className="text-xs text-slate-500 mt-1 mb-3">As abas ficam na parte inferior.</p>
                        
                        <div className="text-sm space-y-2">
                           <p>• <strong>Criar:</strong> Clique no ícone <strong>+</strong>.</p>
                           <p>• <strong>Renomear:</strong> Clique duplo na aba.</p>
                           <p>• <strong>Organizar:</strong> Arraste para reordenar.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-6 bg-amber-50 text-amber-800 p-4 rounded-lg flex items-center gap-3 text-sm">
                  <Save size={18} />
                  <span><strong>Segurança:</strong> Use o recurso de AutoRecuperação e faça backups em nuvem (OneDrive/Google Drive).</span>
               </div>
             </div>
          );

        case 8: // Produtividade
          return (
             <div className={excelThemeClass}>
               <h2 className="text-3xl font-bold text-emerald-800 mb-6">Recursos de Produtividade</h2>
               <p className="text-slate-600 mb-8">Trabalhe como um profissional eliminando tarefas repetitivas.</p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <h3 className="font-bold text-slate-800 mb-4">Atalhos Essenciais</h3>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded shadow-sm text-center">
                           <span className="block font-mono font-bold text-slate-700">Ctrl + C/V</span>
                           <span className="text-[10px] text-slate-400">Copiar / Colar</span>
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm text-center">
                           <span className="block font-mono font-bold text-slate-700">Ctrl + Z</span>
                           <span className="text-[10px] text-slate-400">Desfazer</span>
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm text-center">
                           <span className="block font-mono font-bold text-slate-700">F2</span>
                           <span className="text-[10px] text-slate-400">Editar Célula</span>
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm text-center">
                           <span className="block font-mono font-bold text-slate-700">Ctrl + Setas</span>
                           <span className="text-[10px] text-slate-400">Navegar Rápido</span>
                        </div>
                     </div>
                  </div>

                  <div>
                     <h3 className="font-bold text-slate-800 mb-4">Referências ($)</h3>
                     <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-sm space-y-3">
                        <p>Ao copiar fórmulas, as referências mudam. Para "trancar" uma célula, use o cifrão:</p>
                        <div className="font-mono bg-white p-1 rounded inline-block text-emerald-700 font-bold">$A$1</div>
                        <p className="text-xs text-slate-500">
                           Isso é chamado de <strong>Referência Absoluta</strong>. Use F4 para alternar rapidamente.
                        </p>
                     </div>
                  </div>
               </div>
             </div>
          );

        case 9: // Erros Comuns
          return (
             <div className={excelThemeClass}>
               <h2 className="text-3xl font-bold text-red-600 mb-6 flex items-center gap-2">
                  <AlertCircle /> Erros Comuns
               </h2>
               <p className="text-slate-600 mb-8">Reconhecer e corrigir erros economiza frustração.</p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-400">
                     <span className="font-mono font-bold text-red-600 text-lg">#DIV/0!</span>
                     <p className="font-bold text-slate-700 text-sm mt-1">Divisão por Zero</p>
                     <p className="text-xs text-slate-500 mt-1">Você tentou dividir um número por zero ou célula vazia.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-400">
                     <span className="font-mono font-bold text-red-600 text-lg">#VALOR!</span>
                     <p className="font-bold text-slate-700 text-sm mt-1">Tipo Incorreto</p>
                     <p className="text-xs text-slate-500 mt-1">Misturou texto com números em uma operação matemática.</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-400">
                     <span className="font-mono font-bold text-red-600 text-lg">#REF!</span>
                     <p className="font-bold text-slate-700 text-sm mt-1">Referência Inválida</p>
                     <p className="text-xs text-slate-500 mt-1">A célula que a fórmula buscava foi excluída.</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-400">
                     <span className="font-mono font-bold text-red-600 text-lg">#NOME?</span>
                     <p className="font-bold text-slate-700 text-sm mt-1">Erro de Digitação</p>
                     <p className="text-xs text-slate-500 mt-1">O Excel não reconheceu o nome da função (ex: SONA em vez de SOMA).</p>
                  </div>
               </div>

               <div className="mt-6 bg-slate-100 p-4 rounded-lg text-sm text-slate-600">
                  <strong>Boas Práticas:</strong> Salve com frequência, use nomes descritivos nas abas e documente fórmulas complexas.
               </div>
             </div>
          );

        case 10: // Conclusão
          return (
             <div className={`${excelThemeClass} items-center justify-center`}>
               <div className="max-w-2xl text-center space-y-8 animate-in slide-in-from-bottom duration-500">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Trophy size={40} className="text-emerald-600" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-800">Parabéns!</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                     Você completou o guia de noções básicas. Agora você possui uma base sólida, mas o Excel é profundo. A prática constante é a chave para o domínio.
                  </p>

                  <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 italic text-slate-700">
                     "O Excel não é apenas uma ferramenta de trabalho - é uma habilidade que abre portas, aumenta sua produtividade e agrega valor real à sua carreira."
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-8">
                     <div className="p-4 bg-white rounded shadow-sm border border-slate-200">
                        <Play size={20} className="text-blue-500 mb-2" />
                        <h5 className="font-bold text-sm">Pratique</h5>
                        <p className="text-xs text-slate-500">Crie planilhas pessoais.</p>
                     </div>
                     <div className="p-4 bg-white rounded shadow-sm border border-slate-200">
                        <Search size={20} className="text-purple-500 mb-2" />
                        <h5 className="font-bold text-sm">Explore</h5>
                        <p className="text-xs text-slate-500">Descubra novas funções.</p>
                     </div>
                     <div className="p-4 bg-white rounded shadow-sm border border-slate-200">
                        <Target size={20} className="text-red-500 mb-2" />
                        <h5 className="font-bold text-sm">Desafie-se</h5>
                        <p className="text-xs text-slate-500">Tente Tabelas Dinâmicas.</p>
                     </div>
                  </div>

                  <div className="pt-8">
                     <button onClick={handleBack} className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg">
                        Finalizar Curso
                     </button>
                  </div>
               </div>
            </div>
          );
      }
    }
  };

  if (activeModule) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300 pb-10">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para Lista
          </button>
          
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
          >
            {isDownloading ? (
              <>Carregando...</>
            ) : (
              <>
                <Download size={16} />
                Baixar PDF
              </>
            )}
          </button>
        </div>

        {/* INTERACTIVE PDF VIEWER CONTAINER */}
        <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[80vh]">
          
          {/* Toolbar */}
          <div className="bg-slate-900 text-slate-300 p-3 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-4">
              <span className="font-medium text-white truncate max-w-[200px] md:max-w-md">{activeModule.title}.pdf</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-slate-700 px-2 py-1 rounded">Página {currentPage} de {totalPages}</span>
              <div className="w-px h-4 bg-slate-700 mx-2"></div>
              <button className="p-1.5 hover:bg-slate-700 rounded transition-colors"><ZoomOut size={18} /></button>
              <button className="p-1.5 hover:bg-slate-700 rounded transition-colors"><ZoomIn size={18} /></button>
            </div>
          </div>

          {/* Main View Area */}
          <div className="flex-1 bg-slate-200/50 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
            
            {/* Prev Button */}
            <button 
              onClick={prevPage}
              disabled={currentPage === 1}
              className="absolute left-4 z-10 p-3 rounded-full bg-slate-900/10 text-slate-800 hover:bg-slate-900/20 disabled:opacity-0 transition-all backdrop-blur-sm"
            >
              <ChevronLeft size={32} />
            </button>

            {/* The "Paper" Page */}
            <div className="bg-white w-full max-w-[aspect-video] aspect-[4/3] md:aspect-[16/9] shadow-xl rounded-sm flex flex-col relative transition-all duration-300 transform">
              {/* Page Content */}
              <div className="flex-1 overflow-hidden relative">
                {renderSlideContent()}
              </div>

              {/* Page Footer */}
              <div className={`h-12 border-t flex items-center justify-between px-8 text-[10px] font-sans uppercase tracking-widest ${activeModule.id === '5s' ? 'bg-[#050A18] border-slate-800 text-slate-500' : 'bg-white border-slate-100 text-slate-400'}`}>
                <span>Almoxarifado Digital System</span>
                <span>{activeModule.category} Training</span>
                <span>{currentPage} / {totalPages}</span>
              </div>
            </div>

            {/* Next Button */}
            <button 
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="absolute right-4 z-10 p-3 rounded-full bg-slate-900/10 text-slate-800 hover:bg-slate-900/20 disabled:opacity-0 transition-all backdrop-blur-sm"
            >
              <ChevronRight size={32} />
            </button>

          </div>

          {/* Thumbnails/Progress Bar */}
          <div className="h-2 bg-slate-900 flex">
             {[...Array(totalPages)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-full flex-1 border-r border-slate-800 transition-colors ${i + 1 <= currentPage ? 'bg-blue-500' : 'bg-slate-700'}`}
                />
             ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Centro de Treinamento</h2>
          <p className="text-slate-500 mt-1">Biblioteca de Materiais Interativos (PDFs)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MODULES.map((module) => (
          <div 
            key={module.id} 
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer"
            onClick={() => handleOpenModule(module.id)}
          >
            {/* Card Image */}
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img 
                src={module.imageUrl} 
                alt={module.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
              
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border shadow-sm ${
                  module.category === 'office' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 
                  'bg-blue-100 text-blue-800 border-blue-200'
                }`}>
                  {module.category === 'office' ? 'Informática' : 'Gestão'}
                </span>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                <FileText size={12} />
                PDF Interativo
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-slate-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                {module.title}
              </h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-1">{module.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {module.duration}
                  </span>
                </div>
                
                <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:underline">
                  Ler Agora
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};