---
name: bilingual-i18n-engine
description: "Implementação de sistema reativo de internacionalização (i18n) bilíngue (EN / PT-BR) com tipagem estrita em TypeScript, zero reload de página e persistência em localStorage."
---

# Bilingual i18n Engine — Guia de Internacionalização Reativa

Esta skill ensina a construir o motor de tradução instantâneo do portfólio, garantindo alternância suave entre **Inglês** e **Português** sem recarregamento do navegador (`window.location.reload` proibido).

---

## 1. Arquitetura do Motor i18n

```
[Dicionário EN]  \
                  --> [i18n Store / Context] --> [Componente UI: t('hero.title')]
[Dicionário PT]  /            |
                              v
                      [localStorage]
```

---

## 2. Implementação em TypeScript (`i18n.ts`)

```typescript
export type SupportedLocale = 'en' | 'pt';

export interface TranslationDictionary {
  navbar: {
    about: string;
    cases: string;
    lab: string;
    experience: string;
    contact: string;
    status: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    exploreBtn: string;
    callBtn: string;
    resumeBtn: string;
  };
  contact: {
    title: string;
    subtitle: string;
    copyEmail: string;
    copied: string;
  };
}

class I18nManager {
  private currentLocale: SupportedLocale = 'en';
  private dictionaries: Record<SupportedLocale, TranslationDictionary>;
  private listeners: Set<(locale: SupportedLocale) => void> = new Set();

  constructor(dictionaries: Record<SupportedLocale, TranslationDictionary>) {
    this.dictionaries = dictionaries;
    this.initLocale();
  }

  private initLocale() {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('gustavo_portfolio_lang') as SupportedLocale;
    if (saved && (saved === 'en' || saved === 'pt')) {
      this.currentLocale = saved;
    } else {
      // Detecção inteligente pelo navegador do visitante
      const browserLang = navigator.language.toLowerCase();
      this.currentLocale = browserLang.startsWith('pt') ? 'pt' : 'en';
    }
  }

  public getLocale(): SupportedLocale {
    return this.currentLocale;
  }

  public setLocale(newLocale: SupportedLocale) {
    if (this.currentLocale === newLocale) return;

    this.currentLocale = newLocale;
    if (typeof window !== 'undefined') {
      localStorage.setItem('gustavo_portfolio_lang', newLocale);
      document.documentElement.lang = newLocale;
    }

    // Notifica todos os componentes reativos
    this.listeners.forEach((listener) => listener(newLocale));
  }

  public subscribe(callback: (locale: SupportedLocale) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  public t<T = string>(path: string): T {
    const dict = this.dictionaries[this.currentLocale];
    const keys = path.split('.');
    let current: any = dict;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        console.warn(`[i18n] Chave não encontrada: "${path}" no idioma "${this.currentLocale}"`);
        return path as unknown as T;
      }
    }

    return current as T;
  }
}

export { I18nManager };
```

---

## 3. Componente do Botão de Alternância de Idioma (Language Toggle)

```html
<button 
  type="button" 
  id="lang-toggle"
  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
  aria-label="Alternar idioma entre Inglês e Português"
>
  <span class="text-zinc-500">LANG:</span>
  <span id="current-lang" class="text-white font-bold">EN</span>
</button>
```
