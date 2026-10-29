export interface ProfileMetric {
  value: string;
  label: {
    en: string;
    pt: string;
  };
  context?: {
    en: string;
    pt: string;
  };
  highlight?: boolean;
}

export interface ProfileSocial {
  github: string;
  linkedin: string;
  email: string;
  whatsapp: string;
  phone?: string;
  resumePdf: string;
}

export interface ProfileData {
  name: string;
  headline?: {
    en: string;
    pt: string;
  };
  role: {
    en: string;
    pt: string;
  };
  titleBadge: {
    en: string;
    pt: string;
  };
  bioShort: {
    en: string;
    pt: string;
  };
  bioFull?: {
    en: string;
    pt: string;
  };
  location: string;
  timezone: string;
  availability: {
    status: 'available' | 'busy';
    label: {
      en: string;
      pt: string;
    };
  };
  social: ProfileSocial;
  metrics: ProfileMetric[];
  education: Array<{
    course: {
      en: string;
      pt: string;
    } | string;
    institution: string;
    period: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  languages?: Array<{
    name: {
      en: string;
      pt: string;
    };
    level: {
      en: string;
      pt: string;
    };
  }>;
}
