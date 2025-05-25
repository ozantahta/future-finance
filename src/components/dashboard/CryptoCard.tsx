import { CryptoData } from "@/services/crypto";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface CryptoCardProps {
  crypto: CryptoData;
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const isPositive = crypto.percent_change_24h >= 0;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/40">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{crypto.symbol[0]}</span>
        </div>
        <div>
          <div className="font-medium text-white">{crypto.symbol}</div>
          <div className="text-sm text-gray-400">{crypto.name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium text-white">${crypto.price.toLocaleString()}</div>
        <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {Math.abs(crypto.percent_change_24h).toFixed(2)}%
        </div>
      </div>
    </div>
  );
} 