export type SkillCategory = 'backend' | 'frontend' | 'data' | 'devops' | 'architecture';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  level?: string;
  iconName?: string;
  experienceYears?: number;
  highlight?: boolean;
}

export interface SkillCategoryGroup {
  id: SkillCategory;
  name: {
    en: string;
    pt: string;
  };
  skills: SkillItem[];
}
