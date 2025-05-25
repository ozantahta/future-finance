import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  gradient?: string;
  borderColor?: string;
  valueColor?: string;
  changeColor?: string;
}

export const StatsCard = ({
  title,
  value,
  change,
  trend,
  gradient,
  borderColor = "border-cyan-400/20",
  valueColor = "text-white",
  changeColor = "text-green-400"
}: StatsCardProps) => {
  return (
    <Card className={`${gradient ? gradient : 'bg-gray-800/60 backdrop-blur-lg'} ${borderColor} shadow-2xl ${gradient ? 'border-0' : 'cyber-border'}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-300 crypto-accent">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold crypto-heading ${valueColor}`}>{value}</div>
        <div className={`flex items-center text-sm ${changeColor}`}>
          {trend === 'up' ? <ArrowUp size={16} className="mr-1" /> : <TrendingUp size={16} className="mr-1" />}
          {change}
        </div>
      </CardContent>
    </Card>
  );
}; 