import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface RecentPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  trend: 'up' | 'down';
  icon: string;
  color: string;
}

interface QuickAction {
  action: string;
  color: string;
}

interface RecentPricesProps {
  prices: RecentPrice[];
  quickActions: QuickAction[];
}

export const RecentPrices = ({ prices, quickActions }: RecentPricesProps) => {
  return (
    <Card className="bg-gray-800/60 backdrop-blur-lg border border-purple-400/20 shadow-2xl cyber-border">
      <CardHeader>
        <CardTitle className="text-white crypto-accent">Recent Price Changes (Favorites)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prices.map((crypto, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/30 hover:border-cyan-400/30 hover:shadow-lg">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl glow-effect"
                  style={{ 
                    backgroundColor: crypto.color,
                    boxShadow: `0 0 20px ${crypto.color}40`
                  }}
                >
                  {crypto.icon}
                </div>
                <div>
                  <div className="font-bold text-white text-lg crypto-heading">{crypto.name}</div>
                  <div className="text-sm text-gray-400 font-medium crypto-accent">{crypto.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white text-xl crypto-heading">${crypto.price.toLocaleString()}</div>
                <div className={`flex items-center justify-end text-sm font-medium ${crypto.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.trend === 'up' ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
                  <span className="crypto-accent">{Math.abs(crypto.change)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Buy Actions */}
        <div className="mt-6 pt-6 border-t border-gray-600/30">
          <h4 className="font-medium text-gray-300 mb-4 crypto-accent">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                className={`${action.color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 crypto-accent glow-effect`}
              >
                {action.action}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 