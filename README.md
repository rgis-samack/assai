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



---
*© Samack 697 • RGIS Inventários*
