import React, { useState } from 'react';
import { Mail, MessageSquare, Calendar, Copy, Check, Send, Inbox, Trash2, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { contactService } from '@/services/contactService';
import { profileService } from '@/services/profileService';
import type { ContactFormData, ContactSubmission } from '@/types/contact.types';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { formatDateRelative } from '@/utils/formatters';
import { BlurText } from '@/components/reactbits/BlurText';
import { Magnet } from '@/components/reactbits/Magnet';

export const ContactSection: React.FC = () => {
  const { locale, t } = useI18n();
  const profile = profileService.getProfile();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [sentInbox, setSentInbox] = useState<ContactSubmission[]>(() =>
    contactService.getSentSubmissions()
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.social.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    // Validação inicial no frontend
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Por favor, informe seu nome.';
    if (!formData.email.trim()) errors.email = 'Por favor, informe seu e-mail.';
    if (!formData.message.trim()) errors.message = 'Por favor, escreva sua mensagem.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const result = await contactService.submitMessage(formData);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setSentInbox(contactService.getSentSubmissions());
      setTimeout(() => setSubmitSuccess(false), 6000);
    } else if (result.error) {
      setFormErrors({ form: result.error });
    }
  };

  const handleClearInbox = () => {
    contactService.clearSentSubmissions();
    setSentInbox([]);
  };

  return (
    <section id="contato" className="py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-graphite-800/80">
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-xs font-mono text-emerald-400 mb-3">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            <BlurText text={t('contact.heading')} delay={40} />
          </h2>
          <p className="text-graphite-400 text-sm sm:text-base max-w-2xl">
            {t('contact.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Coluna da Esquerda: Canais Diretos & Informações */}
          <div className="lg:col-span-5 space-y-4">
            <Card enableSpotlight className="p-6 sm:p-7 border-graphite-700/70 bg-gradient-to-b from-graphite-900/95 to-graphite-900/80 shadow-sm">
              <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-graphite-300 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {t('contact.directTitle')}
              </h3>

              <div className="space-y-3">
                {/* Copiar E-mail */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-graphite-850/80 border border-graphite-700/60 hover:border-emerald-500/35 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-graphite-400">E-mail Direto</div>
                      <div className="text-xs font-mono text-white font-medium">
                        {profile.social.email}
                      </div>
                    </div>
                  </div>

                  <Magnet magnetStrength={0.3}>
                    <button
                      onClick={handleCopyEmail}
                      type="button"
                      className="p-2 rounded-lg text-graphite-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors tap-feedback"
                      aria-label="Copiar endereço de e-mail"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </Magnet>
                </div>

                {/* WhatsApp Comercial */}
                <a
                  href={profile.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-graphite-850/80 border border-graphite-700/60 hover:border-emerald-500/35 hover:bg-emerald-500/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-graphite-400">{t('contact.whatsapp')}</div>
                      <div className="text-xs font-mono text-white font-medium">
                        +55 (79) 99191-7634
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-graphite-400 group-hover:text-emerald-300 transition-colors" />
                </a>

                {/* Agendamento Técnico */}
                <a
                  href={`mailto:${profile.social.email}?subject=Convite%20para%20Conversa%20T%C3%A9cnica`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-graphite-850/80 border border-graphite-700/60 hover:border-emerald-500/35 hover:bg-emerald-500/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-graphite-400">Reunião Online</div>
                      <div className="text-xs font-mono text-white font-medium">
                        {t('contact.scheduleCall')}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-graphite-400 group-hover:text-emerald-300 transition-colors" />
                </a>
              </div>

              <div className="mt-6 pt-4 border-t border-graphite-800 text-[11px] font-mono text-graphite-400">
                Localização: Aracaju, SE — Brasil · Resposta típica em &lt; 24h
              </div>
            </Card>

            {/* Caixa de Entrada Local (Demonstração de Persistência no LocalStorage) */}
            <Card className="p-6 border-graphite-700/60 bg-graphite-900/85 shadow-sm">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-graphite-800">
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-white">
                    {t('contact.sentInboxTitle')}
                  </span>
                </div>
                {sentInbox.length > 0 && (
                  <button
                    onClick={handleClearInbox}
                    type="button"
                    className="text-graphite-400 hover:text-rose-400 transition-colors p-1"
                    title="Limpar histórico local"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {sentInbox.length === 0 ? (
                <p className="text-xs text-graphite-400 font-mono leading-relaxed">
                  {t('contact.sentInboxEmpty')}
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {sentInbox.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-2.5 rounded-lg bg-graphite-950/70 border border-graphite-800 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between text-graphite-400 mb-1">
                        <span className="font-bold text-white truncate max-w-[150px]">
                          {sub.name}
                        </span>
                        <span className="text-[10px] text-graphite-400">
                          {formatDateRelative(sub.timestamp, locale)}
                        </span>
                      </div>
                      <div className="text-graphite-300 truncate">{sub.subject}</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Coluna da Direita: Formulário de Contato */}
          <div className="lg:col-span-7">
            <Card enableSpotlight className="p-7 sm:p-8 border-graphite-700/70 bg-gradient-to-b from-graphite-900/95 to-graphite-900/80 shadow-sm">
              {submitSuccess ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="text-sm text-graphite-300 max-w-md">
                    {t('contact.successDesc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot anti-spam oculto */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData((p) => ({ ...p, honeypot: e.target.value }))}
                    className="sr-only"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-graphite-300 font-medium mb-1.5">
                        {t('contact.nameLabel')} <span className="text-emerald-400">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Alexandre Silva"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        error={formErrors.name}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-graphite-300 font-medium mb-1.5">
                        {t('contact.emailLabel')} <span className="text-emerald-400">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="alexandre@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        error={formErrors.email}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-graphite-300 font-medium mb-1.5">
                      {t('contact.subjectLabel')}
                    </label>
                    <Input
                      type="text"
                      placeholder="Projeto de Alta Escala / Oportunidade Sênior"
                      value={formData.subject}
                      onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-graphite-300 font-medium mb-1.5">
                      {t('contact.messageLabel')} <span className="text-emerald-400">*</span>
                    </label>
                    <Textarea
                      rows={5}
                      placeholder="Conte sobre o projeto, escopo, tecnologias ou desafio de engenharia..."
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      error={formErrors.message}
                    />
                  </div>

                  {formErrors.form && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-mono">
                      {formErrors.form}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="emerald"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full mt-2 font-bold"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('contact.sendBtn')}</span>
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
