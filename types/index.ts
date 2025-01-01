export type TeamMember = {
  fullname: string;
  twitter?: string;
  job_role: string;
};

export type PortfolioItem = {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  url: string;
};

export type Agency = {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  email: string;
  telephone: string | null;
  twitter: string | null;
  linkedin: string | null;
  location: string | null;
  founded: string | null;
  website: string;
  skills: string[];
  categories: string[];
  logo_url: string | null;
  pitch_video_url: string | null;
  team: TeamMember[];
  team_size: string | null;
  starting_budget: string | null;
  portfolio: PortfolioItem[];
  projects_completed: string | null;
  status: "pending" | "approved";
  verified: boolean;
  created_at: string;
};
