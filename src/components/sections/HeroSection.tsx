import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, FileText, MapPin, Terminal, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { useI18n } from '@/hooks/useI18n';
import { profileService } from '@/services/profileService';
import { Button } from '@/components/ui/Button';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { ShinyText } from '@/components/reactbits/ShinyText';
import { Magnet } from '@/components/reactbits/Magnet';
import { CountUp } from '@/components/reactbits/CountUp';
import { BlurText } from '@/components/reactbits/BlurText';
import { TiltedCard } from '@/components/reactbits/TiltedCard';

export const HeroSection: React.FC = () => {
  const { locale, t } = useI18n();
  const profile = profileService.getProfile();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden"
    >
      {/* Background Radial Glow com Toque Esmeralda Elegante */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(255,255,255,0.02) 45%, transparent 70%)',
          filter: 'blur(140px)',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto w-full relative z-10"
      >
        {/* Layout Balanceado de 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Coluna da Esquerda: Apresentação Pessoal & CTA */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            {/* Pill de Status e Localização Real com Verde Esmeralda */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/35 backdrop-blur-md text-xs font-mono text-zinc-200 shadow-sm">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span>{locale === 'pt' ? 'Disponível para remoto / híbrido' : 'Available for remote / hybrid'}</span>
              </span>
              <span className="text-zinc-600">·</span>
              <span className="inline-flex items-center gap-1 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400/80" />
                Aracaju, SE · Brasil
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-300 font-medium">Full Stack IV @ del.tech</span>
            </div>

            {/* Saudação, Nome e Título Real */}
            <div>
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-emerald-400/90 mb-2 font-medium">
                <BlurText
                  text={locale === 'pt' ? 'Olá, seja bem-vindo — Sou' : 'Hello, welcome — I am'}
                  delay={30}
                />
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-3">
                <ShinyText text="Gustavo Fagundes" speed={4} />
              </h1>

              <div className="text-base sm:text-xl font-mono text-zinc-300">
                <DecryptedText
                  text={
                    locale === 'pt'
                      ? 'Desenvolvedor Full Stack · PHP · Vue.js 3 · C# .NET 8'
                      : 'Full Stack Developer · PHP · Vue.js 3 · C# .NET 8'
                  }
                  speed={28}
                  maxIterations={15}
                  animateOn="view"
                  className="text-zinc-200 font-mono"
                />
              </div>
            </div>

            {/* Resumo do Currículo */}
            <p className="text-base sm:text-lg xl:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>

            {/* Ações e Links Sociais com Efeito Magnético */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Magnet magnetStrength={0.25}>
                <Button
                  size="lg"
                  variant="emerald"
                  onClick={() => scrollTo('trajetoria')}
                  className="group px-6 py-3"
                >
                  <span>{t('hero.exploreBtn')}</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </Button>
              </Magnet>

              <Magnet magnetStrength={0.25}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo('contato')}
                  className="px-6 py-3"
                >
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <span>{t('hero.scheduleBtn')}</span>
                </Button>
              </Magnet>

              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                <Magnet magnetStrength={0.3}>
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-mono text-zinc-300 hover:text-white hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-colors tap-feedback"
                    aria-label="Perfil no GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </Magnet>

                <Magnet magnetStrength={0.3}>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-mono text-zinc-300 hover:text-white hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-colors tap-feedback"
                    aria-label="Perfil no LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </Magnet>

                <Magnet magnetStrength={0.3}>
                  <a
                    href={profile.social.resumePdf}
                    download="curriculo-gustavo-fagundes.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-600/40 bg-emerald-950/30 text-xs font-mono text-emerald-300 hover:text-white hover:border-emerald-500/60 hover:bg-emerald-900/40 transition-colors tap-feedback"
                    aria-label="Baixar currículo em PDF"
                  >
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span>Currículo (PDF)</span>
                  </a>
                </Magnet>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Snapshot Oficial com Foto e Credenciais */}
          <div className="lg:col-span-6 xl:col-span-6 w-full flex items-center justify-center relative">
            <TiltedCard maxAngle={8} scale={1.02} className="w-full max-w-[480px]">
              <div className="relative rounded-2xl border border-emerald-500/25 bg-gradient-to-b from-graphite-850 via-graphite-900 to-graphite-950 p-6 sm:p-7 shadow-2xl backdrop-blur-xl group hover:border-emerald-500/40 transition-all duration-300">
                {/* Header do Card com Foto Oficial e Status */}
                <div className="flex items-center gap-4 pb-5 border-b border-white/10">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-400/30 shadow-xl shrink-0 bg-graphite-900 group-hover:border-emerald-400/60 transition-colors">
                    <img
                      src="/avatar.jpg"
                      alt="Gustavo Fagundes"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span>{locale === 'pt' ? 'Ativo em Produção' : 'Active in Production'}</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white leading-tight">
                      Gustavo Fagundes
                    </div>
                    <div className="text-xs font-mono text-zinc-400">
                      Full Stack IV @ del.tech
                    </div>
                  </div>
                </div>

                {/* Bloco de Código com Dados Reais do Currículo */}
                <div className="my-5 p-3.5 rounded-xl bg-graphite-950/80 border border-emerald-500/15 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-1.5 border-b border-white/5">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Terminal className="w-3.5 h-3.5" />
                      perfil-profissional.json
                    </span>
                    <span className="text-emerald-300 font-semibold">5+ Anos</span>
                  </div>
                  <div className="text-zinc-300 text-[11px] leading-relaxed">
                    <span className="text-zinc-500">// Stack Principal Comprovada:</span>
                    <br />
                    <span className="text-white font-semibold">backend:</span>{' '}
                    <span className="text-emerald-400 font-medium">PHP (Symfony / Laravel) & C# .NET 8</span>
                    <br />
                    <span className="text-white font-semibold">frontend:</span>{' '}
                    <span className="text-emerald-200">Vue.js 3, TypeScript & Pinia</span>
                    <br />
                    <span className="text-white font-semibold">marcos:</span>{' '}
                    <span className="text-zinc-300">+1M PIX (del.tech) · 11 Sistemas (Amparo)</span>
                  </div>
                </div>

                {/* Badges de Tecnologias Comprovadas no Currículo */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    'Symfony',
                    'Laravel',
                    'C# .NET 8',
                    'Vue.js 3',
                    'Redis',
                    'Docker',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer do Card com Certificação Real e Qualidade */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Clean Architecture & DDD
                  </span>
                  <span className="flex items-center gap-1 text-zinc-300">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    Claude 101 (Anthropic)
                  </span>
                </div>
              </div>
            </TiltedCard>
          </div>
        </div>

        {/* Faixa Pessoal de Métricas Oficiais em 4 Colunas com Contador GSAP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 mt-14 border-t border-emerald-500/15">
          {profile.metrics.map((metric, idx) => {
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-white/10 bg-graphite-900/40 hover:bg-emerald-950/15 hover:border-emerald-500/35 transition-all duration-300 group"
              >
                <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold font-mono text-white tracking-tight mb-1 group-hover:text-emerald-300 transition-colors">
                  {idx === 0 ? (
                    <CountUp to={1000000} prefix="+" duration={2.4} />
                  ) : idx === 1 ? (
                    <CountUp to={11} duration={1.6} />
                  ) : idx === 2 ? (
                    <CountUp to={5} suffix="+" duration={1.4} />
                  ) : (
                    metric.value
                  )}
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium">
                  {metric.label[locale]}
                </div>
                <div className="text-[11px] font-mono text-emerald-400/90 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>
                    {idx === 0
                      ? 'del.tech · Produção'
                      : idx === 1
                      ? 'Hospital Amparo de Maria'
                      : idx === 2
                      ? 'APIs REST & Microsserviços'
                      : 'Redis Distributed Locks'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
