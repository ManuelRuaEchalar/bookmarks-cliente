import { useState, useEffect } from 'react';
import Sidebar from "../components/Home/Sidebar";
import BookCard from "../components/Home/BookCard"; // Asegúrate de ajustar la ruta de importación según tu estructura de carpetas

interface Book {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  author: string;
  description: string;
  userId: number;
}

function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        // Obtener libros del usuario
        const booksResponse = await fetch("http://localhost:3000/books/", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (booksResponse.ok) {
          const userBooks = await booksResponse.json();
          setBooks(userBooks);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      width: '100vw', 
      height: '100vh',
      margin: 0,
      overflow: 'hidden'
    }}>
      <div style={{ 
        flex: '0 0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 0,
      }}>
        <Sidebar />
      </div>
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Cambiado a flex-start para alinear al top
        alignItems: 'flex-start', // Cambiado a flex-start para alinear a la izquierda
        backgroundColor: '#eee0c3ff',
        minWidth: 0,
        overflow: 'hidden' // Añadido para manejar overflow si es necesario
      }}>
        {loading ? (
          <p style={{ margin: '40px 0 0 40px' }}>Cargando libros...</p> // Ajustado para consistencia
        ) : books.length > 0 ? (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start', // Alinea cards a la izquierda
            alignItems: 'flex-start', // Alinea cards al top
            gap: '20px',
            padding: '40px 20px 20px 40px', // 40px top y left, 20px right y bottom para espacio
            width: '100%',
            height: '100%',
            overflow: 'auto', // Permite scroll si hay muchos cards
            boxSizing: 'border-box'
          }}>
            {books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
              />
            ))}
          </div>
        ) : (
          <p style={{ margin: '40px 0 0 40px' }}>No hay libros disponibles.</p> // Ajustado para consistencia
        )}
      </div>
    </div>
  );
}

export default Dashboard;