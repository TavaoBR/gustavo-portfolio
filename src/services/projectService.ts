import projectsData from '@/data/projects.json';
import type { ProjectData } from '@/types/project.types';

class ProjectService {
  private projects: ProjectData[] = projectsData as ProjectData[];

  public getAllProjects(): ProjectData[] {
    return this.projects;
  }

  public getFeaturedProjects(): ProjectData[] {
    return this.projects.filter((p) => p.featured);
  }

  public getProjectsByCategory(category: string): ProjectData[] {
    if (category === 'all') return this.projects;
    return this.projects.filter((p) => p.category === category);
  }

  public getProjectBySlug(slug: string): ProjectData | undefined {
    return this.projects.find((p) => p.slug === slug);
  }

  public searchProjects(query: string, lang: 'en' | 'pt' = 'en'): ProjectData[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.projects;

    return this.projects.filter((project) => {
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchDesc = project.shortDescription[lang].toLowerCase().includes(q);
      const matchStack = project.stack.some((tech) => tech.toLowerCase().includes(q));
      const matchCompany = project.company?.toLowerCase().includes(q) ?? false;
      return matchTitle || matchDesc || matchStack || matchCompany;
    });
  }
}

export const projectService = new ProjectService();
