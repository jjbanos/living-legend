import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">LIVING LEGEND</h1>
          <p className="text-[#a1a1aa] mt-2">Create your account. Men only.</p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              card: "bg-[#121212] border border-white/10",
              headerTitle: "text-white",
              formButtonPrimary: "bg-[#C5A26F] hover:bg-[#B38B55] text-black font-semibold",
            }
          }}
        />
        <p className="text-center text-xs text-[#666] mt-6">
          By signing up you confirm you are a biological male seeking serious self-improvement work.
        </p>
      </div>
    </div>
  )
}
