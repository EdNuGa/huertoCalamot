import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './css/Style.css';
import HumedadChart from './components/HumedadChart';
import TemperaturaChart from './components/TemperaturaChart';
import HumedadTierra from './components/HumedadTierraChart'; 
import DataView from './components/TableDataView'; 

function App() {
  const [data, setData] = useState({ humedad: [], mediana: [], timestamp: [], ultimas_temperaturas: [] });
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch('/temperatura')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        return response.json();
      })
      .then(newData => {
        //Lee los datos almacenados en localStorage
        const storedData = JSON.parse(localStorage.getItem('data')) || {
          humedad: [],
          mediana: [],
          timestamp: [],
          ultimas_temperaturas: [],
        };
        //Actualiza los datos almacenados
        const updatedData = {
          humedad: [...storedData.humedad, newData.humedad],
          mediana: [...storedData.mediana, newData.mediana],
          timestamp: [...storedData.timestamp, ...newData.timestamp],
          ultimas_temperaturas: [...storedData.ultimas_temperaturas, ...newData.ultimas_temperaturas],
        };

        //Guarda los datos actualizados en localStorage
        localStorage.setItem('data', JSON.stringify(updatedData));

        // Actualiza el estado con los datos actualizados
        setData(updatedData);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  useEffect(() => {
    // Lee los datos almacenados en localStorage al cargar la aplicación
    const storedData = JSON.parse(localStorage.getItem('data')) || {
      humedad: [],
      mediana: [],
      timestamp: [],
      ultimas_temperaturas: [],
    };
    setData(storedData);
    //Realiza la primera conexión a la API para obtener los datos de temperatura.
    fetchData();

    //Configura un intervalo para realizar la solicitud cada minuto
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // 60000 milisegundos = 1 minuto

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="App">   
      <header className="App-header">
        <h1>Jardinería</h1>
        <div className="button-container">
          <button onClick={() => navigate('/humedadtierra')}>Humedad Tierra</button>
          <button onClick={() => navigate('/DataView', { state: { data } })}>Tabla De datos</button>
          <button onClick={() => alert('Botón 3 presionado')}>Botón 3</button>
          <button onClick={() => alert('Botón 4 presionado')}>Botón 4</button>
        </div>
        <div className="data-container">
          <div className="data-block">
            <h1>Humedad</h1>
            {data.humedad.length > 0 ? <HumedadChart data={data} /> : <p>Cargando...</p>}
          </div>
          <div className="data-block">
            <h1>Temperatura</h1>
            {data.ultimas_temperaturas.length > 0 ? (
              <div>
                <p>Mediana: {data.mediana[data.mediana.length - 1]}°C</p>
                <TemperaturaChart data={data} />
              </div>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/humedadtierra" element={<HumedadTierra />} />
        <Route path="/DataView" element={<DataView />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
