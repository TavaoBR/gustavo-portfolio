import React from 'react';
import { motion } from 'framer-motion';
import { History, Calendar, CheckCircle, Globe2, Building2 } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { experienceService } from '@/services/experienceService';
import { BlurText } from '@/components/reactbits/BlurText';

export const ExperienceSection: React.FC = () => {
  const { locale, t } = useI18n();
  const timeline = experienceService.getTimeline();

  const getCountryBadge = (location: string) => {
    if (location.includes('Estados Unidos') || location.includes('USA')) {
      return { flag: '🇺🇸', label: 'EUA · Remoto' };
    }
    if (location.includes('Suíça') || location.includes('Switzerland')) {
      return { flag: '🇨🇭', label: 'Suíça · Remoto' };
    }
    return { flag: '🇧🇷', label: 'Brasil' };
  };

  return (
    <section id="trajetoria" className="py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-graphite-800/80 relative">
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-xs font-mono text-emerald-400 mb-3">
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>CAREER PATH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            <BlurText text={t('experience.heading')} delay={45} />
          </h2>
          <p className="text-graphite-400 text-sm sm:text-base max-w-2xl">
            {t('experience.subheading')}
          </p>
        </div>

        {/* Linha do Tempo Vertical com Efeito de Conexão Expandido */}
        <div className="relative border-l-2 border-emerald-500/20 pl-6 sm:pl-10 ml-2 sm:ml-4 space-y-10">
          {timeline.map((item, index) => {
            const country = getCountryBadge(item.location);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Ponto Conector na Linha */}
                <div
                  className={`absolute -left-[32px] sm:-left-[49px] top-6 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                    item.current
                      ? 'border-emerald-400 bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.65)]'
                      : 'border-graphite-600 bg-graphite-900 group-hover:border-emerald-400 group-hover:bg-emerald-500/20'
                  }`}
                >
                  {item.current && (
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  )}
                </div>

                {/* Painel Editorial de Experiência */}
                <div
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 group/item ${
                    item.current
                      ? 'bg-gradient-to-br from-emerald-950/25 via-graphite-900/95 to-graphite-900/95 border-emerald-500/35 hover:border-emerald-500/55 shadow-md'
                      : 'bg-graphite-900/80 hover:bg-graphite-900 border-graphite-700/60 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Sub-coluna 1 (4 cols): Empresa, Cargo, Período e Modalidade */}
                    <div className="lg:col-span-4 space-y-3.5 pb-4 lg:pb-0 lg:border-r border-graphite-800/80 lg:pr-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full border border-graphite-700 bg-graphite-800 text-graphite-200 inline-flex items-center gap-1.5 font-medium">
                          <span>{country.flag}</span>
                          <span>{country.label}</span>
                        </span>
                        {item.current && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
                            Atual
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover/item:text-emerald-100 transition-colors">
                          {item.company}
                        </h3>
                      </div>

                      <div className="text-sm font-semibold text-graphite-200 font-mono">
                        {item.role}
                      </div>

                      <div className="space-y-1.5 text-xs font-mono text-graphite-400 pt-1">
                        <div className="inline-flex items-center gap-1.5 bg-graphite-800/60 px-2.5 py-1 rounded-md border border-graphite-700/60 text-graphite-300">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{item.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-graphite-400 text-[11px]">
                          <Globe2 className="w-3 h-3 text-graphite-400" />
                          <span>{item.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sub-coluna 2 (8 cols): Descrição, Conquistas e Tecnologias */}
                    <div className="lg:col-span-8 space-y-5">
                      <p className="text-sm sm:text-base text-graphite-200 leading-relaxed font-normal">
                        {item.description[locale]}
                      </p>

                      {/* Conquistas e Destaques */}
                      <div className="space-y-2.5">
                        {item.achievements.map((ach, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite-300">
                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{ach[locale]}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stack Tecnológica */}
                      <div className="pt-4 border-t border-graphite-800/80">
                        <div className="text-[11px] font-mono text-graphite-400 uppercase tracking-wider mb-2 font-medium">
                          Tecnologias & Ferramentas:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono text-graphite-200 bg-graphite-800/80 border border-graphite-700/70 hover:border-emerald-500/35 hover:text-white hover:bg-emerald-500/10 transition-colors inline-block cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
