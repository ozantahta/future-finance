"use client"
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Info } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCryptoData } from "@/store/cryptoSlice";
import { CryptoData } from "@/services/crypto";
import { RootState } from "@/store/store";
import { PortfolioStatsSkeleton, PortfolioHoldingsSkeleton, PortfolioDistributionSkeleton } from "@/components/skeletons/PortfolioSkeletons";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";

// Mock user portfolio data
const userPortfolio = [
  { id: "bitcoin", amount: 0.5 },
  { id: "ethereum", amount: 2.5 },
  { id: "cardano", amount: 1000 },
  { id: "solana", amount: 50 },
  { id: "polkadot", amount: 100 },
];

// Chart colors for different cryptocurrencies
const chartColors = {
  bitcoin: "#F7931A",
  ethereum: "#627EEA",
  cardano: "#0033AD",
  solana: "#00FFA3",
  polkadot: "#E6007A",
  default: "#6366F1"
};

export default function Portfolio() {
  const dispatch = useAppDispatch();
  const { data: marketData, loading, error, usingMockData } = useAppSelector((state: RootState) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData());
    const interval = setInterval(() => {
      dispatch(fetchCryptoData());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [dispatch]);

  // Calculate portfolio statistics
  const portfolioData = userPortfolio.map(holding => {
    const cryptoData = marketData.find((crypto: CryptoData) => crypto.id === holding.id);
    if (!cryptoData) return null;
    return {
      ...cryptoData,
      amount: holding.amount,
      value: holding.amount * cryptoData.price,
    };
  }).filter((item): item is CryptoData & { amount: number; value: number } => item !== null);

  const totalValue = portfolioData.reduce((acc: number, curr) => acc + curr.value, 0);
  const avgChange = portfolioData.length > 0 
    ? portfolioData.reduce((acc: number, curr) => acc + curr.percent_change_24h, 0) / portfolioData.length 
    : 0;
  const bestPerformer = portfolioData.length > 0 
    ? portfolioData.reduce((max: CryptoData, curr: CryptoData) => 
        curr.percent_change_24h > max.percent_change_24h ? curr : max
      , portfolioData[0]).symbol 
    : '-';
  const worstPerformer = portfolioData.length > 0 
    ? portfolioData.reduce((min: CryptoData, curr: CryptoData) => 
        curr.percent_change_24h < min.percent_change_24h ? curr : min
      , portfolioData[0]).symbol 
    : '-';

  // Calculate portfolio distribution for chart
  const chartData = portfolioData.map(holding => ({
    name: holding.symbol,
    value: holding.value,
    percentage: (holding.value / totalValue) * 100,
    color: chartColors[holding.id as keyof typeof chartColors] || chartColors.default
  })).sort((a, b) => b.value - a.value);

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-white mb-8 crypto-heading">Portfolio Overview</h1>

      {usingMockData && (
        <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-center">
          <Info className="w-5 h-5 text-blue-400 mr-2" />
          <p className="text-sm text-blue-400">
            Using mock data due to API limitations. Real-time data will be restored when available.
          </p>
        </div>
      )}

      {error && !usingMockData && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Portfolio Stats */}
      {loading ? (
        <PortfolioStatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/60 backdrop-blur-lg border border-cyan-400/20 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 crypto-accent">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white price-animation truncate">
                ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-lg border border-purple-400/20 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 crypto-accent">24h Change</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${avgChange >= 0 ? 'text-green-400' : 'text-red-400'} price-animation truncate`}>
                {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-lg border border-green-400/20 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 crypto-accent">Best Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white truncate">
                {bestPerformer}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-lg border border-red-400/20 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 crypto-accent">Worst Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white truncate">
                {worstPerformer}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Holdings */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800/60 backdrop-blur-lg border border-cyan-400/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white crypto-accent">Your Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <PortfolioHoldingsSkeleton />
              ) : (
                <div className="space-y-4">
                  {portfolioData.map((holding) => (
                    <PortfolioCard key={holding.id} holding={holding} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Chart */}
        {loading ? (
          <PortfolioDistributionSkeleton />
        ) : (
          <PortfolioChart data={chartData} />
        )}
      </div>
    </DashboardLayout>
  );
} 