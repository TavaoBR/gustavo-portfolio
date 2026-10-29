import React, { useState, useEffect } from 'react';
import { Award, Clock, Cpu, FileCheck2, Globe2, Layers, MapPin, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { formatTimeInTimezone } from '@/utils/formatters';

export const BentoSection: React.FC = () => {
  const { locale, t } = useI18n();
  const [liveTime, setLiveTime] = useState(formatTimeInTimezone('America/Maceio'));

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(formatTimeInTimezone('America/Maceio'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="sobre" className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-graphite-800/80 relative">
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto">
        {/* Cabeçalho Editorial */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-8 border-b border-graphite-800/80 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
              {t('bento.badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
              {t('bento.heading')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-graphite-400 font-mono max-w-md sm:text-right">
            {t('bento.subheading')}
          </p>
        </div>

        {/* Layout Editorial em 2 Colunas Amplas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Coluna da Esquerda: Narrativa Biográfica & Informações Operacionais (7 Colunas) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Texto de Perfil */}
            <div className="space-y-5 text-graphite-200">
              <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                {t('bento.bioLead')}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-graphite-300 font-normal">
                {t('bento.bioP1')}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-graphite-300 font-normal">
                {t('bento.bioP2')}
              </p>
            </div>

            {/* Painel Operacional: Fuso, Localização e Atuação */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-graphite-800/80">
              {/* Box 1: Fuso Horário & Localização */}
              <div className="p-5 rounded-2xl bg-graphite-900/80 border border-emerald-500/15 hover:border-emerald-500/35 transition-all shadow-sm space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-graphite-400">
                  <span className="flex items-center gap-1.5 text-graphite-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    Aracaju, SE · Brasil
                  </span>
                  <Clock className="w-3.5 h-3.5 text-graphite-400" />
                </div>
                <div className="text-2xl font-mono font-bold text-white tracking-wider">
                  {liveTime}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t('bento.clockStatus')}</span>
                </div>
              </div>

              {/* Box 2: Experiência Global & Idiomas */}
              <div className="p-5 rounded-2xl bg-graphite-900/80 border border-emerald-500/15 hover:border-emerald-500/35 transition-all shadow-sm space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-graphite-400">
                  <span className="flex items-center gap-1.5 text-graphite-200 font-medium">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                    {locale === 'pt' ? 'Atuação Internacional' : 'Global Scope'}
                  </span>
                  <Terminal className="w-3.5 h-3.5 text-graphite-400" />
                </div>
                <div className="text-base font-bold text-white pt-1">
                  {locale === 'pt' ? 'EUA · Suíça · Brasil' : 'USA · Switzerland · Brazil'}
                </div>
                <div className="text-[11px] font-mono text-graphite-400">
                  {locale === 'pt' ? 'Inglês Técnico para Leitura & Escrita' : 'Technical English for Specs & Code'}
                </div>
              </div>
            </div>

            {/* Formação Acadêmica & Certificação */}
            <div className="p-5 sm:p-6 rounded-2xl bg-graphite-900/80 border border-emerald-500/15 space-y-4">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-graphite-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{t('bento.educationTitle')}</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20">
                  <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">
                        {t('bento.certClaude')}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        Anthropic · 2026
                      </span>
                    </div>
                    <span className="text-graphite-400 font-mono text-[11px] mt-0.5 block">
                      Certificação em desenvolvimento com agentes e modelos avançados
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-graphite-850/60 border border-graphite-700/50">
                  <FileCheck2 className="w-4 h-4 text-graphite-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white text-sm block">
                      {t('bento.educationAds')}
                    </span>
                    <span className="text-graphite-400 font-mono text-[11px]">
                      Estácio (2021 – 2023) · Formação Técnica SENAI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Pilares Metodológicos de Engenharia (5 Colunas) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/90 font-semibold mb-2">
              {locale === 'pt' ? 'PILARES DE ENGENHARIA' : 'ENGINEERING PILLARS'}
            </div>

            {/* Pilar 1: Arquitetura & Idempotência (Destaque Principal com Acabamento Esmeralda) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-graphite-900/95 to-graphite-900/95 border border-emerald-500/30 hover:border-emerald-500/50 transition-all shadow-md group">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {t('bento.pillar1Title')}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-graphite-300 leading-relaxed font-normal">
                {t('bento.pillar1Desc')}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-emerald-500/15 text-[11px] font-mono">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">Clean Arch</span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">DDD</span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">Redis Locks</span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">SOLID</span>
              </div>
            </div>

            {/* Pilar 2: Testes & CI/CD */}
            <div className="p-6 rounded-2xl bg-graphite-900/80 border border-graphite-700/60 hover:border-emerald-500/30 hover:bg-graphite-900 transition-all group">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2.5 rounded-xl bg-graphite-800 text-graphite-200 border border-graphite-700 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-colors">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {t('bento.pillar2Title')}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-graphite-300 leading-relaxed font-normal">
                {t('bento.pillar2Desc')}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-graphite-800 text-[11px] font-mono text-graphite-300">
                <span className="px-2.5 py-0.5 rounded-md bg-graphite-800/80 border border-graphite-700">xUnit + Moq</span>
                <span className="px-2.5 py-0.5 rounded-md bg-graphite-800/80 border border-graphite-700">PHPUnit</span>
                <span className="px-2.5 py-0.5 rounded-md bg-graphite-800/80 border border-graphite-700">Vitest</span>
                <span className="px-2.5 py-0.5 rounded-md bg-graphite-800/80 border border-graphite-700">Docker</span>
              </div>
            </div>

            {/* Pilar 3: Liderança & Digitalização */}
            <div className="p-6 rounded-2xl bg-graphite-900/80 border border-graphite-700/60 hover:border-emerald-500/30 hover:bg-graphite-900 transition-all group">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2.5 rounded-xl bg-graphite-800 text-graphite-200 border border-graphite-700 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {t('bento.pillar3Title')}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-graphite-300 leading-relaxed font-normal">
                {t('bento.pillar3Desc')}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-graphite-800 text-[11px] font-mono text-graphite-300">
                <span className="px-2.5 py-0.5 rounded-md bg-graphite-800/80 border border-graphite-700">11 Sistemas</span>
                <span className="px-2.5 py-0.5 rounded-md bg-graphite-800/80 border border-graphite-700">RBAC</span>
                <span className="px-2.5 py-0.5 rounded-md bg-graphite-800/80 border border-graphite-700">Workspace Única</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
