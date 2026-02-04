
export enum ServiceCategory {
  SAAS = 'SaaS Development',
  CLOUD = 'Cloud Infrastructure',
  AI = 'AI & Machine Learning',
  CONSULTING = 'Tech Consulting'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: ServiceCategory;
}

export interface LeadFormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

export interface LeadScoreResult {
  score: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  summary: string;
}
