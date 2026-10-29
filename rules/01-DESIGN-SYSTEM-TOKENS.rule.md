# R-01: Uso Obrigatório de Design Tokens & Paleta Obsidian (`01-DESIGN-SYSTEM-TOKENS.rule.md`)

> **Severidade:** 🔴 BLOCKER (Violação bloqueia aprovação de código)  
> **Referência:** [`docs/03-DESIGN-SYSTEM-OBSIDIAN-ICE.md`](file:///d:/projetos/gustavo-portfolio/docs/03-DESIGN-SYSTEM-OBSIDIAN-ICE.md)

---

## 1. Princípio Fundamental
Nenhum valor bruto de cor, espaçamento, sombra ou raio de borda pode existir isolado em arquivos de componentes (`.tsx`, `.vue`, `.html` ou `.css` local). Todo estilo visual deve consumir exclusivamente os tokens do Design System.

---

## 2. Regras de Cores & Superfícies (Pure Obsidian & Ice White)

### 2.1 Cores Proibidas e Permitidas
* ❌ **PROIBIDO:** Usar cores hexadecimais soltas no código (ex: `color: #fff`, `background: #111`, `border: 1px solid #333`).
* ❌ **PROIBIDO:** Adicionar cores neon, gradientes chamativos em roxo/azul saturado ou botões coloridos que descaracterizem a elegância minimalista da paleta Obsidian.
* ✅ **OBRIGATÓRIO:** Consumir variáveis semânticas:
  ```css
  /* Correto */
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  ```

### 2.2 Camadas de Elevação (Elevation Hierarchy)
1. **Fundo Base da Página:** `var(--bg-canvas)` (`#000000` / `#050505`).
2. **Cards do Bento Grid e Seções:** `var(--bg-card)` (`#0A0A0A`) com borda `var(--border-subtle)` (`rgba(255, 255, 255, 0.08)`).
3. **Navbar Flutuante & Modais:** `var(--bg-glass)` com `backdrop-filter: blur(16px)` e borda superior `rgba(255, 255, 255, 0.12)`.
4. **Status Dot:** A única exceção cromática permitida é o indicador de disponibilidade verde esmeralda `var(--status-available)` (`#10B981`) com glow sutil.

---

## 3. Escala de Raio de Borda (Border Radius)

| Token Semântico | Valor | Uso Exclusivo |
| :--- | :--- | :--- |
| `--radius-sm` | `6px` | Badges compactas, tags de stack técnica, tooltips. |
| `--radius-md` | `10px` | Inputs de formulário, botões secundários, dropdown items. |
| `--radius-lg` | `16px` | Botões primários grandes, modais compactos. |
| `--radius-xl` | `20px` | Cards do Bento Grid e containers de estudos de caso. |
| `--radius-full`| `9999px` | Badges de status (pills), avatares circulares e toggles. |

---

## 4. Escala de Tipografia & Pareamento

* **Fontes:**
  * Interface e Títulos: `Geist Sans`, `Inter` ou `Plus Jakarta Sans`.
  * Códigos, Números Métricos e Terminal: `Geist Mono` ou `JetBrains Mono`.
* **Tracking Óptico Obrigatório:**
  * Títulos Display (H1, H2): Obrigatório `letter-spacing: -0.025em` ou `-0.035em` para manter o visual editorial compacto.
  * Overlines e Tags em Maiúsculas: Obrigatório `letter-spacing: +0.08em` e `text-transform: uppercase`.

---

## 5. Exemplo de Código Aprovado vs. Rejeitado

```css
/* ❌ REJEITADO (Cores hardcoded, borda fora do padrão) */
.card {
  background-color: #121212;
  color: #ffffff;
  border: 1px solid gray;
  border-radius: 15px;
}

/* ✅ APROVADO (Consumo estrito de tokens semânticos) */
.card {
  background-color: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(12px);
  transition: border-color var(--duration-fast) var(--spring-fluid);
}
```
