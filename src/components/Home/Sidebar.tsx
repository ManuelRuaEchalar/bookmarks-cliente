import { useState, useEffect } from 'react';

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

interface Book {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  author: string;
  description: string;
  userId: number;
}

const Sidebar = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        // Obtener datos del usuario
        const userResponse = await fetch("http://localhost:3000/users/me", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (userResponse.ok) {
          const user = await userResponse.json();
          setUserData(user);
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

    fetchUserData();
  }, []);

  const getBookStats = () => {
    if (books.length === 0) {
      return {
        count: 0,
        firstBookDate: null,
        lastBookDate: null
      };
    }

    const sortedBooks = [...books].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return {
      count: books.length,
      firstBookDate: new Date(sortedBooks[0].createdAt).toLocaleDateString(),
      lastBookDate: new Date(sortedBooks[sortedBooks.length - 1].createdAt).toLocaleDateString()
    };
  };

  const stats = getBookStats();

  if (loading) {
    return (
      <div style={{ 
        width: '60%', 
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
      }}>
        <h1 style={{ color: '#846267' }}>Sidebar</h1>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '32px',
      gap: '40px',
      minHeight: '100vh',
      borderRight: '1px solid #f0f0f0'
    }}>
      
      {/* Datos del usuario */}
      <div style={{ 
        marginTop: '40px',
        paddingBottom: '24px',
        borderBottom: '1px solid #f5f5f5'
      }}>
        <div style={{ 
          width: '48px',
          height: '48px',
          backgroundColor: '#846267',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <span style={{ 
            color: 'white', 
            fontSize: '18px', 
            fontWeight: '600' 
          }}>
            {userData && userData.firstName && userData.lastName 
              ? `${userData.firstName[0]}${userData.lastName[0]}` 
              : userData?.email[0].toUpperCase() || 'U'}
          </span>
        </div>
        <h2 style={{ 
          color: 'black', 
          fontSize: '20px', 
          fontWeight: '600',
          margin: '0 0 4px 0',
          lineHeight: '1.2'
        }}>
          {userData && userData.firstName && userData.lastName 
            ? `${userData.firstName} ${userData.lastName}` 
            : userData?.email || 'Usuario'}
        </h2>
        <p style={{ 
          color: '#846267', 
          fontSize: '14px',
          margin: '0',
          opacity: '0.8'
        }}>
          {userData?.email || 'email@ejemplo.com'}
        </p>
      </div>

      {/* Estadísticas */}
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h3 style={{ 
          color: 'black', 
          fontSize: '12px',
          fontWeight: '600',
          margin: '0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          opacity: '0.7'
        }}>
          ESTADÍSTICAS
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#846267',
              lineHeight: '1'
            }}>
              {stats.count}
            </div>
            <div style={{ 
              fontSize: '13px', 
              color: 'black',
              opacity: '0.6',
              marginTop: '2px'
            }}>
              Libros en tu colección
            </div>
          </div>
          
          {stats.firstBookDate && (
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: 'black',
                fontWeight: '500'
              }}>
                {stats.firstBookDate}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#846267',
                opacity: '0.7'
              }}>
                Primer libro añadido
              </div>
            </div>
          )}
          
          {stats.lastBookDate && (
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: 'black',
                fontWeight: '500'
              }}>
                {stats.lastBookDate}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#846267',
                opacity: '0.7'
              }}>
                Último libro añadido
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Imagen */}
      <div style={{ 
        marginTop: '30px',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <img 
          src="src\assets\books.png" 
          alt="Books"
          style={{ 
            width: '300px', 
            height: '300px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: '0.9',
            filter: 'saturate(0.8)'
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;