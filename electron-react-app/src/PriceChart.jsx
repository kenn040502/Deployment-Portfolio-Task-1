import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend);

export default function PriceChart({ coins, prices }) {
  const labels = coins.map(c => c.symbol);
  const data = coins.map(c => prices[c.id]?.usd ?? 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Price (USD)',
        data,
        backgroundColor: [
          'rgba(247, 147, 26, 0.8)',
          'rgba(98, 126, 234, 0.8)',
          'rgba(153, 69, 255, 0.8)',
          'rgba(0, 163, 255, 0.8)',
          'rgba(0, 193, 212, 0.8)',
        ],
        borderColor: [
          '#f7931a',
          '#627eea',
          '#9945ff',
          '#00a3ff',
          '#00c1d4',
        ],
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Current Prices (USD)',
        color: '#fff',
        font: { size: 14 },
      },
      tooltip: {
        callbacks: {
          label: ctx => ` $${ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#8a8fa8' },
        grid: { color: '#1e2130' },
      },
      y: {
        type: 'logarithmic',
        ticks: {
          color: '#8a8fa8',
          callback: val => '$' + Number(val).toLocaleString(),
        },
        grid: { color: '#1e2130' },
      },
    },
  };

  return (
    <div style={styles.container}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1a1d2e',
    borderRadius: 12,
    padding: '16px 20px',
    border: '1px solid #252840',
    marginBottom: 12,
  },
};
