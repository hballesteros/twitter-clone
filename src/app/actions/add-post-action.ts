'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export const addPost = async (formData: FormData) => {
  const content = formData.get('content')

  if (content === null) return

  const supabase = createServerActionClient({ cookies })
  // revisar si el usuario esta logueado
  const { data: { session } } = await supabase.auth.getSession()
  if (session === null) return

  await supabase.from('posts').insert({ content, user_id: session.user.id })

  // esto es de Next nomas
  revalidatePath(`/?content=${content.toString()}}`)
}
