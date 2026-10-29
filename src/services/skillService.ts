import skillsData from '@/data/skills.json';
import type { SkillCategoryGroup, SkillItem } from '@/types/skill.types';

class SkillService {
  private categoryGroups: SkillCategoryGroup[] = skillsData as SkillCategoryGroup[];

  public getCategoryGroups(): SkillCategoryGroup[] {
    return this.categoryGroups;
  }

  public getAllSkills(): SkillItem[] {
    return this.categoryGroups.flatMap((group) => group.skills);
  }

  public getHighlightSkills(): SkillItem[] {
    return this.getAllSkills().filter((skill) => skill.highlight);
  }

  public getSkillsByCategory(category: string): SkillItem[] {
    const group = this.categoryGroups.find((g) => g.id === category);
    return group ? group.skills : [];
  }
}

export const skillService = new SkillService();
