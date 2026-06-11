'use client'

import Link from 'next/link'

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-sm text-[#a1a1aa] hover:text-white">← Back to Dashboard</Link>
        <h1 className="text-4xl font-semibold tracking-tight mt-4 mb-2">Private Journal</h1>
        <p className="text-[#a1a1aa] mb-8">This space is yours alone. Write the truth.</p>

        <div className="border border-white/10 bg-[#121212] rounded-xl p-6">
          <textarea 
            className="w-full min-h-[200px] bg-transparent border border-white/10 rounded p-4 text-base focus:outline-none focus:border-[#C5A26F]/60" 
            placeholder="What happened today? What did you avoid? What courage did you show?"
          />
          <div className="mt-4 flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-[#C5A26F]" /> This is a Shadow Win
            </label>
          </div>
          <button className="mt-4 w-full h-11 rounded-full bg-[#C5A26F] hover:bg-[#B38B55] text-black font-semibold">Save Entry</button>
        </div>
      </div>
    </div>
  )
}
