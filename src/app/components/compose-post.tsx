import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { ComposePostTextarea } from './compose-post-textarea'
import { ComposePostButton } from './compose-post-button'

export function ComposePost ({
  userAvatarUrl
}: {
  userAvatarUrl: string
}) {
  const addPost = async (formData: FormData) => {
    'use server'

    const content = formData.get('content')

    if (content === null) return

    const supabase = createServerActionClient({ cookies })

    // revisar si el usuario esta logueado
    const { data: { session } } = await supabase.auth.getSession()
    if (session === null) return

    await supabase.from('posts').insert({ content, user_id: session.user.id })

    // esto es de Next nomas
    revalidatePath('/')
  }

  return (
        <form action={addPost} className='flex flex-row p-3 border-b border-white/50'>
            <img className='rounded-full w-10 h-10 object-contain mr-4' src={ userAvatarUrl } />
            <div className='flex flex-1 flex-col gap-y-4'>
               <ComposePostTextarea />
               <ComposePostButton />
            </div>
        </form>
  )
}
