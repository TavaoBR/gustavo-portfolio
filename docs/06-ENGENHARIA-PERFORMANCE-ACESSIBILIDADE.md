# 06. Engenharia, Performance, Acessibilidade & SEO

## 1. Orçamento de Performance (Performance Budget)

Para atender ao rigor de engenharia de software sênior, o portfólio deve cumprir metas auditáveis no Google Lighthouse e Web Vitals:

| Indicador | Meta Estrita | Mecanismo de Garantia |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 1.2s` | Pré-carregamento de fontes críticas, ausência de imagens pesadas no Hero, CSS crítico inline. |
| **INP (Interaction to Next Paint)** | `< 50ms` | Zero trabalho síncrono pesado na thread principal no clique; processamento via microtarefas. |
| **CLS (Cumulative Layout Shift)** | `0.00` | Dimensões de containers reservadas com proporção explícita (`aspect-ratio` e min-heights fixos). |
| **Taxa de Quadros (Frame Rate)** | `60fps / 120fps` | Animações restritas estritamente a propriedades de composição da GPU (`transform` e `opacity`). |

### 1.1 Regra de Ouro do Pipeline de Renderização
Conforme a skill `animation-performance`:
* **Proibido animar:** `top`, `left`, `margin`, `padding`, `width`, `height`, `border-width`. Estas propriedades forçam *Layout Reflow* e derrubam a taxa de quadros.
* **Permitido animar:** `transform: translate3d()`, `transform: scale()`, `opacity`.
* **Uso consciente de `will-change`:** Aplicar `will-change: transform` apenas em elementos sob interação ativa (ex: card arrastável do Lab) e remover ao repouso para economizar memória VRAM.

---

## 2. Acessibilidade (WCAG 2.1 Nível AA)

A estética escura não pode comprometer a usabilidade de pessoas com baixa visão, deficiências motoras ou sensibilidade a movimento.

### 2.1 Relação de Contraste (Color Contrast)
* **Texto Primário:** `#FFFFFF` sobre fundo `#000000` / `#050505` resulta em contraste de **21:1** (superior ao requisito de 7:1 AAA).
* **Texto Secundário / Corpo:** `#E2E8F0` sobre `#0A0A0A` resulta em contraste de **13.5:1** (nível AAA).
* **Texto Mudo / Metadados:** `#94A3B8` sobre `#0A0A0A` resulta em contraste de **7.8:1** (nível AAA).

### 2.2 Foco Visível & Navegação por Teclado
* Todos os links, botões e controles recebem indicador de foco nítido e elegante:
  ```css
  :focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.9);
    outline-offset: 3px;
    border-radius: 6px;
  }
  ```
* Atalho de salto inicial: `<a href="#conteudo-principal" class="sr-only focus:not-sr-only">Pular para o conteúdo principal</a>`.

### 2.3 Respeito a `prefers-reduced-motion`
Usuários com distúrbios vestibulares que ativam a preferência de movimento reduzido no sistema operacional terão todas as molas e transições dinâmicas desativadas:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 3. SEO Técnico & Metadados Estruturados (Rich Snippets)

### 3.1 Schema.org (JSON-LD)
A página inclui dados estruturados para que os motores de busca e o Google Knowledge Graph reconheçam formalmente o perfil profissional:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gustavo de Oliveira Fagundes",
  "url": "https://gustavofagundes.dev",
  "jobTitle": "Full Stack Engineer & Design Engineer",
  "sameAs": [
    "https://github.com/TavaoBR",
    "https://linkedin.com/in/gustavofagundes-dev"
  ],
  "knowsAbout": [
    "Full Stack Development",
    "Symfony",
    "Laravel",
    "ASP.NET Core",
    "Vue.js",
    "React",
    "TypeScript",
    "Clean Architecture",
    "Financial Systems"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Aracaju",
    "addressRegion": "SE",
    "addressCountry": "BR"
  }
}
</script>
```

### 3.2 Open Graph & Twitter Cards (Banner Design)
* **og:title:** `Gustavo Fagundes — Full Stack & Design Engineer`
* **og:description:** `Engenharia de sistemas de alta escala (+1M transações PIX) e interfaces fluidas de padrão mundial.`
* **og:image:** Banner em formato 1200x630px com fundo Obsidian, tipografia de alto impacto, monograma GF em destaque e badge de disponibilidade.
