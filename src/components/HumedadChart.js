import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const HumedadChart = ({ data }) => {
  const chartData = {
    labels: data.timestamp,
    datasets: [
      {
        label: 'Humedad',
        data: data.humedad,
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default HumedadChart;