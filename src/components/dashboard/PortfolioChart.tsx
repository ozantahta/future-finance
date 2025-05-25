import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Pie, Legend, TooltipProps } from "recharts";

interface PortfolioData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface PortfolioChartProps {
  data: PortfolioData[];
}

export const PortfolioChart = ({ data }: PortfolioChartProps) => {
  const renderCustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as PortfolioData;
      return (
        <div className="bg-gray-900/95 backdrop-blur-lg p-4 rounded-lg shadow-2xl border border-cyan-400/30 glow-effect">
          <p className="font-bold text-cyan-400 crypto-accent text-sm">{data.name}</p>
          <p className="text-xs text-gray-300">
            Value: <span className="font-semibold text-white">${data.value.toLocaleString()}</span>
          </p>
          <p className="text-xs text-gray-300">
            Share: <span className="font-semibold text-white">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-800/60 backdrop-blur-lg border border-cyan-400/20 shadow-2xl cyber-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <PieChart size={20} className="text-cyan-400" />
          <span className="crypto-accent">Portfolio Distribution</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke={entry.color}
                    strokeWidth={3}
                    className="hover:opacity-80 transition-opacity duration-200 drop-shadow-lg"
                  />
                ))}
              </Pie>
              <Tooltip content={renderCustomTooltip} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color }} className="text-sm font-medium crypto-accent">
                    {value}
                  </span>
                )}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/30 transition-colors border border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-lg glow-effect" 
                  style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}40` }}
                ></div>
                <span className="text-sm font-medium text-gray-300 crypto-accent">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white crypto-heading">${item.value.toLocaleString()}</div>
                <div className="text-xs text-gray-400">{item.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 