# 04. Estudos de Caso & Catálogo de Projetos de Alto Impacto

Este documento detalha os projetos reais e marcos da carreira de **Gustavo de Oliveira Fagundes**, estruturados na fórmula consagrada de estudos de caso para recrutadores e clientes internacionais: **Contexto & Desafio**, **Decisões de Engenharia & Arquitetura**, **Execução de UI/UX** e **Resultados & Métricas**.

---

## Estudo de Caso 01: del.tech — Motor Financeiro & Processamento Massivo de PIX

### 1. Visão Geral
* **Função:** Desenvolvedor Full Stack IV (Promovido em dez/2025)
* **Período:** jul/2025 – mai/2026
* **Stack Principal:** PHP 8, Symfony, Node.js, Vue.js, PostgreSQL, MySQL, Redis, Docker, GitHub Actions

### 2. O Desafio de Engenharia
A del.tech opera plataformas financeiras e SaaS multi-tenant que demandam alta confiabilidade na liquidação de recebíveis, conciliação bancária automatizada e processamento contínuo de pagamentos instantâneos (PIX), boletos e esteiras de crédito com Mercado Pago e Delfinance. O gargalo clássico residia na concorrência de webhooks duplicados e na latência de sincronização com bancos legados.

### 3. Decisões de Arquitetura & Implementação
* **Idempotência & Filas com Redis:** Implementação de chaveamento de idempotência distribuída no Redis para garantir que notificações de webhooks duplicadas fossem tratadas de forma atômica e segura.
* **Arquitetura em Camadas (SOLID):** Estruturação do backend em Symfony com *Service Layer*, *Repository Pattern*, Data Transfer Objects (DTOs) estritos e isolamento de regras de negócio.
* **Pipelines & Infraestrutura:** Automação de deploy em containers Docker via GitHub Actions, com testes automatizados pré-merge.

### 4. Impacto & Métricas Comprovadas
* **+1.000.000 de transações PIX processadas** com integridade transacional absoluta.
* Eliminação de perdas financeiras por eventos concorrentes de webhook.
* Automação de 100% da rotina de conciliação diária de crédito e boletos.

---

## Estudo de Caso 02: Hospital Amparo de Maria — Workspace Integrada de Saúde (11 Sistemas)

### 1. Visão Geral
* **Função:** Desenvolvedor Full Stack / Líder Técnico
* **Período:** abr/2021 – fev/2024
* **Stack Principal:** PHP, JavaScript, MySQL, Docker, Linux, Nginx, CDN

### 2. O Desafio Institucional
Uma das maiores instituições filantrópicas de saúde da região enfrentava séria lentidão operacional causada por sistemas dispersos, fichas físicas em papel e falta de rastreabilidade em ordens de serviço, manutenção predial e calibração de equipamentos médicos vitais.

### 3. Decisões de Arquitetura & Liderança
* **Workspace Unificada:** Projeto e desenvolvimento de um ecossistema centralizado integrando **11 sistemas corporativos**:
  1. Portal Institucional com CDN
  2. Gestão de Equipamentos Médicos e Calibração
  3. Sistema de Chamados de TI
  4. Manutenção Predial e Predisposição Técnica
  5. Gestão de Contratos e Fornecedores
  6. Ouvidoria e Canal de Compliance
  7. Notificação e Gestão de Incidentes
  8. Módulos Internos de Apoio Clínico e Operacional
* **Controle de Acesso Granular (RBAC):** Sistema central de permissões baseado em papéis clínicos e administrativos, garantindo segurança de dados sensíveis.
* **Estratégia de Cache & Edge:** Implementação de CDN e cache reverso com Nginx, reduzindo drasticamente o consumo de banda e o tempo de carregamento para equipes médicas em prontidão.

### 4. Impacto & Métricas
* **11 sistemas integrados** em um ponto de entrada único para centenas de colaboradores.
* Eliminação total de tramitações manuais de papel entre setores operacionais e administrativos.
* Redução de mais de 60% no tempo médio de resposta para manutenção de equipamentos críticos.

---

## Estudo de Caso 03: Glow Up Connect — SaaS de Agendamentos & Gestão

### 1. Visão Geral
* **Função:** Arquiteto de Software & Engenheiro Full Stack
* **Stack:** C# / ASP.NET Core .NET 8, Clean Architecture, Entity Framework Core, Vue.js 3, TypeScript, Pinia, Tailwind CSS, Docker, Railway, xUnit, Moq
* **Repositórios:** `github.com/Start-up-2-0/glow-up-connect-api` e `glow-up-connect-app`

### 2. Decisões de Engenharia
* **Clean Architecture & DDD:** Separação estrita de camadas (*Domain, Application, Infrastructure, Presentation*), mantendo as regras de negócio livres de acoplamento a frameworks.
* **Autenticação Avançada:** Mecanismo JWT com tokens de curta duração e *Refresh Tokens* persistidos com rotação segura.
* **Testes Automatizados:** Suíte de testes unitários e de integração utilizando xUnit, Moq e FluentAssertions para garantir estabilidade contínua.
* **Interface Fluida no Frontend:** SPA em Vue 3 + TypeScript utilizando Tailwind CSS e Pinia para gerenciamento de estado de agendamentos em tempo real.

---

## Estudo de Caso 04: MayLove — Plataforma de Homenagens & Storage Distribuído

### 1. Visão Geral
* **Função:** Arquiteto & Engenheiro Full Stack
* **Stack:** PHP 8, Symfony 7, API Platform, PostgreSQL, MinIO (Object Storage), Vue.js 3, Vite, Tailwind CSS
* **Repositórios:** `github.com/Start-up-2-0/maylove-api`, `maylove-app`, `maylove-storages`

### 2. Decisões de Engenharia
* **Serviço de Mídia Independente (MinIO):** Para suportar grande volume de fotografias e vídeos em alta resolução sem sobrecarregar a API principal, foi arquitetado um microsserviço de armazenamento desacoplado.
* **Segurança por URLs Pré-assinadas:** Arquivos privados geram URLs temporárias assinadas com tempo de expiração curto, impedindo acessos não autorizados e preservando a largura de banda da aplicação.
* **API Platform & Doctrine:** Modelagem relacional em PostgreSQL com documentação OpenAPI/Swagger gerada em tempo real e serialização otimizada.

---

## Estudo de Caso 05: Atuação Internacional — FINolution (Suíça) & UP3 Group (EUA)

### 1. Visão Geral
* **FINolution (Suíça):** Desenvolvimento de microsserviços para gateways de pagamento internacionais em ecossistema moderno com **Next.js, React e Supabase/PostgreSQL**. Otimização de consultas analíticas e diagnóstico de gargalos de rede.
* **UP3 Group / Avail Holding (EUA):** Atuação em paralelo desenvolvendo rotinas de backend de alto tráfego em **PHP/Laravel**, ambientes Docker padronizados e pipelines CI/CD com GitLab para o mercado norte-americano.

---

## Estudo de Caso 06: Integração Mercado Pago API (Open Source)

* **Objetivo:** Facilitar a vida de desenvolvedores que integram meios de pagamento em ecossistemas PHP/Symfony.
* **Diferenciais:** Abstração completa de rotinas de checkout, emissão de boletos, geração de chaves PIX e tratamento simplificado de listeners de webhooks com verificação criptográfica de assinatura.
* **Repositório:** `github.com/TavaoBR/integracao-mercado-pago-api`
