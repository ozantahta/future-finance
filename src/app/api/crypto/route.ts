import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '5';
    const symbols = searchParams.get('symbols');

    let url = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = new URLSearchParams({
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: limit,
      page: '1',
      sparkline: 'false',
      price_change_percentage: '24h'
    });

    if (symbols) {
      params.append('ids', symbols);
    }

    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch crypto data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 