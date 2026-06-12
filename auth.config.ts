import type { NextAuthConfig } from 'next-auth'

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/assessment',
  '/journal',
  '/classes',
  '/admin',
  '/onboarding',
]

// Edge-safe config shared by middleware and the server runtime.
// Keep Node-only imports (prisma, bcryptjs) out of this file — they live in auth.ts.
export const authConfig = {
  pages: { signIn: '/sign-in' },
  session: { strategy: 'jwt' },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isProtected = PROTECTED_PREFIXES.some((p) => nextUrl.pathname.startsWith(p))
      if (isProtected) return isLoggedIn
      if (isLoggedIn && (nextUrl.pathname.startsWith('/sign-in') || nextUrl.pathname.startsWith('/sign-up'))) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string
      return session
    },
  },
} satisfies NextAuthConfig
