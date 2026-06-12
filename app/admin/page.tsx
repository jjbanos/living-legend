import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import AdminClient from './admin-client'

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export default async function AdminPage() {
  const session = await auth()
  const email = session?.user?.email?.toLowerCase()

  if (!email || !adminEmails().includes(email)) {
    redirect('/dashboard')
  }

  return <AdminClient />
}
