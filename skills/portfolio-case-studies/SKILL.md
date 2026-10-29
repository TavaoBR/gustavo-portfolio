---
name: portfolio-case-studies
description: "Metodologia e modelo de dados estruturado para redação e apresentação de estudos de caso de alto impacto para engenheiros full stack e design engineers."
---

# Portfolio Case Studies — Guia de Estudos de Caso de Alto Impacto

Esta skill define o padrão de narrativa, modelagem de dados e apresentação visual para os estudos de caso profissionais do portfólio de Gustavo Fagundes.

---

## 1. A Fórmula de 4 Atos para Casos de Engenharia

Para prender a atenção de CTOs e recrutadores globais, cada estudo de caso deve seguir uma estrutura objetiva:

1. **O Gancho (The Hook):** Título de impacto e métrica quantitativa destacada antes de qualquer texto corrido.
2. **O Desafio Real (The Challenge):** Qual era o problema complexo de negócio ou infraestrutura (ex: concorrência de webhooks, 11 sistemas hospitalares desconectados, gargalos de rede).
3. **Decisões de Arquitetura & Código (Engineering Decisions):** Decisões técnicas com justificativa (por que Redis para idempotência? por que Clean Architecture em .NET 8? por que MinIO desacoplado?).
4. **Métricas de Impacto Comprovadas (Proven Results):** Números reais extraídos do currículo (+1M transações, 0 inconsistências, 60% de redução no tempo de atendimento).

---

## 2. Modelo de Dados TypeScript (`case-study.types.ts`)

```typescript
export interface CaseStudyMetric {
  value: string;
  label: { en: string; pt: string };
  highlight?: boolean;
}

export interface CaseStudy {
  id: string;
  slug: string;
  company: string;
  role: { en: string; pt: string };
  period: string;
  badge: { en: string; pt: string };
  title: { en: string; pt: string };
  description: { en: string; pt: string };
  metrics: CaseStudyMetric[];
  challenge: { en: string; pt: string };
  solution: { en: string; pt: string };
  stack: string[];
  links?: {
    github?: string;
    live?: string;
  };
  featured: boolean;
}
```

---

## 3. Catálogo Pré-Estruturado dos Casos Reais de Gustavo

### Caso 1: del.tech — Motor Financeiro & Processamento PIX
* **Métrica Principal:** `+1.000.000` transações PIX processadas.
* **Stack:** Symfony, Node.js, Redis, PostgreSQL, MySQL, Docker, GitHub Actions.
* **Ponto Forte:** Processamento assíncrono com Redis garantindo entrega confiável e idempotência de eventos críticos de webhooks (Mercado Pago e Delfinance).

### Caso 2: Hospital Amparo de Maria — Workspace Corporativa de Saúde
* **Métrica Principal:** `11` sistemas integrados unificados.
* **Stack:** PHP, JavaScript, MySQL, Docker, Linux, Nginx, CDN.
* **Ponto Forte:** Liderança técnica de portal institucional e automação completa que eliminou tramitações manuais de papel entre setores.

### Caso 3: Glow Up Connect — SaaS de Agendamentos
* **Stack:** C# / ASP.NET Core .NET 8, Clean Architecture, Vue.js 3, Pinia, Tailwind CSS, Docker, Railway, xUnit.
* **Ponto Forte:** Arquitetura desacoplada em camadas, autenticação JWT com refresh token e suíte de testes unitários.

### Caso 4: MayLove — Plataforma de Homenagens & Storage
* **Stack:** Symfony 7, API Platform, PostgreSQL, MinIO, Vue 3.
* **Ponto Forte:** Microsserviço de armazenamento de objetos isolado com MinIO, gerando URLs assinadas temporárias com expiração para proteger a mídia dos usuários.
