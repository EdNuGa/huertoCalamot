import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Line } from 'react-chartjs-2';

const HumedadTierraChart = () => {
  const [data, setData] = useState({ timestamp: [], humedad: [] });

  const fetchData = () => {
    fetch('/humedad/tierra')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        return response.json();
      })
      .then(newData => {
        setData({
          timestamp: newData.map(entry => new Date(entry.timestamp)),
          humedad: newData.map(entry => entry.humedad_tierra),
        });
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };

  useEffect(() => {
    fetchData(); // Realiza la primera solicitud al cargar el componente

    const intervalId = setInterval(fetchData, 5000); // Realiza una solicitud cada 5 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const chartData = {
    labels: data.timestamp,
    datasets: [
      {
        label: 'Humedad Tierra',
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

  return (
    <div style={{ backgroundColor: 'black', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'black', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ flex: '1' }}></div>
        <Link to="/" style={{ textDecoration: 'none' }}> {}
          <button style={{ backgroundColor: 'white', color: 'black', padding: '5px 10px', border: 'none', borderRadius: '5px', marginBottom: '10px' }}>Home</button>
        </Link>
        <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '10px' }}>Humedad Tierra</h2>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default HumedadTierraChart;
