import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MetricChartProps {
  title: string;
  data: { timestamp: string; value: number }[];
  color: string;
  unit: string;
}

export const MetricChart = ({ title, data, color, unit }: MetricChartProps) => {
  const chartData = {
    labels: data.slice(-20).map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: title,
        data: data.slice(-20).map(d => d.value),
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${title} (${unit})`,
        color: 'hsl(0 0% 98%)',
        font: {
          family: 'monospace',
          size: 14,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: 'hsl(0 0% 6%)',
        borderColor: color,
        borderWidth: 1,
        titleColor: 'hsl(0 0% 98%)',
        bodyColor: 'hsl(0 0% 98%)',
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y.toFixed(1)} ${unit}`,
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'hsl(var(--grid-line))',
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'hsl(0 0% 65%)',
          font: {
            family: 'monospace',
            size: 10,
          },
        },
      },
      y: {
        display: true,
        grid: {
          color: 'hsl(var(--grid-line))',
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'hsl(0 0% 65%)',
          font: {
            family: 'monospace',
            size: 10,
          },
          callback: (value) => `${value}${unit}`,
        },
      },
    },
    elements: {
      point: {
        borderWidth: 0,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="chart-container rounded-lg p-4 h-64">
      <Line data={chartData} options={options} />
    </div>
  );
};