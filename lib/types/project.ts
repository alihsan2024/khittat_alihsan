/**
 * Project type definition
 */
export interface Project {
  id: string
  slug: string
  title: string
  title_ar?: string
  arabic_title?: string
  image_url: string
  brief_description: string
  brief_description_ar?: string | null
  arabic_desc?: string | null
  long_description: string | null
  upsell_text: string | null
  prices: Price[]
  created_at: string
  updated_at: string
}

/**
 * Price interface for the prices array
 */
export interface Price {
  amount: number
  currency?: string
  label?: string
  description?: string
}

/**
 * Project insert type (without auto-generated fields)
 */
export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>

/**
 * Project update type (all fields optional except slug for identification)
 */
export type ProjectUpdate = Partial<
  Omit<Project, 'id' | 'slug' | 'created_at'>
> & {
  slug?: never // Prevent slug updates
}
