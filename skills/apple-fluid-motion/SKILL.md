---
name: apple-fluid-motion
description: "Implementação prática da filosofia da Apple (WWDC: Designing Fluid Interfaces) na web: física de molas, resposta imediata no pointer-down, rastreamento 1:1 e spotlight cursor."
---

# Apple Fluid Motion — Guia de Engenharia de Movimento e Física de Molas

Esta skill codifica as lições essenciais da conferência da Apple (*WWDC: Designing Fluid Interfaces*) adaptadas para a plataforma web moderna (CSS, Pointer Events, `requestAnimationFrame` e aceleração por hardware).

---

## 1. O Princípio de Resposta Instantânea (Kill Latency)

A percepção de fluidez é destruída no instante em que há atraso entre a ação física do usuário e a resposta visual da interface:

* **O erro clássico:** Aguardar o evento `click` ou `pointerup` para alterar estilos.
* **A solução Apple:** O feedback deve acontecer no momento exato do `pointerdown` ou `:active`:

```css
/* Feedback tátil imediato no pressionamento */
.tap-feedback {
  transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.tap-feedback:active {
  transform: scale(0.97);
  transition-duration: 80ms; /* Compressão mais rápida que a recuperação */
}
```

---

## 2. Manipulação Direta 1:1 (Direct Manipulation)

Quando o usuário agarra um card ou controle no Lab Interativo, o elemento não pode "pular" para o centro do ponteiro. Ele deve permanecer colado exatamente no ponto de pegada:

```typescript
export class DirectTracker {
  private element: HTMLElement;
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;

  constructor(element: HTMLElement) {
    this.element = element;
    this.init();
  }

  private init() {
    this.element.addEventListener('pointerdown', this.onPointerDown);
    this.element.addEventListener('pointermove', this.onPointerMove);
    this.element.addEventListener('pointerup', this.onPointerUp);
    this.element.addEventListener('pointercancel', this.onPointerUp);
  }

  private onPointerDown = (e: PointerEvent) => {
    this.isDragging = true;
    this.startX = e.clientX - this.currentX;
    this.startY = e.clientY - this.currentY;
    this.element.setPointerCapture(e.pointerId);
    this.element.style.cursor = 'grabbing';
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.isDragging) return;
    this.currentX = e.clientX - this.startX;
    this.currentY = e.clientY - this.startY;
    
    // Atualização acelerada exclusivamente via GPU
    this.element.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
  };

  private onPointerUp = (e: PointerEvent) => {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.element.releasePointerCapture(e.pointerId);
    this.element.style.cursor = 'grab';
    
    // Retorno suave com mola elástica
    this.snapBack();
  };

  private snapBack() {
    this.element.style.transition = 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)';
    this.element.style.transform = 'translate3d(0, 0, 0)';
    this.currentX = 0;
    this.currentY = 0;

    const onEnd = () => {
      this.element.style.transition = '';
      this.element.removeEventListener('transitionend', onEnd);
    };
    this.element.addEventListener('transitionend', onEnd);
  }
}
```

---

## 3. Algoritmo de Spotlight Cursor Sheen (Alta Performance)

O reflexo dinâmico de luz que segue o mouse sobre os cards Obsidian deve ser desacoplado do ciclo de eventos do mouse usando `requestAnimationFrame`:

```typescript
export function initSpotlightCards(selector = '.spotlight-card') {
  const cards = document.querySelectorAll<HTMLElement>(selector);

  cards.forEach((card) => {
    let frameId: number | null = null;

    card.addEventListener('pointermove', (e) => {
      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  });
}
```

```css
/* CSS do Spotlight Sheen */
.spotlight-card {
  position: relative;
  background-color: var(--bg-card);
  overflow: hidden;
}

.spotlight-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    500px circle at var(--mouse-x, -500px) var(--mouse-y, -500px),
    rgba(255, 255, 255, 0.07),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 250ms ease;
  pointer-events: none;
  z-index: 1;
}

.spotlight-card:hover::before {
  opacity: 1;
}
```
