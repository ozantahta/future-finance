import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { CryptoData } from "@/services/crypto";

interface PortfolioCardProps {
  holding: CryptoData & { amount: number; value: number };
}

export function PortfolioCard({ holding }: PortfolioCardProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/30 hover:border-cyan-400/30">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {holding.symbol.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-white text-lg truncate max-w-[150px]">{holding.name}</div>
          <div className="text-sm text-gray-400 font-medium">{holding.amount} {holding.symbol}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-white text-lg price-animation truncate max-w-[120px]">
          ${holding.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={`flex items-center justify-end text-sm font-medium ${holding.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {holding.percent_change_24h >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
          {Math.abs(holding.percent_change_24h).toFixed(2)}%
        </div>
      </div>
    </div>
  );
} 