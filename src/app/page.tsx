import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthButtonServer } from './components/auth-button-server'
import { PostLists } from './components/posts-list'
import { type Database } from './types/database'

export default async function Home () {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(name, avatar_url, user_name)')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className='max-w-[800px] mx-auto border-l border-r border-white/50 min-h-screen'>
        <AuthButtonServer />
        <PostLists posts={ posts } />
      </section>
    </main>
  )
}
