export const roles = [
  // General AI Roles
  { name: "AI Developer", slug: "ai-developer" },
  { name: "AI Consultant", slug: "ai-consultant" },
  { name: "AI Designer", slug: "ai-designer" },
  { name: "UI/UX Designer", slug: "ui-ux-designer" },
  { name: "Senior Software Engineer", slug: "senior-software-engineer" },
  // AI/ML Specific Roles
  { name: "AI Research Scientist", slug: "ai-research-scientist" },
  { name: "Machine Learning Engineer", slug: "ml-engineer" },
  { name: "Deep Learning Engineer", slug: "deep-learning-engineer" },
  { name: "AI Product Manager", slug: "ai-product-manager" },
  { name: "AI Ethics Officer", slug: "ai-ethics-officer" },
  { name: "AI Solutions Architect", slug: "ai-solutions-architect" },
  { name: "Computer Vision Engineer", slug: "computer-vision-engineer" },
  { name: "NLP Engineer", slug: "nlp-engineer" },
  { name: "AI Infrastructure Engineer", slug: "ai-infrastructure-engineer" },
  { name: "MLOps Engineer", slug: "mlops-engineer" },
  { name: "AI Quality Assurance", slug: "ai-qa-engineer" },
  { name: "AI Technical Lead", slug: "ai-tech-lead" },
  { name: "AI Strategy Consultant", slug: "ai-strategy-consultant" },

  // Data Roles
  { name: "Data Scientist", slug: "data-scientist" },
  { name: "Data Engineer", slug: "data-engineer" },
  { name: "Data Architect", slug: "data-architect" },
  { name: "Analytics Engineer", slug: "analytics-engineer" },
  { name: "Business Intelligence Developer", slug: "bi-developer" },
  { name: "Data Quality Engineer", slug: "data-quality-engineer" },

  // Specialized AI Application Roles
  { name: "AI Security Specialist", slug: "ai-security-specialist" },
  { name: "AI Performance Engineer", slug: "ai-performance-engineer" },
  { name: "Conversational AI Designer", slug: "conversational-ai-designer" },
  { name: "AI UX Researcher", slug: "ai-ux-researcher" },
  { name: "AI Content Strategist", slug: "ai-content-strategist" },
  { name: "AI Training Specialist", slug: "ai-training-specialist" },
  { name: "AI Integration Specialist", slug: "ai-integration-specialist" },
  { name: "AI Systems Engineer", slug: "ai-systems-engineer" },
  { name: "Robotics AI Engineer", slug: "robotics-ai-engineer" },

  // Domain-Specific AI Roles
  { name: "Healthcare AI Specialist", slug: "healthcare-ai-specialist" },
  { name: "Financial AI Analyst", slug: "financial-ai-analyst" },
  { name: "Retail AI Consultant", slug: "retail-ai-consultant" },
  { name: "Manufacturing AI Engineer", slug: "manufacturing-ai-engineer" },
  { name: "AI Marketing Specialist", slug: "ai-marketing-specialist" },

  // Management & Leadership
  { name: "AI Project Manager", slug: "ai-project-manager" },
  { name: "AI Program Director", slug: "ai-program-director" },
  { name: "AI Research Director", slug: "ai-research-director" },
  { name: "AI Innovation Lead", slug: "ai-innovation-lead" },
  { name: "AI Department Head", slug: "ai-department-head" },
  { name: "Chief AI Officer", slug: "chief-ai-officer" },

  // Support & Operations
  { name: "AI Support Engineer", slug: "ai-support-engineer" },
  { name: "AI Operations Manager", slug: "ai-operations-manager" },
  { name: "AI Documentation Specialist", slug: "ai-documentation-specialist" },
  { name: "AI Compliance Officer", slug: "ai-compliance-officer" },
  { name: "AI Customer Success Manager", slug: "ai-customer-success-manager" },

  // Education & Research
  { name: "AI Education Specialist", slug: "ai-education-specialist" },
  { name: "AI Research Coordinator", slug: "ai-research-coordinator" },
  { name: "AI Academic Researcher", slug: "ai-academic-researcher" },
  { name: "AI Curriculum Developer", slug: "ai-curriculum-developer" },

  // Emerging & Specialized
  { name: "Edge AI Developer", slug: "edge-ai-developer" },
  { name: "AI Hardware Specialist", slug: "ai-hardware-specialist" },
  { name: "Quantum AI Researcher", slug: "quantum-ai-researcher" },
  { name: "AutoML Engineer", slug: "automl-engineer" },
  { name: "AI Tools Developer", slug: "ai-tools-developer" },
  { name: "AI Platform Engineer", slug: "ai-platform-engineer" }
] as const;

export type Role = typeof roles[number];
export type RoleSlug = Role["slug"];
