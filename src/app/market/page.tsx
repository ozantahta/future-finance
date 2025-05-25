"use client"
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Info } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCryptoData } from "@/store/cryptoSlice";
import { CryptoData } from "@/services/crypto";
import { RootState } from "@/store/store";
import { MarketStatsSkeleton, MarketTableSkeleton } from "@/components/skeletons/MarketSkeletons";
import { MarketCard } from "@/components/market/MarketCard";

export default function Market() {
  const dispatch = useAppDispatch();
  const { data: marketData, loading, error, usingMockData } = useAppSelector((state: RootState) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData());
    const interval = setInterval(() => {
      dispatch(fetchCryptoData());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [dispatch]);

  if (error && !usingMockData) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">API Rate Limit Exceeded</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <p className="text-sm text-gray-400">
              The free tier of CoinGecko API has rate limits. Please wait a few minutes before trying again.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate market statistics
  const totalMarketCap = marketData.reduce((acc: number, curr: CryptoData) => acc + curr.market_cap, 0);
  const totalVolume = marketData.reduce((acc: number, curr: CryptoData) => acc + curr.volume_24h, 0);
  const topGainer = marketData.length > 0 
    ? marketData.reduce((max: CryptoData, curr: CryptoData) => 
        curr.percent_change_24h > max.percent_change_24h ? curr : max
      , marketData[0]).symbol 
    : '-';
  const topLoser = marketData.length > 0 
    ? marketData.reduce((min: CryptoData, curr: CryptoData) => 
        curr.percent_change_24h < min.percent_change_24h ? curr : min
      , marketData[0]).symbol 
    : '-';

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-white mb-8 crypto-heading">Market Overview</h1>

      {usingMockData && (
        <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-center">
          <Info className="w-5 h-5 text-blue-400 mr-2" />
          <p className="text-sm text-blue-400">
            Using mock data due to API limitations. Real-time data will be restored when available.
          </p>
        </div>
      )}

      {/* Market Stats */}
      {loading ? (
        <MarketStatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/60 backdrop-blur-lg border border-cyan-400/20 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 crypto-accent">Total Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white price-animation truncate">
                ${totalMarketCap.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-lg border border-purple-400/20 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 crypto-accent">24h Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white price-animation truncate">
                ${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-lg border border-green-400/20 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 crypto-accent">Top Gainers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white truncate">
                {topGainer}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-lg border border-red-400/20 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 crypto-accent">Top Losers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white truncate">
                {topLoser}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Market Table */}
      {loading ? (
        <MarketTableSkeleton />
      ) : (
        <Card className="bg-gray-800/60 backdrop-blur-lg border border-cyan-400/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white crypto-accent">Top Cryptocurrencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {marketData.map((crypto: CryptoData) => (
                <MarketCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
} 