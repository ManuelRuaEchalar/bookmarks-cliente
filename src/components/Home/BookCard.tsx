import React from 'react';

// Definimos la interfaz para las props
interface BookCardProps {
  title: string;
  author: string;
  description: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, description }) => {
  return (
    <div
      style={{
        maxWidth: '400px', // Máximo ancho para responsividad, ajusta según necesites
        width: '100%', // Se adapta al contenedor padre
        height: 'auto', // Altura automática para responsividad
        backgroundColor: '#fffaf2',
        color: 'black',
        padding: '24px', // Aumentado para más espacio
        boxSizing: 'border-box',
        borderRadius: '16px', // Bordes más redondeados para un look moderno
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Sombra suave para profundidad y estética
        overflow: 'hidden', // Oculta overflow en lugar de scroll para un diseño limpio
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Transición para hover
        cursor: 'pointer', // Indica interactividad
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
    >
      <h2 style={{ 
        fontSize: '1.8rem', // Tamaño más grande para énfasis
        fontWeight: 'bold',
        marginBottom: '12px',
        lineHeight: '1.2'
      }}>
        {title}
      </h2>
      <p style={{ 
        fontSize: '1rem',
        fontStyle: 'italic', // Estilo itálico para autor
        color: '#555', // Color más suave para contraste
        marginBottom: '16px'
      }}>
        Autor: {author}
      </p>
      <p style={{ 
        fontSize: '0.95rem',
        lineHeight: '1.5',
        color: '#333' // Texto más oscuro para legibilidad
      }}>
        {description}
      </p>
    </div>
  );
};

export default BookCard;