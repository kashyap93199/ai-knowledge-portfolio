// Shared TypeScript types for the AI Knowledge Portfolio.

export interface SiteSetting {
  id: number;
  key: string;
  value: string;
  updatedAt: string;
}

export interface PageRow {
  id: number;
  slug: string;
  title: string;
  description: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Section {
  id: number;
  pageId: number | null;
  type: string;
  title: string;
  subtitle: string | null;
  content: string | null;
  order: number;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Slide {
  id: number;
  sectionId: number | null;
  title: string;
  subtitle: string | null;
  description: string;
  details: string;
  order: number;
  animationType: string | null;
  icon: string | null;
  mediaType: string | null;
  mediaSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AiTopic {
  id: number;
  name: string;
  slug: string;
  shortDefinition: string;
  longDescription: string;
  examples: string;
  tools: string;
  freeResources: string;
  icon: string;
  order: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowStep {
  id: number;
  title: string;
  subtitle: string | null;
  description: string;
  details: string;
  inputs: string | null;
  outputs: string | null;
  tools: string | null;
  bestPractices: string | null;
  order: number;
  icon: string;
  animationType: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  category: string;
  sourceNote: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  problem: string;
  solution: string;
  features: string;
  techStack: string;
  category: string;
  tags: string;
  imageUrl: string | null;
  demoUrl: string | null;
  repositoryUrl: string | null;
  order: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: number;
  title: string;
  url: string;
  category: string;
  description: string;
  license: string | null;
  level: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GlossaryTerm {
  id: number;
  term: string;
  slug: string;
  simpleDefinition: string;
  detailedDefinition: string;
  category: string;
  relatedTerms: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: number;
  username: string;
  passwordHash: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Parsed shape of a search result across content types.
export interface SearchResult {
  type: "topic" | "project" | "resource" | "glossary" | "workflow" | "timeline";
  title: string;
  slug?: string;
  url: string;
  excerpt: string;
}

export interface ApiError {
  error: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}