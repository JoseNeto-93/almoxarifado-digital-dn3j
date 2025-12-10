import React, { useState } from 'react';
import { InventoryItem, StockMovement } from '../types';
import { Download, Loader2, X, AlertTriangle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ReceiptProps {
  movement: StockMovement | null;
  item: InventoryItem | null;
  onClose: () => void;
}

export const Receipt: React.FC<ReceiptProps> = ({ movement, item, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!movement || !item) return null;

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const element = document.getElementById('receipt-content');
    if (!element) return;

    try {
      // Captura o elemento com alta qualidade
      const canvas = await html2canvas(element, {
        scale: 2, // Escala ajustada para bom equilíbrio entre qualidade e performance
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Cria PDF A4 em Retrato (Portrait)
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

      // Calcula as dimensões para ajustar a imagem dentro da página A4
      const imgProps = pdf.getImageProperties(imgData);
      
      // Tenta ajustar pela largura
      let finalWidth = pdfWidth;
      let finalHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Se a altura calculada for maior que a página, ajusta pela altura (Fit to Page)
      if (finalHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = (imgProps.width * finalHeight) / imgProps.height;
      }

      // Centraliza horizontalmente se necessário (caso tenha ajustado pela altura)
      const xOffset = (pdfWidth - finalWidth) / 2;
      
      pdf.addImage(imgData, 'PNG', xOffset, 0, finalWidth, finalHeight);
      pdf.save(`recibo_${movement.employeeName?.replace(/\s+/g, '_').toLowerCase()}_${movement.id.slice(0,6)}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar o documento. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 print:p-0 print:static print:block print:bg-white">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] print:shadow-none print:w-full print:max-w-none print:max-h-none">
        
        {/* Actions Bar (Hidden on Print) */}
        <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-slate-200 no-print">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            Visualização de Recibo
          </h3>
          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <X size={18} />
              Fechar
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm transition-all"
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
              {isGenerating ? 'Processando...' : 'Baixar PDF'}
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-8 flex justify-center print:p-0 print:bg-white print:overflow-visible">
          
          {/* A4 Paper Simulation */}
          <div 
            id="receipt-content" 
            className="bg-white w-[210mm] min-h-[297mm] p-[15mm] shadow-lg print:shadow-none text-slate-900 font-sans relative flex flex-col box-border"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            
            {/* Header */}
            <div className="border-b-2 border-slate-800 pb-6 mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-900">Recibo de Entrega de EPI</h1>
                <p className="text-slate-500 text-sm mt-1">Termo de Responsabilidade e Guarda</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-slate-200 uppercase tracking-tighter">ALMOXARIFADO</div>
                <div className="text-xs font-mono text-slate-400 mt-1">ID: {movement.id.toUpperCase().slice(0, 8)}</div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-50 p-4 rounded border border-slate-100">
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">Dados do Colaborador</h3>
                <p className="font-bold text-lg text-slate-800">{movement.employeeName}</p>
                <p className="text-sm text-slate-500">Beneficiário / Responsável</p>
              </div>
              <div className="bg-slate-50 p-4 rounded border border-slate-100">
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">Dados da Entrega</h3>
                <p className="font-bold text-lg text-slate-800">{new Date(movement.date).toLocaleDateString('pt-BR')}</p>
                <p className="text-sm text-slate-500">{new Date(movement.date).toLocaleTimeString('pt-BR')} • Entrega Direta</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase text-slate-800 mb-3 border-b border-slate-200 pb-1">Itens Entregues</h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-y border-slate-200 text-slate-600">
                    <th className="py-3 px-4 text-left font-semibold">Descrição do Material</th>
                    <th className="py-3 px-4 text-left font-semibold">Categoria / CA</th>
                    <th className="py-3 px-4 text-center font-semibold">Unid.</th>
                    <th className="py-3 px-4 text-center font-semibold">Qtd.</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 font-medium">{item.name}</td>
                    <td className="py-4 px-4 text-slate-500">{item.category}</td>
                    <td className="py-4 px-4 text-center text-slate-500">{item.unit}</td>
                    <td className="py-4 px-4 text-center font-bold bg-slate-50">{movement.quantity}</td>
                  </tr>
                  {/* Empty rows filler for visual balance - reduced count to save space */}
                  <tr className="border-b border-slate-100 h-10"><td colSpan={4}></td></tr>
                </tbody>
              </table>
            </div>

            {/* Legal Text */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8 text-justify">
              <div className="flex items-center gap-2 mb-3 text-amber-600 font-bold text-sm uppercase">
                <AlertTriangle size={16} />
                <span>Declaração de Responsabilidade</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Recebi da empresa, a título gratuito, os Equipamentos de Proteção Individual (EPI) constantes neste termo, para uso exclusivo em serviço, conforme determina a NR-06.
                <br/><br/>
                Declaro estar ciente de que:
                <br/>
                1. Devo utilizá-los apenas para a finalidade a que se destinam;
                <br/>
                2. Responsabilizo-me pela sua guarda e conservação;
                <br/>
                3. Comunicarei imediatamente qualquer alteração que os tornem impróprios para uso;
                <br/>
                4. A não utilização constitui ato faltoso, sujeito às sanções previstas em lei.
              </p>
            </div>

            {/* Signatures - Uses mt-auto to push to bottom, but inside the flex container */}
            <div className="mt-auto pt-4 grid grid-cols-2 gap-12">
              <div className="text-center">
                <div className="border-b border-slate-300 mb-3 h-8"></div>
                <p className="font-bold text-sm text-slate-800">Almoxarifado / Entrega</p>
                <p className="text-xs text-slate-400 uppercase">Assinatura do Responsável</p>
              </div>
              <div className="text-center">
                <div className="border-b border-slate-300 mb-3 h-8"></div>
                <p className="font-bold text-sm text-slate-800">{movement.employeeName}</p>
                <p className="text-xs text-slate-400 uppercase">Assinatura do Colaborador</p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 mt-8 pt-4 flex justify-between items-center text-[10px] text-slate-400">
              <span>Documento gerado eletronicamente em {new Date().toLocaleString()}</span>
              <span>Almoxarifado Digital System v1.0</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};