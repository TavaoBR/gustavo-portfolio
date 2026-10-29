export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string; // CLT, PJ Remoto (EUA), PJ Remoto (Suíça), etc.
  location: string;
  description: {
    en: string;
    pt: string;
  };
  achievements: Array<{
    en: string;
    pt: string;
  }>;
  stack: string[];
  current?: boolean;
}
