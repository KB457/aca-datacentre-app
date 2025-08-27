import { useState, useEffect, useCallback } from 'react';

interface MetricData {
  timestamp: string;
  value: number;
}

interface Anomaly {
  id: string;
  metric: string;
  value: number;
  threshold: number;
  timestamp: string;
  severity: 'warning' | 'critical';
}

interface MetricsState {
  cpu: MetricData[];
  memory: MetricData[];
  temperature: MetricData[];
  anomalies: Anomaly[];
}

export const useMetricsSimulation = () => {
  const [metrics, setMetrics] = useState<MetricsState>({
    cpu: [],
    memory: [],
    temperature: [],
    anomalies: [],
  });

  // Simulate realistic data patterns
  const generateCPUValue = (baseValue: number): number => {
    // CPU usage with some spikes and normal fluctuation
    const spike = Math.random() < 0.05 ? Math.random() * 40 : 0; // 5% chance of spike
    const normal = baseValue + (Math.random() - 0.5) * 20;
    return Math.max(0, Math.min(100, normal + spike));
  };

  const generateMemoryValue = (baseValue: number): number => {
    // Memory usage is more stable, gradual changes
    const change = (Math.random() - 0.5) * 5;
    return Math.max(0, Math.min(100, baseValue + change));
  };

  const generateTemperatureValue = (baseValue: number): number => {
    // Temperature correlates somewhat with CPU usage
    const change = (Math.random() - 0.5) * 8;
    return Math.max(20, Math.min(85, baseValue + change));
  };

  // Anomaly detection using simple thresholds
  const detectAnomalies = useCallback((cpu: number, memory: number, temperature: number): Anomaly[] => {
    const anomalies: Anomaly[] = [];
    const timestamp = new Date().toISOString();

    // CPU anomalies
    if (cpu > 85) {
      anomalies.push({
        id: `cpu-${Date.now()}`,
        metric: 'CPU Usage',
        value: cpu,
        threshold: 85,
        timestamp,
        severity: cpu > 95 ? 'critical' : 'warning',
      });
    }

    // Memory anomalies
    if (memory > 90) {
      anomalies.push({
        id: `memory-${Date.now()}`,
        metric: 'Memory Usage',
        value: memory,
        threshold: 90,
        timestamp,
        severity: memory > 95 ? 'critical' : 'warning',
      });
    }

    // Temperature anomalies
    if (temperature > 75) {
      anomalies.push({
        id: `temp-${Date.now()}`,
        metric: 'Temperature',
        value: temperature,
        threshold: 75,
        timestamp,
        severity: temperature > 80 ? 'critical' : 'warning',
      });
    }

    return anomalies;
  }, []);

  const getMetricStatus = (value: number, type: 'cpu' | 'memory' | 'temperature'): 'normal' | 'warning' | 'critical' => {
    const thresholds = {
      cpu: { warning: 70, critical: 85 },
      memory: { warning: 80, critical: 90 },
      temperature: { warning: 65, critical: 75 },
    };

    const threshold = thresholds[type];
    if (value >= threshold.critical) return 'critical';
    if (value >= threshold.warning) return 'warning';
    return 'normal';
  };

  const getTrend = (data: MetricData[]): 'up' | 'down' | 'stable' => {
    if (data.length < 2) return 'stable';
    const recent = data.slice(-3);
    const avg = recent.reduce((sum, d) => sum + d.value, 0) / recent.length;
    const diff = recent[recent.length - 1].value - avg;
    
    if (Math.abs(diff) < 2) return 'stable';
    return diff > 0 ? 'up' : 'down';
  };

  useEffect(() => {
    let cpuBase = 45;
    let memoryBase = 60;
    let temperatureBase = 50;

    const interval = setInterval(() => {
      const timestamp = new Date().toISOString();
      
      // Generate new values
      const cpuValue = generateCPUValue(cpuBase);
      const memoryValue = generateMemoryValue(memoryBase);
      const temperatureValue = generateTemperatureValue(temperatureBase);

      // Update base values for next iteration (gradual drift)
      cpuBase = cpuValue * 0.7 + cpuBase * 0.3;
      memoryBase = memoryValue * 0.9 + memoryBase * 0.1;
      temperatureBase = temperatureValue * 0.8 + temperatureBase * 0.2;

      // Detect anomalies
      const newAnomalies = detectAnomalies(cpuValue, memoryValue, temperatureValue);

      setMetrics(prev => {
        const newMetrics = {
          cpu: [...prev.cpu, { timestamp, value: cpuValue }].slice(-50),
          memory: [...prev.memory, { timestamp, value: memoryValue }].slice(-50),
          temperature: [...prev.temperature, { timestamp, value: temperatureValue }].slice(-50),
          anomalies: [...newAnomalies, ...prev.anomalies.filter(a => 
            Date.now() - new Date(a.timestamp).getTime() < 300000 // Keep anomalies for 5 minutes
          )].slice(0, 10), // Keep only recent anomalies
        };
        return newMetrics;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [detectAnomalies]);

  // Get current values and their statuses
  const getCurrentMetrics = () => {
    const cpu = metrics.cpu[metrics.cpu.length - 1];
    const memory = metrics.memory[metrics.memory.length - 1];
    const temperature = metrics.temperature[metrics.temperature.length - 1];

    return {
      cpu: {
        ...cpu,
        status: cpu ? getMetricStatus(cpu.value, 'cpu') : 'normal',
        trend: getTrend(metrics.cpu),
        hasAnomaly: metrics.anomalies.some(a => a.metric === 'CPU Usage'),
      },
      memory: {
        ...memory,
        status: memory ? getMetricStatus(memory.value, 'memory') : 'normal',
        trend: getTrend(metrics.memory),
        hasAnomaly: metrics.anomalies.some(a => a.metric === 'Memory Usage'),
      },
      temperature: {
        ...temperature,
        status: temperature ? getMetricStatus(temperature.value, 'temperature') : 'normal',
        trend: getTrend(metrics.temperature),
        hasAnomaly: metrics.anomalies.some(a => a.metric === 'Temperature'),
      },
    };
  };

  return {
    metrics,
    currentMetrics: getCurrentMetrics(),
    anomalies: metrics.anomalies,
  };
};