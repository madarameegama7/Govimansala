import { NextRequest, NextResponse } from 'next/server'

const SERVICE_MAP = {
  auth: 'http://localhost:3001',
  orders: 'http://localhost:3002'
}

export async function POST(req: NextRequest) {
  const path = req.nextUrl.pathname
  const [_, api, service] = path.split('/')
  
  if (!SERVICE_MAP[service as keyof typeof SERVICE_MAP]) {
    return NextResponse.json(
      { error: 'Service not found' },
      { status: 404 }
    )
  }

  try {
    const targetUrl = `${SERVICE_MAP[service as keyof typeof SERVICE_MAP]}${path.replace(`/api/${service}`, '')}`
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify(await req.json())
    })
    
    return new NextResponse(res.body, {
      status: res.status,
      headers: res.headers
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Service unavailable' },
      { status: 503 }
    )
  }
}