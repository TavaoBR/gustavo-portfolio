# 03. Design System: Pure Obsidian & Minimal Ice White

Este documento formaliza as decisões de design, tokens de 3 camadas, regras de tipografia, materiais de profundidade e física de animações inspiradas nos padrões da **Apple (WWDC: Designing Fluid Interfaces)** e nas principais referências do **Dribbble**.

---

## 1. Arquitetura de Tokens em 3 Camadas (Three-Layer Tokens)

Seguindo o padrão do `design-system`:
```
Primitive (Valores brutos hex / rem / ms)
       ↓
Semantic (Propósito e contexto semântico)
       ↓
Component (Tokens de componentes específicos)
```

### 1.1 Tokens Primitivos (Primitives)
```css
:root {
  /* Cores Neutras Obsidian (Base) */
  --obsidian-950: #000000;
  --obsidian-900: #050505;
  --obsidian-850: #0a0a0a;
  --obsidian-800: #111113;
  --obsidian-700: #18181b;

  /* Escala de Cinzas & Ice White */
  --ice-white: #ffffff;
  --ice-50: #f8fafc;
  --ice-100: #f1f5f9;
  --ice-200: #e2e8f0;
  --ice-300: #cbd5e1;
  --ice-400: #94a3b8;
  --ice-500: #64748b;
  --ice-600: #475569;

  /* Transparências & Reflexos */
  --alpha-white-2: rgba(255, 255, 255, 0.02);
  --alpha-white-4: rgba(255, 255, 255, 0.04);
  --alpha-white-8: rgba(255, 255, 255, 0.08);
  --alpha-white-15: rgba(255, 255, 255, 0.15);
  --alpha-white-25: rgba(255, 255, 255, 0.25);

  /* Curvas e Física de Molas (Apple WWDC Fluid Motion) */
  --spring-snappy: cubic-bezier(0.19, 1, 0.22, 1);
  --spring-fluid: cubic-bezier(0.16, 1, 0.3, 1);
  --spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 350ms;
  --duration-smooth: 500ms;
}
```

### 1.2 Tokens Semânticos (Semantic Aliases)
```css
:root {
  /* Superfícies & Planos de Fundo */
  --bg-canvas: var(--obsidian-950);
  --bg-surface: var(--obsidian-900);
  --bg-card: var(--obsidian-850);
  --bg-card-hover: var(--obsidian-800);
  --bg-glass: rgba(10, 10, 10, 0.65);

  /* Bordas & Separadores */
  --border-subtle: var(--alpha-white-8);
  --border-hover: var(--alpha-white-15);
  --border-active: var(--alpha-white-25);
  --border-highlight: rgba(255, 255, 255, 0.4);

  /* Textos & Conteúdo */
  --text-primary: var(--ice-white);
  --text-secondary: var(--ice-200);
  --text-muted: var(--ice-400);
  --text-faint: var(--ice-600);

  /* Acentos de Status */
  --status-available: #10b981; /* Verde esmeralda sutil para disponibilidade */
  --status-available-glow: rgba(16, 185, 129, 0.25);
}
```

### 1.3 Tokens de Componentes (Component Specific)
```css
:root {
  /* Navbar */
  --navbar-bg: var(--bg-glass);
  --navbar-border: var(--border-subtle);
  --navbar-blur: 16px;

  /* Cards do Bento Grid */
  --card-radius: 20px;
  --card-padding: 28px;
  --card-border: var(--border-subtle);
  --card-bg: var(--bg-card);

  /* Botão Primário (Ice White High-Contrast) */
  --btn-primary-bg: var(--ice-white);
  --btn-primary-text: var(--obsidian-950);
  --btn-primary-hover-bg: var(--ice-200);

  /* Botão Secundário (Translucent Ghost) */
  --btn-ghost-bg: var(--alpha-white-4);
  --btn-ghost-border: var(--border-subtle);
  --btn-ghost-text: var(--ice-white);
  --btn-ghost-hover-bg: var(--alpha-white-8);
}
```

