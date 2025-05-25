import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="bg-gray-800/60 backdrop-blur-lg border border-gray-700/20 shadow-2xl">
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24 bg-gray-700/50" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32 bg-gray-700/50" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function PortfolioHoldingsSkeleton() {
  return (
    <Card className="bg-gray-800/60 backdrop-blur-lg border border-gray-700/20 shadow-2xl">
      <CardHeader>
        <Skeleton className="h-6 w-32 bg-gray-700/50" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/40">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full bg-gray-700/50" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-700/50" />
                  <Skeleton className="h-3 w-16 bg-gray-700/50" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-700/50" />
                  <Skeleton className="h-3 w-16 bg-gray-700/50" />
                </div>
                <Skeleton className="h-8 w-20 bg-gray-700/50" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PortfolioDistributionSkeleton() {
  return (
    <Card className="bg-gray-800/60 backdrop-blur-lg border border-gray-700/20 shadow-2xl">
      <CardHeader>
        <Skeleton className="h-6 w-32 bg-gray-700/50" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 bg-gray-700/50" />
                <Skeleton className="h-4 w-16 bg-gray-700/50" />
              </div>
              <Skeleton className="h-2 w-full bg-gray-700/50" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 