import React from 'react';
import { useI18n } from '@/hooks/useI18n';
import { skillService } from '@/services/skillService';
import { TechIcon } from '@/components/ui/TechIcons';

export const SkillsSection: React.FC = () => {
  const { locale, t } = useI18n();
  const categoryGroups = skillService.getCategoryGroups();

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-graphite-800/80 relative">
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto">
        {/* Cabeçalho Editorial e Minimalista */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-6 border-b border-graphite-800/80 mb-2">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-2.5">
              {t('skills.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t('skills.heading')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-graphite-400 font-mono">
            {t('skills.subheading')}
          </p>
        </div>

        {/* Faixa Horizontal de Tecnologias por Categoria */}
        <div className="divide-y divide-graphite-800/70">
          {categoryGroups.map((group) => (
            <div
              key={group.id}
              className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline"
            >
              {/* Rótulo da Categoria com Ponto Indicador Esmeralda */}
              <div className="md:col-span-3 lg:col-span-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-graphite-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {group.name[locale]}
                </span>
              </div>

              {/* Itens em Linha Flexível com Ícone Oficial, Badge Graphite e Hover Esmeralda */}
              <div className="md:col-span-9 lg:col-span-9 flex flex-wrap items-center gap-2 sm:gap-2.5">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-graphite-900/80 border border-graphite-700/60 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-graphite-200 hover:text-white transition-all duration-200 cursor-default group"
                  >
                    <TechIcon
                      name={skill.name}
                      className="w-3.5 h-3.5 text-graphite-400 group-hover:text-emerald-400 transition-colors shrink-0"
                    />
                    <span className="font-medium text-xs sm:text-sm text-graphite-200 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
