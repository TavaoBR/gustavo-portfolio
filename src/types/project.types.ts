export interface ProjectMetric {
  value: string;
  label: {
    en: string;
    pt: string;
  };
}

export interface ProjectRepoLink {
  label: string;
  url: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  featured: boolean;
  category: 'fintech' | 'enterprise' | 'saas' | 'opensource';
  title: string;
  role: {
    en: string;
    pt: string;
  };
  period: string;
  company?: string;
  location?: string;
  shortDescription: {
    en: string;
    pt: string;
  };
  fullDescription: {
    en: string;
    pt: string;
  };
  challenge: {
    en: string;
    pt: string;
  };
  solution: {
    en: string;
    pt: string;
  };
  metrics: ProjectMetric[];
  stack: string[];
  links?: {
    github?: string;
    live?: string;
    repos?: ProjectRepoLink[];
  };
}
