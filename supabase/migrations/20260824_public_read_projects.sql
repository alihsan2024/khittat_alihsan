-- Keep RLS on, but allow the public site (anon key) to read projects.
-- Run this in the Supabase SQL Editor, then reload the site.

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated can read all projects" ON public.projects;

-- Homepage and /projects use the anon key and filter active = true in code.
-- Treat NULL active as visible so older rows still appear.
CREATE POLICY "Public can read active projects"
ON public.projects
FOR SELECT
TO anon
USING (coalesce(active, true) = true);

-- Admin dashboard lists every project, including inactive.
CREATE POLICY "Authenticated can read all projects"
ON public.projects
FOR SELECT
TO authenticated
USING (true);
