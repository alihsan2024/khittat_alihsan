import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <section className='py-10'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8'>
        {children}
      </div>
    </section>
  )
}
