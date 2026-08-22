# ☀️ Assaí Atacadista — Gerador de Crachás de Inventário Pro (A4 Paisagem)

> **Ferramenta Oficial de Automação RGIS / Inventário Assaí Atacadista**  
> Desenvolvido por **Samack 697** (Aracaju - Sergipe)

---

## 🚀 Visão Geral

Este repositório contém a aplicação web de alta performance para processamento instantâneo de contagens de inventário do **Assaí Atacadista** e geração automatizada de crachás de gôndola/palete no formato **A4 Horizontal (Paisagem)**.

### ✨ Principais Recursos

- ⚡ **Processamento em Memória 100% Client-Side**: Suporta arquivos `.csv` e planilhas Excel `.xlsx` / `.xlsm` com milhares de itens instantaneamente via WebAssembly/Web Workers.
- 🏷️ **Layout Oficial Assaí**:
  - **SKU**: Substitui a TAG no topo esquerdo (fonte 82pt em negrito).
  - **Área**: Localizada no canto superior direito.
  - **Descrição**: Cabeçalho centralizado com nome do produto em caixa alta.
  - **Produto (Código de Barras 13 Dígitos)**: Coluna esquerda (66% de largura) com fonte 76pt em negrito.
  - **Quantidade**: Coluna direita (34% de largura) com fonte 86pt em negrito e regra automática de remoção dos três zeros decimais (`.000` -> inteiro).
- 🛡️ **Segurança & Telemetria em Tempo Real**:
  - Código JavaScript com ofuscação avançada (Control Flow Flattening + Base64 String Array + Anti-Tampering).
  - Proteção anti-cópia e bloqueio de atalhos de desenvolvedor (`F12`, `Ctrl+Shift+I`, `Ctrl+U`).
  - Monitoramento contínuo e kill-switch remoto via **Supabase Database** (`app_name: 'assai'`).
  - Georreferenciamento de acessos em 4 camadas de fallback no território brasileiro.

---

## 📦 Estrutura de Arquivos para o GitHub Pages

| Arquivo | Descrição |
|---|---|
| `index.html` | Estrutura principal da página com tema Assaí Solar e Drag & Drop |
| `style.css` | Folha de estilos corporativa responsiva e de alta visibilidade |
| `app.js` | Motor de processamento, geração de PDF jsPDF, filtros e telemetria ofuscados |
| `logo.png` | Logotipo oficial do Assaí (Cabeçalho Superior Esquerdo) |
| `logo meio.webp` | Logotipo solar animado do Assaí (Empty State / Hero Central) |
| `app_logo.ico` | Favicon da aplicação |

---

## 🌐 Publicação no GitHub Pages

1. Crie um novo repositório no seu GitHub (ex: `assai` ou `gerador-assai`).
2. Faça o upload de todos os arquivos desta pasta (`index.html`, `style.css`, `app.js`, `logo.png`, `logo meio.webp`, `app_logo.ico`).
3. Vá em **Settings** > **Pages** > em **Branch**, selecione `main` (ou `master`) e `/root` > Clique em **Save**.
4. Sua página estará online no link:
   `https://rgis-samack.github.io/assai/` *(ou no nome do seu repositório)*.

---
*© Samack 697 • RGIS Inventários*
