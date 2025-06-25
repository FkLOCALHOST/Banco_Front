import React from "react";
import "../../assets/styles/helpStyles.css"

const PaginaAyuda = () => {
  const faqs = [
    {
      pregunta: "¿Cómo puedo ver mi saldo de cuenta?",
      respuesta:
        "Para ver tu saldo de cuenta, dirígete a la sección 'Cuenta' en tu panel de usuario. Allí podrás ver todos los detalles de tu saldo disponible.",
    },
    {
      pregunta: "¿Cómo solicitar un crédito?",
      respuesta:
        "Para solicitar un crédito, haz clic en la opción 'Solicitar Crédito' en el menú principal. Completa el formulario y un asesor se pondrá en contacto contigo.",
    },
    {
      pregunta: "¿Cómo cambiar mi contraseña?",
      respuesta:
        "Puedes cambiar tu contraseña en la sección 'Ajustes' de tu cuenta. Allí encontrarás la opción para actualizar tu contraseña.",
    },
    {
      pregunta: "¿Cómo puedo contactar con el soporte?",
      respuesta:
        "Para contactar con el soporte, ve a la sección 'Soporte' y podrás encontrar varias opciones de contacto, incluyendo un formulario de chat en vivo.",
    },
  ];

  return (
    <div className="pagina-ayuda">
      <h1 className="titulo-ayuda">Centro de Ayuda</h1>
      <p className="subtitulo-ayuda">
        Aquí encontrarás respuestas a preguntas frecuentes y cómo contactar con
        soporte.
      </p>
      
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="pregunta">{faq.pregunta}</h3>
            <p className="respuesta">{faq.respuesta}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginaAyuda;
