import React from 'react';
import { User, Cpu, Briefcase, History, Mail, Command, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { I18nContext, useI18nProvider } from '@/hooks/useI18n';
import { useCommandPalette } from '@/hooks/useCommandPalette';
import { profileService } from '@/services/profileService';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { BentoSection } from '@/components/sections/BentoSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { CommandPalette } from '@/components/command/CommandPalette';
import { Squares } from '@/components/reactbits/Squares';
import { ClickSpark } from '@/components/reactbits/ClickSpark';
import { Dock, type DockItemData } from '@/components/reactbits/Dock';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export const App: React.FC = () => {
  const i18n = useI18nProvider();
  const { isOpen, open, close } = useCommandPalette();
  const profile = profileService.getProfile();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const dockItems: DockItemData[] = [
    {
      id: 'sobre',
      label: i18n.locale === 'pt' ? 'Sobre' : 'About',
      icon: <User className="w-4 h-4" />,
      onClick: () => scrollTo('sobre'),
    },
    {
      id: 'skills',
      label: i18n.locale === 'pt' ? 'Tecnologias' : 'Tech Stack',
      icon: <Cpu className="w-4 h-4" />,
      onClick: () => scrollTo('skills'),
    },
    {
      id: 'trajetoria',
      label: i18n.locale === 'pt' ? 'Trajetória' : 'Journey',
      icon: <History className="w-4 h-4" />,
      onClick: () => scrollTo('trajetoria'),
    },
    {
      id: 'cases',
      label: i18n.locale === 'pt' ? 'Projetos' : 'Work',
      icon: <Briefcase className="w-4 h-4" />,
      onClick: () => scrollTo('cases'),
    },
    {
      id: 'contato',
      label: i18n.locale === 'pt' ? 'Contato' : 'Contact',
      icon: <Mail className="w-4 h-4" />,
      onClick: () => scrollTo('contato'),
      badge: 'dot',
    },
    {
      id: 'cmdk',
      label: i18n.locale === 'pt' ? 'Buscar (⌘K)' : 'Search (⌘K)',
      icon: <Command className="w-4 h-4" />,
      onClick: open,
    },
    {
      id: 'resume',
      label: i18n.locale === 'pt' ? 'Currículo (PDF)' : 'Resume (PDF)',
      icon: <FileText className="w-4 h-4 text-emerald-500" />,
      onClick: () => {
        const link = document.createElement('a');
        link.href = profile.social.resumePdf;
        link.download = 'curriculo-gustavo-fagundes.pdf';
        link.click();
      },
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: <GithubIcon className="w-4 h-4" />,
      onClick: () => window.open(profile.social.github, '_blank'),
      isExternal: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: <LinkedinIcon className="w-4 h-4" />,
      onClick: () => window.open(profile.social.linkedin, '_blank'),
      isExternal: true,
    },
  ];

  return (
    <I18nContext.Provider value={i18n}>
      <ClickSpark sparkColor="rgba(16, 185, 129, 0.85)" sparkCount={7} sparkRadius={22} sparkSize={8}>
        {/* Barra Superior de Progresso com Física de Mola */}
        <ScrollProgress />

        {/* Fundo Interativo Squares (React Bits) */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-25">
          <Squares
            speed={0.2}
            squareSize={48}
            direction="diagonal"
            borderColor="rgba(16, 185, 129, 0.03)"
            hoverFillColor="rgba(16, 185, 129, 0.06)"
          />
        </div>

        {/* Link de salto acessível (Skip to Content) */}
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-graphite-950 focus:rounded-md focus:font-bold"
        >
          Pular para o conteúdo principal
        </a>

        <div className="relative min-h-screen bg-canvas text-text-primary selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col justify-between">
          {/* Navbar Flutuante */}
          <Navbar onOpenCommandPalette={open} />

          {/* Conteúdo Principal */}
          <main id="conteudo-principal" className="flex-1">
            <HeroSection />
            <BentoSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </main>

          {/* Dock Flutuante Interativo (React Bits) */}
          <Dock items={dockItems} />

          {/* Footer */}
          <Footer />

          {/* Command Palette Global (Cmd+K) */}
          <CommandPalette isOpen={isOpen} onClose={close} />
        </div>
      </ClickSpark>
    </I18nContext.Provider>
  );
};

export default App;