---

## 2. Tipografia & Escala Matemática

O emparelhamento tipográfico combina rigor arquitetural com expressividade moderna:
* **Família Display & Corpo:** `Geist Sans`, `Inter` ou `Plus Jakarta Sans` (sem serifa geométrica limpa).
* **Família de Código & Dados:** `Geist Mono` ou `JetBrains Mono` (para tags de stack, números métricos e consoles).

### Escala de Tamanhos & Tracking Óptico (Apple Typography Style)
| Nível | Tamanho (rem / px) | Peso (Weight) | Tracking (Letter Spacing) | Altura de Linha (Leading) |
| :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `3.5rem` (56px) | 700 / Bold | `-0.035em` (Tight) | `1.05` |
| **Headline H2**| `2.25rem` (36px) | 600 / SemiBold | `-0.025em` | `1.15` |
| **Title H3**   | `1.5rem` (24px) | 600 / SemiBold | `-0.02em` | `1.25` |
| **Body Large** | `1.125rem` (18px) | 400 / Regular | `-0.01em` | `1.6` |
| **Body Regular**| `1.0rem` (16px) | 400 / Regular | `0` | `1.55` |
| **Mono Small** | `0.875rem` (14px)| 500 / Medium | `+0.01em` | `1.4` |
| **Overline Tag**| `0.75rem` (12px) | 600 / SemiBold | `+0.08em` (Caps) | `1.0` |

---

## 3. Filosofia de Movimento & Física de Molas (Apple Guidelines)

Interfaces de alto nível não utilizam transições lineares genéricas; elas se comportam como o mundo físico real:

### 3.1 Princípio 1: Resposta Instantânea no `pointer-down`
* **Nunca** esperar o evento `click` ou soltar o mouse para responder visualmente.
* No momento exato em que o ponteiro encosta no botão ou card (`:active` ou `pointerdown`), o elemento deve comprimir levemente:
  ```css
  .interactive-element:active {
    transform: scale(0.975);
    transition: transform var(--duration-instant) var(--spring-fluid);
  }
  ```

### 3.2 Princípio 2: Efeito Spotlight de Cursor (Dribbble Benchmark)
Cards do Bento Grid e dos Cases possuem um reflexo dinâmico que segue as coordenadas do mouse, criando profundidade tridimensional pura em tons de cinza/branco:
```css
.spotlight-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.spotlight-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x, 0) var(--mouse-y, 0),
    rgba(255, 255, 255, 0.06),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 300ms ease;
  pointer-events: none;
}

.spotlight-card:hover::before {
  opacity: 1;
}
```

### 3.3 Princípio 3: Interrupção Suave (Interruptibility)
Se o usuário passar o mouse rapidamente sobre vários cards, a animação nunca deve congelar nem reiniciar bruscamente. As transições devem herdar a velocidade atual do elemento via aceleração por GPU (`transform`, `opacity` com `will-change: transform`).

---

## 4. Sistema de Materiais & Profundidade (Glass & Depth)

Para evitar que a tela preta pareça "morta" ou chapada, utilizamos **camadas físicas de elevação**:
1. **Nível 0 (Canvas):** `#000000` absoluto com ruído de granulação sutil (1.5% de opacidade SVG noise) ou grid vetorial tênue.
2. **Nível 1 (Bento Cards):** `#0A0A0A` com borda `rgba(255, 255, 255, 0.08)` e cantos arredondados de `20px`.
3. **Nível 2 (Elementos Flutuantes / Modais / Navbar):** `rgba(10, 10, 10, 0.7)` com `backdrop-filter: blur(16px)` e borda superior reforçada `rgba(255, 255, 255, 0.12)`.
4. **Nível 3 (Tooltips & Popovers):** `#18181B` com sombra difusa `0 20px 40px rgba(0, 0, 0, 0.8)`.
