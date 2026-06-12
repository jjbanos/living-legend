'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', { email, password, redirect: false })

    if (result?.error) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">LIVING LEGEND</h1>
          <p className="text-[#a1a1aa] mt-2">Sign in to continue forging your legacy.</p>
        </div>

        <form onSubmit={submit} className="bg-[#121212] border border-white/10 rounded-xl p-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-xs text-[#666] block mb-1.5">EMAIL</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A26F]/50"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs text-[#666] block mb-1.5">PASSWORD</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A26F]/50"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-[#C5A26F] hover:bg-[#B38B55] disabled:opacity-50 text-black font-semibold"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-[#a1a1aa]">
            No account yet?{' '}
            <Link href="/sign-up" className="text-[#C5A26F] hover:underline">Create one</Link>
          </p>
        </form>

        <p className="text-center text-xs text-[#666] mt-6">
          Men only. Private. No social features.
        </p>
      </div>
    </div>
  )
}
