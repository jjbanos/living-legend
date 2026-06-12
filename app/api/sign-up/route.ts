import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown; password?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({ data: { email, passwordHash, name: name || null } })
  } catch (e) {
    if (e instanceof Error && 'code' in e && (e as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }
    throw e
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
