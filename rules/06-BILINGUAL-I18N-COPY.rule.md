# R-06: Internacionalização Fluida & Tom de Voz (`06-BILINGUAL-I18N-COPY.rule.md`)

> **Severidade:** 🟡 WARNING (Exige paridade total e ausência de texto hardcoded)  
> **Referência:** [`docs/07-GUIA-COPYWRITING-CONTEUDO.md`](file:///d:/projetos/gustavo-portfolio/docs/07-GUIA-COPYWRITING-CONTEUDO.md)

---

## 1. Princípio Fundamental
Como o portfólio visa tanto clientes e empresas internacionais (EUA, Suíça e Europa) quanto o mercado de tecnologia no Brasil, todo conteúdo deve ser concebido desde o primeiro momento com suporte nativo e fluido a dois idiomas: **Inglês (padrão)** e **Português**. Textos soltos no meio do código ou traduções incompletas são inaceitáveis.

---

## 2. Regras de Internacionalização (i18n)

### 2.1 Proibição de Strings Hardcoded
* ❌ **PROIBIDO:** Inserir frases de interface, títulos ou descrições diretamente no JSX/HTML (ex: `<h1>Meus Projetos</h1>` ou `<button>Send Message</button>`).
* ❌ Exceção permitida: Nomes próprios de tecnologias e marcas registradas (ex: `Symfony`, `Vue.js`, `Docker`, `Redis`, `.NET 8`, `PostgreSQL`).
* ✅ **OBRIGATÓRIO:** Consumir textos através do dicionário semântico estruturado em `content/` ou `locales/`:
  ```typescript
  // ✅ Exemplo correto de consumo
  <h1>{t('hero.title')}</h1>
  <p>{t('hero.subtitle')}</p>
  ```

### 2.2 Paridade Absoluta entre Idiomas
* Toda chave criada no arquivo de idioma em inglês (`en.json` ou `en.ts`) **deve existir obrigatoriamente** no arquivo de português (`pt.json` ou `pt.ts`).
* Se uma chave estiver faltando em qualquer idioma, a suíte de testes de QA deve falhar a compilação.

### 2.3 Alternância Sem Reload (Zero Page Refresh)
* A troca de idioma deve ser reativa e instantânea.
* É **estritamente vetado** o uso de `window.location.reload()` para recarregar a página ao mudar a linguagem.
* A escolha do usuário deve ser salva no `localStorage` com a chave `gustavo_portfolio_lang`.

---

## 3. Diretrizes de Tom de Voz & Anti-Clichê

### 3.1 Termos Proibidos
* ❌ "Apaixonado por criar soluções inovadoras"
* ❌ "Desenvolvedor focado em aprender novas tecnologias"
* ❌ "Ninja do código", "Rockstar developer" ou "Mago do backend"

### 3.2 Vocabulário Autorizado & Recomendado
* ✅ "Engenharia de alta escala com +1M de transações processadas"
* ✅ "Liderança técnica e unificação de 11 sistemas corporativos"
* ✅ "Clean Architecture, Domain-Driven Design (DDD) e idempotência distribuída"
* ✅ "Interfaces fluidas com física de molas e renderização 60fps"

---

## 4. Exemplo de Código Aprovado vs. Rejeitado

```typescript
// ❌ REJEITADO (Texto hardcoded em português, sem suporte a EN)
export function HeroCTA() {
  return (
    <button className="btn-primary">
      Falar Comigo no WhatsApp
    </button>
  );
}

// ✅ APROVADO (Consumo do sistema i18n tipado com dicionário bilíngue)
import { useTranslation } from '@/hooks/useTranslation';

export function HeroCTA() {
  const { t } = useTranslation();
  
  return (
    <button 
      type="button" 
      className="btn-primary"
      aria-label={t('contact.ctaAria')}
    >
      {t('contact.ctaButton')}
    </button>
  );
}
```
