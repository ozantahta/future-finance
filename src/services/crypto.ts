import { mockCryptoData } from './mockData';

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
  volume_24h: number;
  percent_change_24h: number;
}

export async function getTopCryptos(limit: number = 20): Promise<CryptoData[]> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`
    );

    if (response.status === 409) {
      console.warn('Rate limit exceeded, using mock data');
      return mockCryptoData;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      market_cap: coin.market_cap,
      volume_24h: coin.total_volume,
      percent_change_24h: coin.price_change_percentage_24h,
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return mockCryptoData;
  }
}

export const getPortfolioData = async (symbols: string[]): Promise<CryptoData[]> => {
  try {
    const response = await fetch(`/api/crypto?symbols=${symbols.join(',')}`);
    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid response format from API');
    }

    return data.map((crypto: any) => ({
      id: crypto.id,
      symbol: crypto.symbol.toUpperCase(),
      name: crypto.name,
      price: crypto.current_price,
      percent_change_24h: crypto.price_change_percentage_24h,
      market_cap: crypto.market_cap,
      volume_24h: crypto.total_volume,
    }));
  } catch (error) {
    return [];
  }
}; 