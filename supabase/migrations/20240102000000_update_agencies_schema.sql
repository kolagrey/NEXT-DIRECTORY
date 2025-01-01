-- Drop existing columns and tables if they exist
DO $$ 
BEGIN
    -- Drop columns if they exist
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'agencies' AND column_name = 'team') THEN
        ALTER TABLE public.agencies DROP COLUMN team;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'agencies' AND column_name = 'portfolio') THEN
        ALTER TABLE public.agencies DROP COLUMN portfolio;
    END IF;
END $$;

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add new columns to agencies table
ALTER TABLE public.agencies
ADD COLUMN categories text[] DEFAULT '{}' NOT NULL,
ADD COLUMN pitch_video_url text;

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    agency_id uuid REFERENCES public.agencies(id) ON DELETE CASCADE,
    fullname text NOT NULL,
    job_role text NOT NULL,
    twitter text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT team_members_fullname_check CHECK (char_length(fullname) > 0),
    CONSTRAINT team_members_job_role_check CHECK (char_length(job_role) > 0)
);

-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS public.portfolio_items (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    agency_id uuid REFERENCES public.agencies(id) ON DELETE CASCADE,
    title text NOT NULL,
    url text NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT portfolio_items_title_check CHECK (char_length(title) > 0),
    CONSTRAINT portfolio_items_url_check CHECK (char_length(url) > 0)
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_team_members_agency_id ON public.team_members(agency_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_agency_id ON public.portfolio_items(agency_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_team_members_updated_at ON public.team_members;
CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON public.team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_portfolio_items_updated_at ON public.portfolio_items;
CREATE TRIGGER update_portfolio_items_updated_at
    BEFORE UPDATE ON public.portfolio_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Team members are viewable by everyone" ON public.team_members;
DROP POLICY IF EXISTS "Portfolio items are viewable by everyone" ON public.portfolio_items;
DROP POLICY IF EXISTS "Team members can be modified through service role only" ON public.team_members;
DROP POLICY IF EXISTS "Portfolio items can be modified through service role only" ON public.portfolio_items;

-- Create new policies
CREATE POLICY "Team members are viewable by everyone" ON public.team_members
    FOR SELECT USING (true);

CREATE POLICY "Portfolio items are viewable by everyone" ON public.portfolio_items
    FOR SELECT USING (true);

CREATE POLICY "Team members can be modified through service role only" ON public.team_members
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Portfolio items can be modified through service role only" ON public.portfolio_items
    FOR ALL USING (auth.role() = 'service_role');

-- Drop existing view if it exists
DROP VIEW IF EXISTS public.agencies_with_details;

-- Create view for easier querying
CREATE VIEW public.agencies_with_details AS
SELECT 
    a.*,
    COALESCE(
        json_agg(
            json_build_object(
                'id', tm.id,
                'fullname', tm.fullname,
                'job_role', tm.job_role,
                'twitter', tm.twitter
            )
        ) FILTER (WHERE tm.id IS NOT NULL), 
        '[]'::json
    ) as team,
    COALESCE(
        json_agg(
            json_build_object(
                'id', pi.id,
                'title', pi.title,
                'url', pi.url
            )
        ) FILTER (WHERE pi.id IS NOT NULL), 
        '[]'::json
    ) as portfolio
FROM public.agencies a
LEFT JOIN public.team_members tm ON tm.agency_id = a.id
LEFT JOIN public.portfolio_items pi ON pi.agency_id = a.id
GROUP BY a.id;

-- Add comments for documentation
COMMENT ON TABLE public.team_members IS 'Team members associated with agencies';
COMMENT ON TABLE public.portfolio_items IS 'Portfolio items associated with agencies';

COMMENT ON COLUMN public.agencies.categories IS 'Array of categories this agency belongs to';
COMMENT ON COLUMN public.agencies.pitch_video_url IS 'URL to the agency''s pitch video';
