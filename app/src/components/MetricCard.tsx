import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  hasAnomaly?: boolean;
}

export const MetricCard = ({ 
  title, 
  value, 
  unit, 
  status, 
  trend,
  hasAnomaly = false 
}: MetricCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      default: return 'success';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <Card className={`p-6 chart-container transition-all duration-300 ${
      hasAnomaly ? 'anomaly-pulse border-destructive' : ''
    }`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg">{getTrendIcon()}</span>
          {hasAnomaly && (
            <Badge variant="destructive" className="text-xs animate-pulse">
              ANOMALY
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold metric-glow ${
          hasAnomaly ? 'text-destructive' : 'text-primary'
        }`}>
          {value.toFixed(1)}
        </span>
        <span className="text-muted-foreground text-sm">{unit}</span>
      </div>
      
      <div className="mt-2">
        <Badge 
          variant={getStatusColor() === 'success' ? 'secondary' : 'destructive'}
          className="text-xs"
        >
          {status.toUpperCase()}
        </Badge>
      </div>
    </Card>
  );
};