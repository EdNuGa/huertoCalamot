import React from "react";
import { useLocation } from 'react-router-dom';
import Tabla from "./Table";

function TablaDataView() {
  const location = useLocation();
  const data = location.state?.data || { humedad: [], mediana: [], timestamp: [], ultimas_temperaturas: [] };

  const titulos = ["Humedad", "Mediana", "Timestamp"];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      gap: "20px",
      backgroundColor: "#333",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    tableContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.container}>
      {titulos.map((titulo, index) => (
        <div key={index} style={styles.tableContainer}>
          <Tabla id={`tabla-${index}`} titulo={titulo} width="300px" height="400px" data={data[titulo.toLowerCase().replace(/\s+/g, '_')]} />
        </div>
      ))}
    </div>
  );
}

export default TablaDataView;
