import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import translationsData from '@/data/translations.json';
import type { Locale, TranslationDictionary } from '@/types/i18n.types';
import { storageService } from '@/services/storageService';

const LANG_KEY = 'gustavo_portfolio_lang';

interface I18nContextType {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  toggleLocale: () => void;
  t: (path: string) => string;
}

const typedTranslations = translationsData as Record<Locale, TranslationDictionary>;

export const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function useI18nProvider(): I18nContextType {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = storageService.getItem<Locale | null>(LANG_KEY, null);
    if (saved === 'en' || saved === 'pt') return saved;
    const browser = navigator.language?.toLowerCase() ?? '';
    return browser.startsWith('pt') ? 'pt' : 'en';
  });

  useEffect(() => {
    storageService.setItem(LANG_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'pt' : 'en'));
  }, []);

  const t = useCallback(
    (path: string): string => {
      const dict = typedTranslations[locale];
      const keys = path.split('.');
      let current: any = dict;

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return path;
        }
      }

      return typeof current === 'string' ? current : path;
    },
    [locale]
  );

  return { locale, setLocale, toggleLocale, t };
}
