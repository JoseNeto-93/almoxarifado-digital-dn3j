# Almoxarifado Digital

Um sistema web de gerenciamento de estoque e almoxarifado com IA integrada.

## Sobre

Este é um sistema completo para gerenciar inventário, operações de estoque, registros financeiros e integração com um assistente IA (Google Gemini) especializado em logística e almoxarifado.

## Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- Uma chave de API do Google Gemini (obtenha em https://ai.google.dev/)

## Instalação

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure a variável de ambiente:**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```
   VITE_GEMINI_API_KEY=sua_chave_api_aqui
   ```

3. **Execute o projeto:**
   ```bash
   npm run dev
   ```

O aplicativo estará disponível em `http://localhost:3000`

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build otimizada para produção
- `npm run preview` - Visualiza a build de produção localmente

## Funcionalidades

- 📦 **Gerencimento de Inventário** - Controle completo de itens, quantidades e localizações
- 📊 **Dashboard Financeiro** - Acompanhamento de compras e custos
- 🤖 **Assistente IA** - Consultoria automática sobre organização e 5S
- 📋 **Histórico de Movimentação** - Registro completo de movimentações de estoque
- 👤 **Sistema de Autenticação** - Login seguro
- 🖨️ **Geração de Recibos** - Impressão e PDF de movimentações

## Correções Aplicadas

Este projeto foi corrigido para funcionar adequadamente na web:

1. ✅ Removido importmap inválido (CDNs não existentes)
2. ✅ Corrigida a integração com Google Generative AI SDK
3. ✅ Atualizada a configuração de variáveis de ambiente (VITE_GEMINI_API_KEY)
4. ✅ Corrigida a configuração do Vite
5. ✅ Adicionado arquivo `.env.example` para referência
