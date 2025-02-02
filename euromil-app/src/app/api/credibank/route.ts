import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'  // Importante!

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const accountId = searchParams.get('accountId')
  const value = searchParams.get('value')

  try {
    const response = await fetch(
      `http://localhost:8080/get-check?accountId=${accountId}&value=${value}`
    )

    if (!response.ok) {
      throw new Error('Response not OK')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pedido' },
      { status: 500 }
    )
  }
}