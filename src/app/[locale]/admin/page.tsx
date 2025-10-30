'use client'

import { useEffect, useState } from 'react'
import { useRouter } from '@/src/navigation'
import { supabase } from '@/lib/supabase'
import Button from '../components/Button'
import type { Project } from '@/lib/types/project'
import { getAllProjectsClient } from '@/lib/queries/projects'

function useAuthGuard() {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/admin/login')
      }
    })
  }, [router])
}

export default function AdminDashboardPage() {
  useAuthGuard()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    try {
      const data = await getAllProjectsClient()
      setProjects(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Admin Dashboard
        </h1>
        <Button onClick={logout} variant='secondary' size='small'>
          Log out
        </Button>
      </div>

      <ProjectEditor onSaved={refresh} />

      <div className='rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
        <h2 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
          Projects
        </h2>
        {loading ? (
          <p className='text-gray-600 dark:text-gray-300'>Loading…</p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full text-left text-sm'>
              <thead>
                <tr className='border-b border-gray-200 dark:border-gray-800'>
                  <th className='py-2 pr-4'>Title</th>
                  <th className='py-2 pr-4'>Slug</th>
                  <th className='py-2 pr-4'>Image</th>
                  <th className='py-2 pr-4'>Updated</th>
                  <th className='py-2 pr-4'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr
                    key={p.id}
                    className='border-b border-gray-100 dark:border-gray-800'
                  >
                    <td className='py-2 pr-4'>{p.title}</td>
                    <td className='py-2 pr-4'>{p.slug}</td>
                    <td className='py-2 pr-4'>
                      <a
                        href={p.image_url}
                        target='_blank'
                        rel='noreferrer'
                        className='text-primary-300 underline'
                      >
                        View
                      </a>
                    </td>
                    <td className='py-2 pr-4'>
                      {new Date(p.updated_at).toLocaleString()}
                    </td>
                    <td className='py-2 pr-4'>
                      <RowImageUpdater projectId={p.id} onDone={refresh} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectEditor({ onSaved }: { onSaved: () => void }) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [brief, setBrief] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onUpload = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      const ext = file.name.split('.').pop()
      const path = `banners/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        })
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from('banners').getPublicUrl(path)
      setImageUrl(data.publicUrl)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setUploading(false)
    }
  }

  const onSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const payload = {
        slug,
        title,
        image_url: imageUrl,
        brief_description: brief,
        long_description: null,
        upsell_text: null,
        prices: []
      }
      const { error } = await supabase.from('projects').insert(payload)
      if (error) throw error
      setTitle('')
      setSlug('')
      setBrief('')
      setImageUrl('')
      onSaved()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
      <h2 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
        Create Project
      </h2>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Title
          </label>
          <input
            className='w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Slug
          </label>
          <input
            className='w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white'
            value={slug}
            onChange={e => setSlug(e.target.value)}
          />
        </div>
        <div className='sm:col-span-2'>
          <label className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Brief Description
          </label>
          <textarea
            className='w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white'
            rows={3}
            value={brief}
            onChange={e => setBrief(e.target.value)}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Banner Image
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={e => e.target.files && onUpload(e.target.files[0])}
          />
          {uploading && <p className='text-xs text-gray-500'>Uploading…</p>}
          {imageUrl && (
            <a
              href={imageUrl}
              target='_blank'
              rel='noreferrer'
              className='mt-1 block text-xs text-primary-300 underline'
            >
              View uploaded
            </a>
          )}
        </div>
      </div>
      {error && <p className='mt-3 text-sm text-red-600'>{error}</p>}
      <div className='mt-4'>
        <Button
          onClick={onSave}
          variant='primary'
          size='medium'
          disabled={saving || !title || !slug}
        >
          {saving ? 'Saving…' : 'Save Project'}
        </Button>
      </div>
    </div>
  )
}

function RowImageUpdater({
  projectId,
  onDone
}: {
  projectId: string
  onDone: () => void
}) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const onUpload = async (file: File) => {
    setBusy(true)
    setErr(null)
    try {
      const ext = file.name.split('.').pop()
      const path = `banners/${projectId}-${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(path, file, { cacheControl: '3600', upsert: true })
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from('banners').getPublicUrl(path)
      const { error: updateError } = await supabase
        .from('projects')
        .update({ image_url: data.publicUrl })
        .eq('id', projectId)
      if (updateError) throw updateError
      onDone()
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <label className='inline-flex cursor-pointer items-center rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'>
        <input
          type='file'
          accept='image/*'
          className='hidden'
          onChange={e => e.target.files && onUpload(e.target.files[0])}
          disabled={busy}
        />
        {busy ? 'Uploading…' : 'Update Image'}
      </label>
      {err && <span className='text-xs text-red-600'>{err}</span>}
    </div>
  )
}
