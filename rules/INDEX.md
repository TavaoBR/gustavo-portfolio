# Diretrizes e Regras Operacionais de IA (Rules Index)
> **Políticas Inegociáveis de Engenharia, Design System e Qualidade de Código**

Este diretório define as **regras obrigatórias em Markdown (`.rule.md`)** que toda IA ou desenvolvedor deve ler e seguir estritamente antes e durante a criação de qualquer componente, estilo, animação ou endpoint neste portfólio.

---

## 🚦 Níveis de Severidade das Regras

* 🔴 **BLOCKER (Bloqueante):** Violações impedem a aprovação de código ou merge. A IA deve recusar a sugestão ou corrigir imediatamente (ex: animar propriedades de layout forçando reflow, uso de `any` em TypeScript, falta de contraste de acessibilidade).
* 🟡 **WARNING (Alerta):** Práticas que exigem justificativa explícita ou refatoração planejada (ex: strings de texto sem tradução bilíngue, componentes com mais de 250 linhas).
* 🟢 **ADVISORY (Recomendação):** Boas práticas de convenção e elegância arquitetural.

---

## 📋 Catálogo de Regras

| Código | Arquivo | Severidade | Escopo Principal |
| :--- | :--- | :--- | :--- |
| **R-01** | [`01-DESIGN-SYSTEM-TOKENS.rule.md`](file:///d:/projetos/gustavo-portfolio/rules/01-DESIGN-SYSTEM-TOKENS.rule.md) | 🔴 BLOCKER | Uso estrito de tokens em 3 camadas, paleta *Pure Obsidian & Ice White*, zero cores hex soltas. |
| **R-02** | [`02-APPLE-PHYSICS-MOTION.rule.md`](file:///d:/projetos/gustavo-portfolio/rules/02-APPLE-PHYSICS-MOTION.rule.md) | 🔴 BLOCKER | Física de molas (WWDC), resposta no `pointer-down`, interrupções suaves e efeito spotlight. |
| **R-03** | [`03-PERFORMANCE-FRAME-BUDGET.rule.md`](file:///d:/projetos/gustavo-portfolio/rules/03-PERFORMANCE-FRAME-BUDGET.rule.md) | 🔴 BLOCKER | Orçamento de 60fps/120fps, animações apenas via GPU (`transform`/`opacity`), Core Web Vitals. |
| **R-04** | [`04-ACCESSIBILITY-WCAG-AA.rule.md`](file:///d:/projetos/gustavo-portfolio/rules/04-ACCESSIBILITY-WCAG-AA.rule.md) | 🔴 BLOCKER | Conformidade WCAG 2.1 AA, anéis de foco, navegação por teclado e `prefers-reduced-motion`. |
| **R-05** | [`05-CLEAN-CODE-TYPESCRIPT.rule.md`](file:///d:/projetos/gustavo-portfolio/rules/05-CLEAN-CODE-TYPESCRIPT.rule.md) | 🔴 BLOCKER | TypeScript estrito (sem `any`), componentes modulares, SOLID e Clean Architecture. |
| **R-06** | [`06-BILINGUAL-I18N-COPY.rule.md`](file:///d:/projetos/gustavo-portfolio/rules/06-BILINGUAL-I18N-COPY.rule.md) | 🟡 WARNING | Chaveamento reativo EN/PT sem reload, zero texto hardcoded, proibição de termos clichês. |

---

## 🛡️ Checklist de Verificação Rápida Pré-Commit (DoD)
Antes de finalizar qualquer tarefa, a IA deve validar mentalmente:
1. [ ] Há alguma cor hexadecimal inserida fora do arquivo de tokens?
2. [ ] Alguma animação está alterando `top`, `left`, `margin`, `width` ou `height`?
3. [ ] Os botões reagem visualmente no evento `pointerdown`/`:active`?
4. [ ] O componente funciona perfeitamente ao pressionar apenas a tecla `Tab`?
5. [ ] Todos os textos possuem versões completas em Inglês e Português?
