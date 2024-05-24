import React from "react";

function Tabla({ id, titulo, width, height, data = [] }) {
  const styles = {
    container: {
      backgroundColor: "#444",
      border: "1px solid #555",
      borderRadius: "10px",
      padding: "20px",
      width: width,
      height: height,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      color: "#fff",
      textAlign: "center",
      overflowY: "auto", // For scrolling if content overflows
    },
    ul: {
      listStyleType: "none",
      padding: "0",
      margin: "0", // Remove default margin
    },
    li: {
      backgroundColor: "#555",
      margin: "5px 0",
      padding: "5px",
      borderRadius: "3px",
    },
  };

  return (
    <div id={id} style={styles.container}>
      <h1>{titulo}</h1>
      <ul style={styles.ul}>
        {data.map((linea, index) => (
          <li key={index} style={styles.li}>{linea}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tabla;
