import experienceData from '@/data/experience.json';
import type { ExperienceItem } from '@/types/experience.types';

class ExperienceService {
  private timeline: ExperienceItem[] = experienceData as ExperienceItem[];

  public getTimeline(): ExperienceItem[] {
    return this.timeline;
  }

  public getCurrentRole(): ExperienceItem | undefined {
    return this.timeline.find((item) => item.current);
  }
}

export const experienceService = new ExperienceService();
