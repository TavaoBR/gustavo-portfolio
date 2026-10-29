# R-05: Clean Code, TypeScript Estrito & Arquitetura (`05-CLEAN-CODE-TYPESCRIPT.rule.md`)

> **Severidade:** 🔴 BLOCKER (Violação bloqueia aprovação de código)  
> **Referência:** Práticas de Engenharia Sênior & Clean Architecture

---

## 1. Princípio Fundamental
O código-fonte do portfólio é um espelho da maturidade técnica do desenvolvedor. Ele será inspecionado por recrutadores técnicos e CTOs via repositório público no GitHub. Portanto, deve exibir tipagem estrita, modularidade cristalina, documentação concisa e zero práticas amadoras.

---

## 2. Regras Estritas de TypeScript

### 2.1 Proibição de Tipagem Frouxa
* ❌ **PROIBIDO:** Usar `any` em qualquer parte da base de código. Se o tipo for genuinamente desconhecido, utilizar `unknown` com validação de tipo (*type narrowing / type guards*).
* ❌ **PROIBIDO:** Fazer asserções de tipo inseguras via `as` sem validação prévia.
* ✅ **OBRIGATÓRIO:** Todas as interfaces de dados de estudos de caso, propriedades de componentes (Props), estados e retornos de funções devem ser formalmente tipados:
  ```typescript
  // ✅ Exemplo de tipagem formal para um Caso de Estudo
  export interface CaseStudy {
    id: string;
    slug: string;
    title: Record<'en' | 'pt', string>;
    subtitle: Record<'en' | 'pt', string>;
    metrics: Array<{
      value: string;
      label: Record<'en' | 'pt', string>;
    }>;
    stack: string[];
    featured: boolean;
  }
  ```

---

## 3. Modularidade & Responsabilidade Única (SRP)

* **Limite de Linhas por Arquivo:** Componentes não devem ultrapassar 250 linhas. Quando uma seção começar a crescer, seus sub-elementos (ex: cards individuais, badges, controles de slider) devem ser extraídos para arquivos dedicados.
* **Separação de UI e Lógica:** Componentes visuais devem focar exclusivamente na renderização e estados de interação. Cálculos de física, chamadas de API e manipulação de `localStorage` devem residir em hooks, composables ou funções utilitárias puras.

---

## 4. Tratamento de Erros & Higiene de Código

* **Tratamento de Exceções:** Toda operação assíncrona (`fetch`, chamadas de API, leitura de `localStorage`) deve conter tratamento defensivo via `try/catch` com fallback gracioso.
* **Limpeza de Logs:** Proibido deixar chamadas a `console.log()` ou `debugger` em código comitado.
* **Zero Código Morto:** Não manter blocos de código comentados ou importações não utilizadas.

---

## 5. Exemplo de Código Aprovado vs. Rejeitado

```typescript
// ❌ REJEITADO (Uso de any, código não-defensivo, console.log)
function handleContactSubmit(data: any) {
  console.log("Enviando dados...", data);
  fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

// ✅ APROVADO (Tipagem estrita com DTO, try/catch, feedback tipado)
import type { ContactFormData } from "@/types/contact";

async function handleContactSubmit(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro no servidor: ${response.statusText}`);
    }

    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Falha inesperada no envio";
    return { success: false, error: errorMessage };
  }
}
```
