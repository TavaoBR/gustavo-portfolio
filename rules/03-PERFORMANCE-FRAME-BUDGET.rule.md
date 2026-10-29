# R-03: Orçamento de Performance & 60fps Constante (`03-PERFORMANCE-FRAME-BUDGET.rule.md`)

> **Severidade:** 🔴 BLOCKER (Violação bloqueia aprovação de código)  
> **Referência:** [`docs/06-ENGENHARIA-PERFORMANCE-ACESSIBILIDADE.md`](file:///d:/projetos/gustavo-portfolio/docs/06-ENGENHARIA-PERFORMANCE-ACESSIBILIDADE.md) | Skill `animation-performance`

---

## 1. Princípio Fundamental
O portfólio de um engenheiro Full Stack IV e Design Engineer deve ser um exemplo prático de maestria no pipeline de renderização do navegador (*Parse → Style → Layout → Paint → Composite*). Qualquer queda de quadros (*frame drop* ou *jank*) invalida o padrão de excelência técnica esperado.

---

## 2. A Regra de Ouro do Pipeline de Renderização

### 2.1 Propriedades Proibidas em Animações e Transições
* ❌ **PROIBIDO:** Animar qualquer propriedade que acione as etapas de **Layout (Reflow)** ou **Paint**:
  * `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`
  * `top`, `bottom`, `left`, `right`
  * `margin`, `padding`
  * `border-width`, `border-radius`
  * `box-shadow` (animar a sombra diretamente força repintura contínua; deve-se animar a opacidade de um pseudo-elemento com a sombra pré-renderizada)

### 2.2 Propriedades Permitidas (Composite Only)
* ✅ **OBRIGATÓRIO:** Todas as animações, transições e gestos devem interpolar exclusivamente propriedades tratadas diretamente pelo compositor da GPU:
  * `transform: translate3d(x, y, 0)` ou `transform: translateX() / translateY()`
  * `transform: scale()`
  * `transform: rotate()`
  * `opacity`

---

## 3. Gestão Consciente de `will-change` e Memória GPU
* ❌ **PROIBIDO:** Declarar `will-change: all` ou aplicar `will-change: transform` em dezenas de elementos ao mesmo tempo no CSS global (isso satura a memória VRAM da GPU e degrada o desempenho em dispositivos móveis).
* ✅ **OBRIGATÓRIO:** Aplicar `will-change: transform` apenas no elemento que estiver sob manipulação ativa do usuário (ex: card do simulador de molas do Lab) e removê-lo quando o elemento retornar ao repouso.

---

## 4. Orçamento de Core Web Vitals

| Métrica | Limite Tolerado | Medida Preventiva |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `<= 1.2s` | Fontes críticas pré-carregadas via `<link rel="preload">`, hero sem bundles pesados de canvas no carregamento inicial. |
| **INP (Interaction to Next Paint)** | `<= 50ms` | Manipuladores de clique e toque devem ser não-bloqueantes. Tarefas pesadas delegadas para microtarefas (`queueMicrotask`). |
| **CLS (Cumulative Layout Shift)** | `0.00` | Todas as imagens, banners e containers de grid devem possuir proporção explícita (`aspect-ratio` ou `min-height`) reservada no DOM. |

---

## 5. Exemplo de Código Aprovado vs. Rejeitado

```css
/* ❌ REJEITADO (Aciona Layout Reflow contínuo a cada frame) */
.modal-expand {
  height: 0;
  transition: height 300ms ease;
}
.modal-expand.open {
  height: 400px;
}

/* ✅ APROVADO (Interpolado exclusivamente pela GPU com Composite Layer) */
.modal-expand {
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  transition: transform 250ms var(--spring-fluid), opacity 200ms ease;
}
.modal-expand.open {
  transform: scaleY(1);
  opacity: 1;
}
```
