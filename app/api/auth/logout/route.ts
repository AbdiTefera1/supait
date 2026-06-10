import { NextResponse } from 'next/server'
export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('ts_token')
  return response
}
