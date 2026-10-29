# R-04: Acessibilidade & Inclusão WCAG 2.1 AA (`04-ACCESSIBILITY-WCAG-AA.rule.md`)

> **Severidade:** 🔴 BLOCKER (Violação bloqueia aprovação de código)  
> **Referência:** [`docs/06-ENGENHARIA-PERFORMANCE-ACESSIBILIDADE.md`](file:///d:/projetos/gustavo-portfolio/docs/06-ENGENHARIA-PERFORMANCE-ACESSIBILIDADE.md) | Skill `ui-ux-pro-max`

---

## 1. Princípio Fundamental
A sofisticação do Dark Mode e do minimalismo Obsidian não pode, sob nenhuma circunstância, excluir pessoas com deficiências visuais, motoras ou cognitivas. O portfólio deve ser 100% operável via teclado, perfeitamente legível por leitores de tela e rigorosamente aderente ao padrão **WCAG 2.1 Nível AA**.

---

## 2. Regras de Contraste Cromático (Color Contrast)

* ❌ **PROIBIDO:** Usar textos em cinza escuro ou com opacidade excessivamente baixa sobre o fundo preto que fiquem abaixo de 4.5:1.
* ✅ **OBRIGATÓRIO:**
  * **Títulos e Headings:** Usar `var(--text-primary)` (`#FFFFFF`), garantindo contraste de **21:1** (nível AAA).
  * **Corpo de Texto e Parágrafos:** Usar `var(--text-secondary)` (`#E2E8F0`), garantindo contraste de **13.5:1** (nível AAA).
  * **Metadados, Datas e Legendas:** Usar no mínimo `var(--text-muted)` (`#94A3B8`), garantindo contraste de **7.8:1** (nível AAA).

---

## 3. Navegação Exclusiva por Teclado & Foco Visível

* ❌ **PROIBIDO:** Remover o anel de foco do navegador sem fornecer um substituto de alto contraste (ex: `outline: none` isolado é estritamente vetado).
* ✅ **OBRIGATÓRIO:**
  * Todo elemento focalizável (`<a>`, `<button>`, `<input>`, elementos com `tabindex="0"`) deve possuir indicador de foco nítido e estético:
    ```css
    :focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.9) !important;
      outline-offset: 3px !important;
      border-radius: var(--radius-sm);
    }
    ```
  * Ordem sequencial do foco deve seguir estritamente o fluxo visual da esquerda para a direita e de cima para baixo.
  * Modais e a Command Palette (`Cmd+K`) devem conter obrigatoriamente um **Focus Trap** (o foco do teclado não pode escapar para elementos ocultos de fundo enquanto o modal estiver aberto).

---

## 4. Semântica HTML5 & Leitores de Tela (Screen Readers)

* ✅ **OBRIGATÓRIO:**
  * Existência de um único `<h1>` no topo da página.
  * Uso correto de landmarks: `<header>`, `<nav role="navigation">`, `<main id="conteudo-principal">`, `<section>`, `<footer>`.
  * **Botões de Ícones:** Todo botão que não exibe texto visível (ex: botão do GitHub, LinkedIn, fechar modal) deve conter obrigatoriamente `aria-label` descritivo:
    ```html
    <button type="button" aria-label="Acessar repositório do projeto no GitHub">
      <svg aria-hidden="true">...</svg>
    </button>
    ```
  * **Indicador de Status Pulsante:** Deve conter texto invisível para sintetizadores de voz:
    ```html
    <span class="status-dot" aria-hidden="true"></span>
    <span class="sr-only">Disponível para novos projetos e contratação</span>
    ```

---

## 5. Respeito Irrestrito a `prefers-reduced-motion`

Usuários que possuem sensibilidade vestibular ou tonturas visuais causadas por animações de interface devem ter suas preferências respeitadas automaticamente pelo sistema:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Desativação do rastreamento de cursor */
  .spotlight-card::before {
    display: none !important;
  }
}
```
