export type Locale = 'en' | 'pt';

export interface TranslationDictionary {
  navbar: {
    about: string;
    skills?: string;
    cases: string;
    experience: string;
    contact: string;
    status: string;
    cmdK: string;
    downloadCV: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    exploreBtn: string;
    scheduleBtn: string;
    githubBtn: string;
    metric1Label: string;
    metric2Label: string;
    metric3Label: string;
  };
  bento: {
    badge: string;
    heading: string;
    subheading: string;
    bioLead: string;
    bioP1: string;
    bioP2: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    educationTitle: string;
    educationAds: string;
    certClaude: string;
    clockTitle: string;
    clockStatus: string;
  };
  skills: {
    badge: string;
    heading: string;
    subheading: string;
  };
  projects: {
    heading: string;
    subheading: string;
    filterAll: string;
    filterFintech: string;
    filterEnterprise: string;
    filterSaas: string;
    filterOpenSource: string;
    viewDetails: string;
    challengeTitle: string;
    solutionTitle: string;
    impactTitle: string;
    techStackTitle: string;
    viewRepo: string;
    closeModal: string;
  };
  experience: {
    heading: string;
    subheading: string;
    present: string;
  };
  contact: {
    heading: string;
    subheading: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    sendBtn: string;
    sending: string;
    successTitle: string;
    successDesc: string;
    errorTitle: string;
    errorDesc: string;
    directTitle: string;
    copyEmail: string;
    copied: string;
    whatsapp: string;
    scheduleCall: string;
    sentInboxTitle: string;
    sentInboxEmpty: string;
  };
  footer: {
    tagline: string;
    rights: string;
    backToTop: string;
  };
  cmd: {
    placeholder: string;
    navigation: string;
    projects?: string;
    actions: string;
    noResults: string;
    changeLang: string;
    copyEmailAction: string;
    downloadCVAction: string;
  };
}
