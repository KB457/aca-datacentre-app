import { MetricCard } from "@/components/MetricCard";
import { MetricChart } from "@/components/MetricChart";
import { AnomalyAlert } from "@/components/AnomalyAlert";
import { useMetricsSimulation } from "@/hooks/useMetricsSimulation";
import { Activity, Server, Thermometer } from "lucide-react";

const Index = () => {
  const { metrics, currentMetrics, anomalies } = useMetricsSimulation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary metric-glow">
                  AI Data Centre Monitor
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time metrics with anomaly detection
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground font-mono">
                  LIVE
                </span>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Anomaly Alerts */}
        <AnomalyAlert anomalies={anomalies} />

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="CPU Usage"
            value={currentMetrics.cpu?.value || 0}
            unit="%"
            status={(currentMetrics.cpu?.status || 'normal') as 'normal' | 'warning' | 'critical'}
            trend={(currentMetrics.cpu?.trend || 'stable') as 'up' | 'down' | 'stable'}
            hasAnomaly={currentMetrics.cpu?.hasAnomaly}
          />
          <MetricCard
            title="Memory Usage"
            value={currentMetrics.memory?.value || 0}
            unit="%"
            status={(currentMetrics.memory?.status || 'normal') as 'normal' | 'warning' | 'critical'}
            trend={(currentMetrics.memory?.trend || 'stable') as 'up' | 'down' | 'stable'}
            hasAnomaly={currentMetrics.memory?.hasAnomaly}
          />
          <MetricCard
            title="Temperature"
            value={currentMetrics.temperature?.value || 0}
            unit="°C"
            status={(currentMetrics.temperature?.status || 'normal') as 'normal' | 'warning' | 'critical'}
            trend={(currentMetrics.temperature?.trend || 'stable') as 'up' | 'down' | 'stable'}
            hasAnomaly={currentMetrics.temperature?.hasAnomaly}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-chart-cpu" />
              <h3 className="text-lg font-semibold">CPU Usage</h3>
            </div>
            <MetricChart
              title="CPU"
              data={metrics.cpu}
              color="hsl(var(--chart-cpu))"
              unit="%"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <Server className="h-4 w-4 text-chart-memory" />
              <h3 className="text-lg font-semibold">Memory Usage</h3>
            </div>
            <MetricChart
              title="Memory"
              data={metrics.memory}
              color="hsl(var(--chart-memory))"
              unit="%"
            />
          </div>
          
          <div className="space-y-2 lg:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="h-4 w-4 text-chart-temperature" />
              <h3 className="text-lg font-semibold">Temperature</h3>
            </div>
            <MetricChart
              title="Temperature"
              data={metrics.temperature}
              color="hsl(var(--chart-temperature))"
              unit="°C"
            />
          </div>
        </div>

        {/* System Status */}
        <div className="border-t border-border pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-card/30 p-4 rounded-lg border border-border">
              <div className="text-muted-foreground">Uptime</div>
              <div className="text-xl font-mono text-primary">99.8%</div>
            </div>
            <div className="bg-card/30 p-4 rounded-lg border border-border">
              <div className="text-muted-foreground">Data Points</div>
              <div className="text-xl font-mono text-primary">
                {metrics.cpu.length + metrics.memory.length + metrics.temperature.length}
              </div>
            </div>
            <div className="bg-card/30 p-4 rounded-lg border border-border">
              <div className="text-muted-foreground">Active Anomalies</div>
              <div className="text-xl font-mono text-primary">{anomalies.length}</div>
            </div>
            <div className="bg-card/30 p-4 rounded-lg border border-border">
              <div className="text-muted-foreground">Last Update</div>
              <div className="text-xl font-mono text-primary">
                {currentMetrics.cpu?.timestamp ? 
                  new Date(currentMetrics.cpu.timestamp).toLocaleTimeString() : '--:--'
                }
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            Demo App • KB
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
