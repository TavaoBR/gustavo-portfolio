---
name: bento-grid-architect
description: "Como projetar e implementar Bento Grids assimétricos modernos no padrão Dribbble para portfólios de desenvolvedores, combinando blocos modulares, responsividade e estética Obsidian."
---

# Bento Grid Architect — Guia de Implementação de Grades Modulares

Esta skill orienta a construção de **Bento Grids assimétricos de alta densidade informativa**, o padrão visual dominante no Dribbble para portfólios de engenheiros e designers.

---

## 1. Arquitetura da Grade (Grid Blueprint)

O layout base adota um sistema de **4 colunas no Desktop**, reduzindo elegantemente para **2 colunas no Tablet** e **1 coluna no Mobile**:

```css
/* Container Principal do Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.25rem; /* 20px */
  max-width: 72rem; /* 1152px */
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
}
```

---

## 2. Arquetipos de Cards do Bento Grid

### 2.1 Card de Escala & Métricas (2x2 — Destaque de Impacto)
Ocupa 2 colunas e 2 linhas no desktop. Deve abrigar o maior destaque quantitativo de Gustavo (+1.000.000 de transações PIX na del.tech).
```html
<div class="bento-card col-span-1 md:col-span-2 md:row-span-2 p-8 flex flex-col justify-between">
  <div>
    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-white/80 mb-6">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      Alta Concorrência em Produção
    </span>
    <h3 class="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
      +1.000.000
    </h3>
    <p class="text-base text-zinc-400 max-w-md leading-relaxed">
      Transações financeiras PIX processadas com conciliação automatizada, processamento assíncrono via Redis e garantia estrita de idempotência.
    </p>
  </div>
  <div class="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
    <span>del.tech · Full Stack IV</span>
    <span>Symfony + Node.js + Redis</span>
  </div>
</div>
```

### 2.2 Card de Stack Tecnológica (2x1 — Categorias Interativas)
Ocupa 2 colunas e 1 linha. Exibe agrupamentos de tecnologias com badges interativos:
```html
<div class="bento-card col-span-1 md:col-span-2 p-6 flex flex-col justify-between">
  <div class="flex items-center justify-between mb-4">
    <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500">Core Tech Stack</h4>
    <span class="text-xs text-zinc-600">Hover para iluminar</span>
  </div>
  <div class="flex flex-wrap gap-2">
    <span class="tech-badge">PHP 8 (Symfony/Laravel)</span>
    <span class="tech-badge">C# (.NET 8)</span>
    <span class="tech-badge">Node.js</span>
    <span class="tech-badge">Vue.js 3</span>
    <span class="tech-badge">React / Next.js</span>
    <span class="tech-badge">TypeScript</span>
    <span class="tech-badge">PostgreSQL & Redis</span>
    <span class="tech-badge">Docker & CI/CD</span>
  </div>
</div>
```

### 2.3 Card de Fuso Horário & Localização (1x1 — Widget Tátil)
Ocupa 1 coluna e 1 linha. Exibe o relógio dinâmico de Aracaju, SE (GMT-3) e o status de disponibilidade:
```html
<div class="bento-card col-span-1 p-6 flex flex-col justify-between">
  <div class="text-xs font-mono uppercase tracking-wider text-zinc-500">Fuso Horário Local</div>
  <div class="my-3">
    <div class="text-2xl font-mono font-bold text-white" id="live-clock">--:--:--</div>
    <div class="text-xs text-zinc-400 mt-1">Aracaju, Brasil · UTC-3</div>
  </div>
  <div class="text-xs text-emerald-400 font-medium">Disponível para Remoto Global</div>
</div>
```

### 2.4 Card de Terminal Snippet (1x1 — Código Limpo)
Ocupa 1 coluna e 1 linha. Mini console simulando execução de testes unitários ou build bem-sucedido:
```html
<div class="bento-card col-span-1 p-6 flex flex-col justify-between font-mono text-xs bg-black/60">
  <div class="flex items-center gap-1.5 pb-3 border-b border-white/5">
    <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
    <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
    <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
    <span class="text-[10px] text-zinc-600 ml-2">tests.sh</span>
  </div>
  <div class="py-2 text-zinc-400 leading-relaxed">
    <span class="text-emerald-400">✓</span> xUnit: 48 passed<br/>
    <span class="text-emerald-400">✓</span> PHPUnit: 112 passed<br/>
    <span class="text-emerald-400">✓</span> Vitest: 64 passed
  </div>
  <div class="text-[11px] text-zinc-500">Cobertura: 94.8%</div>
</div>
```

---

## 3. Estilização dos Cards (Obsidian Standard)

```css
.bento-card {
  position: relative;
  background-color: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: transform var(--duration-fast) var(--spring-fluid),
              border-color var(--duration-fast) var(--spring-fluid);
}

.bento-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-hover);
}

.tech-badge {
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-sm);
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--duration-instant) ease;
}

.tech-badge:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.25);
}
```
