import profileData from '@/data/profile.json';
import type { ProfileData } from '@/types/profile.types';

class ProfileService {
  private data: ProfileData = profileData as ProfileData;

  public getProfile(): ProfileData {
    return this.data;
  }

  public getSocialLinks() {
    return this.data.social;
  }

  public getMetrics() {
    return this.data.metrics;
  }

  public getEducationAndCertifications() {
    return {
      education: this.data.education,
      certifications: this.data.certifications,
    };
  }
}

export const profileService = new ProfileService();
