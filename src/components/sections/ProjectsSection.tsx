import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { useI18n } from '@/hooks/useI18n';
import { projectService } from '@/services/projectService';
import type { ProjectData } from '@/types/project.types';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

export const ProjectsSection: React.FC = () => {
  const { locale, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectData | null>(null);

  const allProjects = projectService.getAllProjects();

  const categories = [
    { id: 'all', label: t('projects.filterAll'), count: allProjects.length },
    { id: 'fintech', label: t('projects.filterFintech'), count: allProjects.filter((p) => p.category === 'fintech').length },
    { id: 'enterprise', label: t('projects.filterEnterprise'), count: allProjects.filter((p) => p.category === 'enterprise').length },
    { id: 'saas', label: t('projects.filterSaas'), count: allProjects.filter((p) => p.category === 'saas').length },
    { id: 'opensource', label: t('projects.filterOpenSource'), count: allProjects.filter((p) => p.category === 'opensource').length },
  ];

  const projects = projectService.getProjectsByCategory(selectedCategory);

  return (
    <section id="cases" className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-graphite-800/80 relative">
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto">
        {/* Cabeçalho da Seção em Largura Total */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-graphite-800/80 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-2.5">
              SELECTED WORK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t('projects.heading')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-graphite-400 font-mono">
            {t('projects.subheading')}
          </p>
        </div>

        {/* Barra de Filtros em Largura Total com Verde Esmeralda */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-graphite-800/70 mb-10">
          <span className="text-xs font-mono text-graphite-400 uppercase tracking-wider mr-2 hidden sm:inline-block">
            {locale === 'pt' ? 'Área:' : 'Area:'}
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all tap-feedback ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/50 border border-emerald-500/40'
                    : 'bg-graphite-900/80 text-graphite-300 hover:text-white hover:bg-graphite-850 border border-graphite-700/60'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-emerald-900/70 text-emerald-100 font-bold' : 'bg-graphite-800 text-graphite-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid de Cards de Projetos em 3 Colunas */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Card
                  enableSpotlight
                  className="h-full p-6 sm:p-7 border-graphite-700/70 hover:border-emerald-500/40 transition-all group bg-gradient-to-b from-graphite-900/95 to-graphite-900/80 rounded-2xl shadow-sm"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      {/* Topo do Card: Papel, Empresa e Período */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 truncate max-w-[170px] font-medium">
                            {project.role[locale]}
                          </span>
                          {project.company && (
                            <span className="text-[11px] font-mono text-graphite-400 truncate hidden sm:inline-block">
                              · {project.company}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-graphite-400 shrink-0">
                          {project.period}
                        </span>
                      </div>

                      {/* Título do Projeto */}
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-100 transition-colors mb-2.5 leading-snug">
                        {project.title}
                      </h3>

                      {/* Descrição Curta */}
                      <p className="text-xs sm:text-sm text-graphite-300 leading-relaxed mb-5 line-clamp-3">
                        {project.shortDescription[locale]}
                      </p>

                      {/* Faixa de Métricas Verificadas com Destaque Esmeralda */}
                      <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-graphite-950/70 border border-graphite-800 mb-5">
                        {project.metrics.map((m, idx) => (
                          <div key={idx} className="flex flex-col min-w-0">
                            <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400 truncate">
                              {m.value}
                            </span>
                            <span className="text-[10px] text-graphite-400 font-mono truncate" title={m.label[locale]}>
                              {m.label[locale]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rodapé: Tags de Stack e Botões de Ação */}
                    <div className="mt-5">
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[11px] font-mono text-graphite-300 bg-graphite-800/80 border border-graphite-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 5 && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono text-graphite-400">
                            +{project.stack.length - 5}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-graphite-800/80 gap-2">
                        <button
                          onClick={() => setActiveProjectModal(project)}
                          type="button"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-xs font-mono text-emerald-300 hover:text-white transition-colors border border-emerald-700/50 tap-feedback font-medium"
                        >
                          <span>{t('projects.viewDetails')}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 group-hover:text-white" />
                        </button>

                        <div className="flex items-center gap-1.5">
                          {project.links?.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 p-2 rounded-lg text-graphite-400 hover:text-white hover:bg-graphite-800 transition-colors"
                              title={locale === 'pt' ? 'Ver demonstração ao vivo' : 'View live demo'}
                              aria-label="Ver demonstração ao vivo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {project.links?.repos ? (
                            <a
                              href={project.links.repos[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-graphite-300 hover:text-white hover:bg-graphite-800 transition-colors border border-graphite-700/50"
                              title={`${project.links.repos.length} repositórios disponíveis no GitHub`}
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-mono bg-graphite-800 px-1.5 py-0.5 rounded text-graphite-300">
                                {project.links.repos.length} repos
                              </span>
                            </a>
                          ) : project.links?.github ? (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 p-2 rounded-lg text-graphite-400 hover:text-white hover:bg-graphite-800 transition-colors"
                              title="Ver repositório no GitHub"
                              aria-label="Ver repositório no GitHub"
                            >
                              <GithubIcon className="w-4 h-4" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal de Estudo de Caso Detalhado */}
      <Modal
        isOpen={!!activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        title={activeProjectModal?.title}
        maxWidth="4xl"
      >
        {activeProjectModal && (
          <div className="space-y-6 text-sm">
            {/* Contexto e Papel */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-graphite-400 pb-4 border-b border-graphite-800">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30">
                {activeProjectModal.role[locale]}
              </span>
              <span>Período: {activeProjectModal.period}</span>
              {activeProjectModal.company && (
                <span className="text-graphite-300">Empresa: {activeProjectModal.company}</span>
              )}
            </div>

            {/* Descrição Completa */}
            <div>
              <p className="text-graphite-200 leading-relaxed text-base">
                {activeProjectModal.fullDescription[locale]}
              </p>
            </div>

            {/* Desafio e Solução */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-graphite-950/70 border border-graphite-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-2">
                  {t('projects.challengeTitle')}
                </h4>
                <p className="text-xs text-graphite-300 leading-relaxed">
                  {activeProjectModal.challenge[locale]}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/25 to-graphite-950/80 border border-emerald-500/30">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  {t('projects.solutionTitle')}
                </h4>
                <p className="text-xs text-graphite-300 leading-relaxed">
                  {activeProjectModal.solution[locale]}
                </p>
              </div>
            </div>

            {/* Métricas Comprovadas */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-graphite-400 mb-3">
                {t('projects.impactTitle')}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeProjectModal.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-graphite-800 bg-graphite-950/70"
                  >
                    <div className="text-xl font-bold font-mono text-emerald-400">
                      {m.value}
                    </div>
                    <div className="text-xs text-graphite-400 mt-0.5">
                      {m.label[locale]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Completa */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-graphite-400 mb-3">
                {t('projects.techStackTitle')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProjectModal.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-graphite-800/80 border border-graphite-700/60 text-graphite-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links Externos & Repositórios */}
            {activeProjectModal.links && (
              <div className="pt-4 border-t border-graphite-800 space-y-2.5">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-graphite-400">
                  {locale === 'pt' ? 'Código-Fonte & Repositórios no GitHub:' : 'Source Code & Repositories on GitHub:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.links.repos ? (
                    activeProjectModal.links.repos.map((repo) => (
                      <a
                        key={repo.url}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-graphite-700 bg-graphite-800 hover:border-emerald-500/40 text-white text-xs font-mono transition-colors group"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-graphite-400 group-hover:text-emerald-400" />
                        <span>{repo.label}</span>
                        <ExternalLink className="w-3 h-3 text-graphite-400 group-hover:text-emerald-400" />
                      </a>
                    ))
                  ) : activeProjectModal.links.github ? (
                    <a
                      href={activeProjectModal.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-graphite-700 bg-graphite-800 hover:border-emerald-500/40 text-white text-xs font-mono transition-colors group"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-graphite-400 group-hover:text-emerald-400" />
                      <span>{t('projects.viewRepo')}</span>
                      <ExternalLink className="w-3 h-3 text-graphite-400 group-hover:text-emerald-400" />
                    </a>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};
