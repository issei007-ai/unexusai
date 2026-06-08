export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  num: string;
  title: string;
  desc: string;
  href: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  service: string;
  result: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
}
