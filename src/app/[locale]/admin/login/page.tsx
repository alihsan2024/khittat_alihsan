'use client'

import { useState, useEffect } from 'react'
import { useRouter } from '@/src/navigation'
import { supabase } from '@/lib/supabase'
import Button from '../../components/Button'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push('/admin')
      }
    })
  }, [router])

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    router.push('/admin')
  }

  return (
    <div className='mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16'>
      <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
        Admin Login
      </h1>
      <form onSubmit={onLogin} className='space-y-4'>
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Email
          </label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white'
            required
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Password
          </label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white'
            required
          />
        </div>
        {error && <p className='text-sm text-red-600'>{error}</p>}
        <Button
          type='submit'
          variant='primary'
          size='large'
          className='w-full'
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>
    </div>
  )
}
