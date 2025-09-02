// Sidebar.tsx
import { useState, useEffect } from 'react';
import '../../index.css';

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

interface SidebarProps {
  userData: User | null;
  books: Book[];
  loading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ userData, books, loading }) => {

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
      <div className="sidebar-loading">
        <h1 className="sidebar-loading-title">Sidebar</h1>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="user-data">
        <div className="user-avatar">
          <span className="avatar-initials">
            {userData && userData.firstName && userData.lastName 
              ? `${userData.firstName[0]}${userData.lastName[0]}` 
              : userData?.email[0].toUpperCase() || 'U'}
          </span>
        </div>
        <h2 className="user-name">
          {userData && userData.firstName && userData.lastName 
            ? `${userData.firstName} ${userData.lastName}` 
            : userData?.email || 'Usuario'}
        </h2>
        <p className="user-email">
          {userData?.email || 'email@ejemplo.com'}
        </p>
      </div>

      <div className="stats">
        <h3 className="stats-title">ESTADÍSTICAS</h3>
        <div className="stats-content">
          <div>
            <div className="stat-value">{stats.count}</div>
            <div className="stat-label">Libros en tu colección</div>
          </div>
          {stats.firstBookDate && (
            <div>
              <div className="stat-date">{stats.firstBookDate}</div>
              <div className="stat-label">Primer libro añadido</div>
            </div>
          )}
          {stats.lastBookDate && (
            <div>
              <div className="stat-date">{stats.lastBookDate}</div>
              <div className="stat-label">Último libro añadido</div>
            </div>
          )}
        </div>
      </div>

      <div className="books-image">
        <img 
          src="src\assets\books.png" 
          alt="Books"
          className="books-img"
        />
      </div>
    </div>
  );
};

export default Sidebar;