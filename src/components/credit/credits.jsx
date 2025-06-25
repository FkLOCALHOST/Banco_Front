import React from "react";
import "../../assets/styles/creditStyle.css"

const Credito = ({ monto = 5000 }) => {
    return (
      <div className="card-credito">
        <h3>Crédito Disponible</h3>
        <p className="monto">
          ${monto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
        </p>
      </div>
    );
  };
  
  export default Credito;