import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface Anomaly {
  id: string;
  metric: string;
  value: number;
  threshold: number;
  timestamp: string;
  severity: 'warning' | 'critical';
}

interface AnomalyAlertProps {
  anomalies: Anomaly[];
}

export const AnomalyAlert = ({ anomalies }: AnomalyAlertProps) => {
  if (anomalies.length === 0) {
    return (
      <Alert className="border-success/20 bg-success/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <AlertTitle className="text-success">System Normal</AlertTitle>
        </div>
        <AlertDescription className="text-success/80">
          All metrics within normal operating parameters
        </AlertDescription>
      </Alert>
    );
  }

  const criticalCount = anomalies.filter(a => a.severity === 'critical').length;
  const warningCount = anomalies.filter(a => a.severity === 'warning').length;

  return (
    <Alert className="border-destructive/20 bg-destructive/5 anomaly-pulse">
      <AlertTriangle className="h-4 w-4 text-destructive" />
      <AlertTitle className="flex items-center gap-2 text-destructive">
        Anomalies Detected
        <div className="flex gap-1">
          {criticalCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {criticalCount} CRITICAL
            </Badge>
          )}
          {warningCount > 0 && (
            <Badge className="text-xs bg-warning text-warning-foreground">
              {warningCount} WARNING
            </Badge>
          )}
        </div>
      </AlertTitle>
      <AlertDescription className="text-foreground/80 mt-2">
        <div className="space-y-1">
          {anomalies.slice(0, 3).map((anomaly) => (
            <div key={anomaly.id} className="text-sm font-mono">
              <span className="text-primary">{anomaly.metric}</span>: {anomaly.value.toFixed(1)} 
              <span className="text-muted-foreground"> (threshold: {anomaly.threshold})</span>
              <span className="text-xs text-muted-foreground ml-2">
                {new Date(anomaly.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          {anomalies.length > 3 && (
            <div className="text-xs text-muted-foreground">
              +{anomalies.length - 3} more anomalies...
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};