import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

// es es una opcion de Next.js para evitar que cachee de forma
// estatica la ruta, y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic'
export async function GET (request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code != null) {
    const supabase = createRouteHandlerClient({ cookies })
    // usando el codigo que hemos pasado por URL
    // nos devuelve la sesion de usuario
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestUrl.origin)
}
