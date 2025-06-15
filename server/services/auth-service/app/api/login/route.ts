import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  
  // Mock authentication
  if (email === 'admin@example.com' && password === 'password') {
    return NextResponse.json({ 
      token: 'mock-jwt-token',
      user: { id: 1, email }
    })
  }
  
  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  )
}