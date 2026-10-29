import React, { useState, useEffect } from 'react';
import { Search, Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/utils/cn';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { locale, toggleLocale, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'sobre', label: t('navbar.about') },
    { id: 'skills', label: t('navbar.skills') },
    { id: 'trajetoria', label: t('navbar.experience') },
    { id: 'cases', label: t('navbar.cases') },
    { id: 'contato', label: t('navbar.contact') },
  ];

  const activeId = useScrollSpy(
    navItems.map((item) => item.id),
    120
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 pointer-events-none">
      <nav
        role="navigation"
        aria-label="Navegação principal"
        className={cn(
          'max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto flex items-center justify-between pointer-events-auto rounded-2xl px-5 py-3 transition-all duration-300 border',
          isScrolled
            ? 'bg-obsidian-900/85 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'bg-obsidian-900/40 backdrop-blur-md border-white/5'
        )}
      >
        {/* Logo Pessoal com Foto */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Gustavo Fagundes — Início"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-zinc-900 shadow-sm shrink-0">
            <img
              src="/avatar.jpg"
              alt="Gustavo Fagundes"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold tracking-tight text-white leading-tight">
              Gustavo Fagundes
            </span>
            <span className="text-[10px] text-zinc-400 font-mono leading-none">
              Full Stack · PHP · Vue.js · .NET
            </span>
          </div>
        </a>

        {/* Links Centrais (Desktop) */}
        <div className="hidden md:flex items-center gap-1.5 bg-graphite-900/60 border border-emerald-500/15 rounded-xl px-2.5 py-1">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all tap-feedback',
                  isActive
                    ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Ações à Direita: Status, Busca, Lang, CTA */}
        <div className="flex items-center gap-2.5">
          {/* Status Badge Pulsante (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-300 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>{t('navbar.status')}</span>
          </div>

          {/* Trigger de Busca Cmd+K */}
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-xs text-zinc-300 hover:text-white transition-colors tap-feedback"
            aria-label="Abrir barra de busca (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline font-mono text-[10px] text-zinc-500 bg-white/5 px-1 rounded border border-white/5">
              ⌘K
            </span>
          </button>

          {/* Seletor de Idioma Bilíngue Instantâneo */}
          <button
            onClick={toggleLocale}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono font-semibold text-white transition-colors tap-feedback"
            aria-label={`Mudar idioma. Idioma atual: ${locale.toUpperCase()}`}
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {/* CTA Principal de Contato */}
          <button
            onClick={() => scrollTo('contato')}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 text-graphite-950 font-bold text-xs hover:bg-emerald-400 active:bg-emerald-600 transition-all shadow-md shadow-emerald-950/40 border border-emerald-400/40 tap-feedback"
          >
            <span>{t('navbar.contact')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Botão Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            type="button"
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Abrir menu de navegação móvel"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile Suspenso */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto mt-2 pointer-events-auto rounded-2xl bg-obsidian-900/95 border border-white/15 p-4 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex items-center justify-between w-full p-2.5 text-left text-sm font-medium rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-zinc-600 font-mono text-xs">#</span>
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">Disponibilidade:</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t('navbar.status')}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
