# R-02: Física de Molas & Microinterações Apple (`02-APPLE-PHYSICS-MOTION.rule.md`)

> **Severidade:** 🔴 BLOCKER (Violação bloqueia aprovação de código)  
> **Referência:** [`docs/03-DESIGN-SYSTEM-OBSIDIAN-ICE.md`](file:///d:/projetos/gustavo-portfolio/docs/03-DESIGN-SYSTEM-OBSIDIAN-ICE.md) | Skill `apple-design`

---

## 1. Princípio Fundamental
Uma interface digital só parece verdadeiramente viva quando se comporta como o mundo físico: as coisas reagem imediatamente ao menor toque, preservam a velocidade dos gestos, movem-se com curvas elásticas naturais e podem ser interrompidas no meio do percurso. Transições lineares ou atrasadas destroem a ilusão de produto nativo.

---

## 2. Regras de Resposta Imediata (Kill Latency)

### 2.1 Resposta no `pointer-down`
* ❌ **PROIBIDO:** Esperar o evento `click` ou o soltar do botão do mouse (`pointerup`) para exibir feedback visual.
* ✅ **OBRIGATÓRIO:** Todo botão, card interativo ou link deve reagir instantaneamente no estado `:active` ou no evento `pointerdown`:
  ```css
  /* Regra obrigatória para elementos clicáveis */
  .interactive-tap:active {
    transform: scale(0.975);
    transition: transform 100ms var(--spring-fluid);
  }
  ```

### 2.2 Rastreamento 1:1 (Direct Manipulation)
* Em componentes arrastáveis (como no Lab Interativo), o elemento deve mover-se grudado nas coordenadas do cursor.
* É **proibido** centralizar o elemento no ponteiro ao iniciar o clique; deve ser mantido o offset exato de onde o usuário clicou.
* É **obrigatório** usar `setPointerCapture` para que o elemento continue respondendo mesmo se o ponteiro escapar dos limites da tela.

---

## 3. Curvas de Mola & Duração (Spring Timing)

### 3.1 Proibição de Curvas Artificiais Descalibradas
* ❌ **PROIBIDO:** Usar `transition: all 0.5s ease` ou `transition: all linear`.
* ❌ **PROIBIDO:** Animações elásticas exageradas que ficam oscilando e fazem o usuário esperar para interagir.
* ✅ **OBRIGATÓRIO:** Utilizar as variáveis calibradas de física:
  * **Interação Tátil Rápida (Botões, Toggles):** `--spring-fluid` (`cubic-bezier(0.16, 1, 0.3, 1)`) com duração de `150ms` a `250ms`.
  * **Abertura de Modais & Tooltips:** `--spring-snappy` (`cubic-bezier(0.19, 1, 0.22, 1)`) com duração de `200ms` a `300ms`.
  * **Entrada de Cards em Scroll:** Efeito staggered suave com atraso incremental de `50ms` por item.

---

## 4. Efeito Spotlight de Cursor

Nos cards do Bento Grid e Estudos de Caso:
* As variáveis CSS `--mouse-x` e `--mouse-y` devem ser alimentadas dinamicamente via JavaScript ouvindo `pointermove`.
* A atualização das variáveis deve ser enfileirada através de `requestAnimationFrame` para evitar recálculo de estilo fora do ciclo de renderização do navegador.
* O brilho reflexivo deve manter opacidade discreta (entre 4% e 8%) sobre o fundo Obsidian para garantir sofisticação sem poluição visual.

---

## 5. Exemplo de Código Aprovado vs. Rejeitado

```javascript
// ❌ REJEITADO (Atualização síncrona pesada que causa jank)
card.addEventListener('mousemove', (e) => {
  card.style.left = e.clientX + 'px'; // Força Layout Reflow!
});

// ✅ APROVADO (Atualização otimizada com variáveis CSS e rAF)
let ticking = false;
card.addEventListener('pointermove', (e) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      ticking = false;
    });
    ticking = true;
  }
});
```
