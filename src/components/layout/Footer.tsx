import React from 'react';
import { ArrowUp, Mail, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { useI18n } from '@/hooks/useI18n';
import { profileService } from '@/services/profileService';

export const Footer: React.FC = () => {
  const { t } = useI18n();
  const profile = profileService.getProfile();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-graphite-800/80 bg-graphite-950/90 pt-16 pb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Identificação */}
        <div className="flex flex-col gap-2 max-w-md">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs text-emerald-400">
              GF
            </div>
            <span className="font-semibold text-sm text-white">Gustavo Fagundes</span>
          </div>
          <p className="text-xs text-graphite-300 leading-relaxed">
            {t('footer.tagline')}
          </p>
          <div className="text-[11px] font-mono text-graphite-400 mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Aracaju, SE — Brasil · Fuso UTC-3</span>
          </div>
        </div>

        {/* Links Sociais e Back to Top */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-graphite-700/60 bg-graphite-900/80 text-xs text-graphite-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
            aria-label="Abrir perfil no GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-graphite-700/60 bg-graphite-900/80 text-xs text-graphite-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
            aria-label="Abrir perfil no LinkedIn"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${profile.social.email}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-graphite-700/60 bg-graphite-900/80 text-xs text-graphite-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
            aria-label="Enviar e-mail para Gustavo Fagundes"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>E-mail</span>
          </a>

          <a
            href={profile.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-graphite-700/60 bg-graphite-900/80 text-xs text-graphite-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
            aria-label="Conversar no WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-700/50 bg-emerald-950/40 text-xs font-mono text-emerald-300 hover:bg-emerald-900/60 hover:text-white transition-colors tap-feedback ml-auto md:ml-2 font-medium"
            aria-label="Voltar ao topo da página"
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto mt-12 pt-6 border-t border-graphite-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-graphite-400 gap-2">
        <div>
          © {new Date().getFullYear()} Gustavo de Oliveira Fagundes. {t('footer.rights')}
        </div>
        <div>
          React 19 + TypeScript + Tailwind CSS · Emerald Identity
        </div>
      </div>
    </footer>
  );
};
