import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Copy, FileText, ArrowRight, X } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { projectService } from '@/services/projectService';
import { profileService } from '@/services/profileService';
import type { ProjectData } from '@/types/project.types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { locale, toggleLocale, t } = useI18n();
  const profile = profileService.getProfile();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const navItems = [
    { label: t('navbar.about'), id: 'sobre', category: 'nav' },
    { label: t('navbar.skills'), id: 'skills', category: 'nav' },
    { label: t('navbar.experience'), id: 'trajetoria', category: 'nav' },
    { label: t('navbar.cases'), id: 'cases', category: 'nav' },
    { label: t('navbar.contact'), id: 'contato', category: 'nav' },
  ];

  const matchedProjects: ProjectData[] = query.trim()
    ? projectService.searchProjects(query, locale).slice(0, 4)
    : [];

  const actions = [
    {
      id: 'lang',
      label: t('cmd.changeLang'),
      icon: Globe,
      action: () => {
        toggleLocale();
        onClose();
      },
    },
    {
      id: 'email',
      label: t('cmd.copyEmailAction'),
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(profile.social.email);
        alert(t('contact.copied'));
        onClose();
      },
    },
    {
      id: 'cv',
      label: t('cmd.downloadCVAction'),
      icon: FileText,
      action: () => {
        const link = document.createElement('a');
        link.href = profile.social.resumePdf;
        link.download = 'curriculo-gustavo-fagundes.pdf';
        link.click();
        onClose();
      },
    },
  ];

  const filteredNav = query.trim()
    ? navItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : navItems;

  const totalItems = filteredNav.length + matchedProjects.length + actions.length;

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelectNav = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProject = (_project: ProjectData) => {
    onClose();
    const el = document.getElementById('cases');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, totalItems));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalItems) % Math.max(1, totalItems));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCurrentSelection();
    }
  };

  const executeCurrentSelection = () => {
    let current = 0;

    // Checar navegação
    for (const item of filteredNav) {
      if (current === selectedIndex) {
        handleSelectNav(item.id);
        return;
      }
      current++;
    }

    // Checar projetos
    for (const project of matchedProjects) {
      if (current === selectedIndex) {
        handleSelectProject(project);
        return;
      }
      current++;
    }

    // Checar ações
    for (const action of actions) {
      if (current === selectedIndex) {
        action.action();
        return;
      }
      current++;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-[12vh]"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Command Palette */}
      <div className="relative w-full max-w-xl rounded-2xl border border-emerald-500/25 bg-graphite-900 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden z-10 flex flex-col">
        {/* Campo de Busca */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-graphite-800">
          <Search className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={t('cmd.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm text-white placeholder:text-graphite-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded text-graphite-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lista de Resultados */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-4">
          {/* Seção de Navegação */}
          {filteredNav.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[11px] font-mono uppercase text-emerald-400/90 font-medium">
                {t('cmd.navigation')}
              </div>
              {filteredNav.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectNav(item.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      isSelected
                        ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/30'
                        : 'text-graphite-300 hover:bg-graphite-800/60 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-graphite-400" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Seção de Projetos Encontrados */}
          {matchedProjects.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[11px] font-mono uppercase text-emerald-400/90 font-medium">
                Projetos & Cases
              </div>
              {matchedProjects.map((project, idx) => {
                const itemIndex = filteredNav.length + idx;
                const isSelected = selectedIndex === itemIndex;
                return (
                  <button
                    key={project.id}
                    onClick={() => handleSelectProject(project)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      isSelected
                        ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/30'
                        : 'text-graphite-300 hover:bg-graphite-800/60 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-white font-semibold">{project.title}</div>
                      <div className="text-[11px] text-graphite-400 font-mono truncate max-w-sm">
                        {project.stack.join(' · ')}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-graphite-400" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Seção de Ações Rápidas */}
          <div>
            <div className="px-2.5 py-1 text-[11px] font-mono uppercase text-emerald-400/90 font-medium">
              {t('cmd.actions')}
            </div>
            {actions.map((act, idx) => {
              const itemIndex = filteredNav.length + matchedProjects.length + idx;
              const isSelected = selectedIndex === itemIndex;
              const Icon = act.icon;
              return (
                <button
                  key={act.id}
                  onClick={act.action}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                    isSelected
                      ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/30'
                      : 'text-graphite-300 hover:bg-graphite-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{act.label}</span>
                </button>
              );
            })}
          </div>

          {totalItems === 0 && (
            <div className="p-6 text-center text-xs text-graphite-400 font-mono">
              {t('cmd.noResults')}
            </div>
          )}
        </div>

        {/* Rodapé de Dicas de Teclado */}
        <div className="px-4 py-2 border-t border-graphite-800 bg-graphite-950/80 flex items-center justify-between text-[10px] font-mono text-graphite-400">
          <div className="flex items-center gap-3">
            <span>↑↓ para navegar</span>
            <span>↵ para selecionar</span>
            <span>ESC para fechar</span>
          </div>
          <span className="text-emerald-400 font-bold">GF Terminal</span>
        </div>
      </div>
    </div>
  );
};
