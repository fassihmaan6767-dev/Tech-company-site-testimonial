export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  metric: string;
  description: string;
  accentColor: string;
  deliverables: string[];
  techStack: string[];
  previewType: 'fintech' | 'luxury' | 'ai' | 'mobility';
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  tools: string[];
  highlightMetric: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  company: string;
  verifiedOutcome: string;
  rating: number;
}
