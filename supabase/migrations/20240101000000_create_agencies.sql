create table public.agencies (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  short_description text not null,
  full_description text not null,
  email text not null,
  twitter text,
  website text not null,
  skills text[] not null,
  logo_url text,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.agencies enable row level security;

-- Create a storage bucket for logos
insert into storage.buckets (id, name)
values ('logos', 'logos')
on conflict do nothing;

-- Set up storage policies
create policy "Logos are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'logos' );

create policy "Anyone can upload a logo"
  on storage.objects for insert
  with check ( bucket_id = 'logos' );
