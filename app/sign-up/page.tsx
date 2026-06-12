'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch('/api/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      setError(data?.error ?? 'Something went wrong. Try again.')
      setLoading(false)
      return
    }

    const result = await signIn('credentials', { email, password, redirect: false })
    if (result?.error) {
      router.push('/sign-in')
      return
    }

    router.push('/onboarding')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">LIVING LEGEND</h1>
          <p className="text-[#a1a1aa] mt-2">Create your account. Men only.</p>
        </div>

        <form onSubmit={submit} className="bg-[#121212] border border-white/10 rounded-xl p-8 space-y-4">
          <div>
            <label htmlFor="name" className="text-xs text-[#666] block mb-1.5">FIRST NAME</label>
            <input
              id="name"
              type="text"
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A26F]/50"
            />
          </div>
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
            <label htmlFor="password" className="text-xs text-[#666] block mb-1.5">PASSWORD (MIN 8 CHARACTERS)</label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-[#a1a1aa]">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#C5A26F] hover:underline">Sign in</Link>
          </p>
        </form>

        <p className="text-center text-xs text-[#666] mt-6">
          By signing up you confirm you are a biological male seeking serious self-improvement work.
        </p>
      </div>
    </div>
  )
}
