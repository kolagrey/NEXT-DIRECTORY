export interface TeamMember {
  id?: string;
  agency_id?: string;
  fullname: string;
  job_role: string;
  twitter?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioItem {
  id?: string;
  agency_id?: string;
  title: string;
  url: string;
  created_at?: string;
  updated_at?: string;
}

export interface Agency {
  id?: string;
  title: string;
  short_description: string;
  full_description: string;
  email: string;
  location?: string;
  twitter?: string;
  linkedin?: string;
  telephone?: string;
  founded?: string;
  projects_completed?: string;
  website: string;
  experience: string[];
  skills: string[];
  logo_url?: string;
  pitch_video_url?: string;
  categories: string[];
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
  slug?: string;
}

export interface AgencyWithDetails extends Agency {
  team: TeamMember[];
  portfolio: PortfolioItem[];
}

export interface ConfigProps {
  appLogo: string;
  appName: string;
  appDescription: string;
  domainName: string;
  baseURL: string;
  isDevEnv: boolean;
  resend: {
    apiKey: string;
    subdomain: string;
    fromNoReply: string;
    fromAdmin: string;
    supportEmail?: string;
    forwardRepliesTo?: string;
  };
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  NEXT_PUBLIC_MICROSOFT_CLARITY: string;
  OPENAI_API_KEY: string;
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  NEXT_PUBLIC_SUPABASE_BUCKET: string;
  RESEND_API_KEY: string;
  NEXTAUTH_SECRET: string;
}