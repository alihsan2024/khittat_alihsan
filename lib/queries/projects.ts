import { supabase, createServerClient } from '../supabase'
import type { Project, ProjectInsert, ProjectUpdate } from '../types/project'

/**
 * Get all active projects (public listing)
 */
export async function getAllProjects() {
  const { data, error } = await createServerClient()
    .from('projects')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

/**
 * Get a single project by slug (only active projects)
 */
export async function getProjectBySlug(slug: string) {
  const { data, error } = await createServerClient()
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error) throw error
  return data as Project
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string) {
  const { data, error } = await createServerClient()
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Project
}

/**
 * Create a new project (defaults to active: true)
 */
export async function createProject(project: ProjectInsert) {
  const payload = { ...project, active: project.active ?? true }
  const { data, error } = await createServerClient()
    .from('projects')
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data as Project
}

/**
 * Update a project by slug
 */
export async function updateProjectBySlug(
  slug: string,
  updates: ProjectUpdate
) {
  const { data, error } = await createServerClient()
    .from('projects')
    .update(updates)
    .eq('slug', slug)
    .select()
    .single()

  if (error) throw error
  return data as Project
}

/**
 * Delete a project by slug
 */
export async function deleteProjectBySlug(slug: string) {
  const { data, error } = await createServerClient()
    .from('projects')
    .delete()
    .eq('slug', slug)
    .select()
    .single()

  if (error) throw error
  return data as Project
}

/**
 * Client-side: Get all active projects (public listing)
 */
export async function getAllProjectsClient() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

/**
 * Client-side: Get all projects including inactive (admin only)
 */
export async function getAllProjectsForAdmin() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

/**
 * Client-side: Get a project by slug (only active)
 */
export async function getProjectBySlugClient(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error) throw error
  return data as Project
}
