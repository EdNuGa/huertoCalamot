import React, { useEffect, useState } from 'react';
import './css/Style.css';
import HumedadChart from './components/HumedadChart';
import TemperaturaChart from './components/TemperaturaChart';

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
        // Leer los datos almacenados en localStorage
        const storedData = JSON.parse(localStorage.getItem('data')) || {
          humedad: [],
          mediana: [],
          timestamp: [],
          ultimas_temperaturas: [],
        };

        // Actualizar los datos almacenados
        const updatedData = {
          humedad: [...storedData.humedad, newData.humedad],
          mediana: [...storedData.mediana, newData.mediana],
          timestamp: [...storedData.timestamp, ...newData.timestamp],
          ultimas_temperaturas: [...storedData.ultimas_temperaturas, ...newData.ultimas_temperaturas],
        };

        // Guardar los datos actualizados en localStorage
        localStorage.setItem('data', JSON.stringify(updatedData));

        // Actualizar el estado con los datos actualizados
        setData(updatedData);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  useEffect(() => {
    // Leer los datos almacenados en localStorage al cargar la aplicación
    const storedData = JSON.parse(localStorage.getItem('data')) || {
      humedad: [],
      mediana: [],
      timestamp: [],
      ultimas_temperaturas: [],
    };
    setData(storedData);

    // Realiza la primera conexión a la API para obtener los datos de temperatura
    fetchData();

    // Configura un intervalo para realizar la solicitud cada minuto
    const interval = setInterval(() => {
      fetchData();
    }, 60000); // 60000 milisegundos = 1 minuto

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jardinería</h1>
        <div className="button-container">
          <button onClick={() => alert('Botón 1 presionado')}>Botón 1</button>
          <button onClick={() => alert('Botón 2 presionado')}>Botón 2</button>
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

export default App;

//IP servidor 192.168.140.170:5000 , es una API y el código de la API