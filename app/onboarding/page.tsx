'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Onboarding() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const complete = async () => {
    if (!confirmed) return
    setLoading(true)
    
    try {
      await fetch('/api/onboarding', { method: 'POST' })
    } catch {
      // Entry is not blocked if the flag fails to persist
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
      <div className="max-w-lg w-full border border-white/10 bg-[#121212] rounded-xl p-8">
        <h1 className="text-3xl font-semibold tracking-tight">One quick gate.</h1>
        <p className="mt-4 text-[#a1a1aa]">This platform exists for men doing serious inner work.</p>

        <div className="my-6 rounded-lg border border-white/10 bg-black/60 p-5 text-sm">
          By continuing you confirm:
          <ul className="mt-3 space-y-1.5 list-none">
            <li>• I am a biological male</li>
            <li>• I am here for myself</li>
            <li>• I understand this involves shadow, discipline, and uncomfortable honesty</li>
          </ul>
        </div>

        <label className="flex items-start gap-3 text-sm mb-6 cursor-pointer">
          <input 
            type="checkbox" 
            checked={confirmed} 
            onChange={(e) => setConfirmed(e.target.checked)} 
            className="mt-1 accent-[#C5A26F]" 
          />
          <span>I am a man committed to this path and accept full responsibility for my growth.</span>
        </label>

        <button 
          onClick={complete} 
          disabled={!confirmed || loading}
          className="w-full h-12 rounded-full bg-[#C5A26F] hover:bg-[#B38B55] disabled:opacity-50 text-black font-semibold"
        >
          {loading ? "Saving..." : "I Confirm. Enter Living Legend →"}
        </button>
      </div>
    </div>
  )
}
