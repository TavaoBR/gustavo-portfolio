---
name: obsidian-design-tokens
description: "Arquitetura e gestão de tokens de design em 3 camadas para a paleta Pure Obsidian & Minimal Ice White, glassmorphism e integração com Tailwind CSS / Vanilla CSS."
---

# Obsidian Design Tokens — Guia de Arquitetura de Tokens e Materiais

Esta skill detalha a implementação e manutenção do sistema de tokens em **3 camadas (Primitive → Semantic → Component)** na paleta monocromática *Pure Obsidian & Minimal Ice White*.

---

## 1. Dicionário Central de Tokens CSS (`tokens.css`)

```css
:root {
  /* CAMADA 1: TOKENS PRIMITIVOS */
  --color-obsidian-950: #000000;
  --color-obsidian-900: #050505;
  --color-obsidian-850: #0a0a0a;
  --color-obsidian-800: #111113;
  --color-obsidian-750: #18181b;

  --color-ice-white: #ffffff;
  --color-ice-200: #e2e8f0;
  --color-ice-400: #94a3b8;
  --color-ice-600: #64748b;

  --color-emerald-400: #10b981;

  --transparency-white-2: rgba(255, 255, 255, 0.02);
  --transparency-white-4: rgba(255, 255, 255, 0.04);
  --transparency-white-8: rgba(255, 255, 255, 0.08);
  --transparency-white-15: rgba(255, 255, 255, 0.15);

  --radius-sm-raw: 6px;
  --radius-md-raw: 10px;
  --radius-lg-raw: 16px;
  --radius-xl-raw: 20px;
  --radius-pill-raw: 9999px;

  /* CAMADA 2: TOKENS SEMÂNTICOS */
  --bg-canvas: var(--color-obsidian-950);
  --bg-surface: var(--color-obsidian-900);
  --bg-card: var(--color-obsidian-850);
  --bg-card-hover: var(--color-obsidian-800);
  --bg-glass: rgba(10, 10, 10, 0.65);

  --border-subtle: var(--transparency-white-8);
  --border-hover: var(--transparency-white-15);
  --border-active: rgba(255, 255, 255, 0.25);

  --text-primary: var(--color-ice-white);
  --text-secondary: var(--color-ice-200);
  --text-muted: var(--color-ice-400);
  --text-faint: var(--color-ice-600);

  --status-available: var(--color-emerald-400);

  --radius-sm: var(--radius-sm-raw);
  --radius-md: var(--radius-md-raw);
  --radius-lg: var(--radius-lg-raw);
  --radius-xl: var(--radius-xl-raw);
  --radius-full: var(--radius-pill-raw);

  /* CAMADA 3: TOKENS DE COMPONENTES */
  --navbar-bg: var(--bg-glass);
  --navbar-border: var(--border-subtle);
  --navbar-blur: 16px;

  --btn-primary-bg: var(--color-ice-white);
  --btn-primary-text: var(--color-obsidian-950);
  --btn-primary-hover-bg: var(--color-ice-200);

  --btn-ghost-bg: var(--transparency-white-4);
  --btn-ghost-border: var(--border-subtle);
  --btn-ghost-text: var(--text-primary);
  --btn-ghost-hover: var(--transparency-white-8);
}
```

---

## 2. Configuração do Tailwind CSS (Integração sem Atrito)

Caso a aplicação utilize Tailwind CSS, configure o `tailwind.config.js` para consumir as variáveis semânticas:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        card: {
          DEFAULT: 'var(--bg-card)',
          hover: 'var(--bg-card-hover)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          hover: 'var(--border-hover)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        status: {
          available: 'var(--status-available)',
        }
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      fontFamily: {
        sans: ['Geist Sans', 'Inter', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
      }
    },
  },
};
```

---

## 3. Padrão de Glassmorphism & Materiais

O efeito de vidro temperado translúcido (*Frosted Glass*) utilizado na navbar e em cards suspensos:

```css
.glass-panel {
  background-color: var(--navbar-bg);
  backdrop-filter: blur(var(--navbar-blur));
  -webkit-backdrop-filter: blur(var(--navbar-blur));
  border: 1px solid var(--navbar-border);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```
