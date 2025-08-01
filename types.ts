
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl: string;
  gitlabUrl?: string;
  blogUrl?: string;
  license?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; proficiency: number }[];
}