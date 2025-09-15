export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    clientsSatisfied: number;
  };
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  [category: string]: Skill[];
}

export interface TimelineItem {
  id: number;
  title: string;
  company: string;
  period: string;
  type: 'work' | 'education' | 'achievement';
  achievements: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  role: string;
  featured: boolean;
  metrics?: {
    users?: string;
    rating?: string;
    performance?: string;
    engagement?: string;
    impact?: string;
    consultations?: string;
    uptime?: string;
    satisfaction?: string;
  };
  tech: string[];
  links: {
    demo?: string;
    github?: string;
    case_study?: string;
  };
  details: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillCategory;
  timeline: TimelineItem[];
  projects: Project[];
  faqs: FAQ[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}