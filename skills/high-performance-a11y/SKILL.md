---
name: high-performance-a11y
description: "Técnicas de auditoria de performance em 60fps/120fps, isolamento de camadas na GPU, conformidade estrita WCAG 2.1 AA e implementação de acessibilidade universal."
---

# High Performance & A11y — Guia de Engenharia de Performance e Acessibilidade

Esta skill consolida as técnicas para manter a taxa de quadros a **60fps/120fps constantes**, eliminar reflows desnecessários e assegurar total acessibilidade (**WCAG 2.1 Nível AA**) no portfólio.

---

## 1. Otimização do Pipeline de Renderização (GPU Composite Layer)

Para que transições e interações de scroll nunca travem a thread principal:

### 1.1 Tabela de Custo das Propriedades CSS
| Propriedade | Layout (Reflow) | Paint (Repintura) | Composite (GPU) | Veredito |
| :--- | :---: | :---: | :---: | :--- |
| `transform` | ❌ Não | ❌ Não | ✅ Sim | **100% Aprovado para Animação** |
| `opacity` | ❌ Não | ❌ Não | ✅ Sim | **100% Aprovado para Animação** |
| `top / left` | ⚠️ **SIM** | ⚠️ **SIM** | ❌ Não | ❌ **PROIBIDO EM ANIMAÇÃO** |
| `height / width` | ⚠️ **SIM** | ⚠️ **SIM** | ❌ Não | ❌ **PROIBIDO EM ANIMAÇÃO** |
| `box-shadow` | ❌ Não | ⚠️ **SIM** | ❌ Não | ❌ **PROIBIDO EM SCROLL/HOVER RÁPIDO** |

### 1.2 Técnica de Sombra Fluida sem Custo de Paint
Em vez de animar `box-shadow: 0 0 20px ...` diretamente, utilize um pseudo-elemento com a sombra pré-renderizada e anime apenas a sua `opacity`:
```css
.card-glow {
  position: relative;
}

.card-glow::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 20px 50px rgba(255, 255, 255, 0.08);
  opacity: 0;
  transition: opacity 300ms ease;
  pointer-events: none;
}

.card-glow:hover::after {
  opacity: 1; /* Custo zero de Layout e Paint! */
}
```

---

## 2. Acessibilidade Prática (WCAG 2.1 AA)

### 2.1 Focus Trap para Modais e Command Palette (`Cmd+K`)
Quando um modal abre, o foco do teclado deve ficar contido dentro dele:
```typescript
export function trapFocus(container: HTMLElement) {
  const focusable = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  first.focus();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === 'Escape') {
      container.dispatchEvent(new CustomEvent('close-modal'));
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  return () => container.removeEventListener('keydown', handleKeyDown);
}
```

### 2.2 Respeito Estrito a `prefers-reduced-motion`
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```
