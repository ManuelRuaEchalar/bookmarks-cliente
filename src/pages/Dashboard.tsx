// Modified Dashboard.tsx
import { useState, useEffect } from 'react';
import { API_URL } from '../api/auth';
import Sidebar from "../components/Home/Sidebar";
import BookCard from "../components/Home/BookCard";
import '../index.css';

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

interface Bookmark {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  link: string;
  bookId: number;
}

function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const booksResponse = await fetch(`${API_URL}/books/`, {
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
      // Error handling without console logs
    }
  };

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const bookmarksResponse = await fetch(`${API_URL}/bookmarks`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (bookmarksResponse.ok) {
        const userBookmarks = await bookmarksResponse.json();
        setBookmarks(userBookmarks);
      }
    } catch (error) {
      // Error handling without console logs
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const [userResponse, booksResponse, bookmarksResponse] = await Promise.all([
          fetch(`${API_URL}/users/me`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }),
          fetch(`${API_URL}/books/`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }),
          fetch(`${API_URL}/bookmarks`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          })
        ]);

        if (userResponse.ok) {
          const user = await userResponse.json();
          setUserData(user);
        }

        if (booksResponse.ok) {
          const userBooks = await booksResponse.json();
          setBooks(userBooks);
        }

        if (bookmarksResponse.ok) {
          const userBookmarks = await bookmarksResponse.json();
          setBookmarks(userBookmarks);
        }
      } catch (error) {
        // Error handling without console logs
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddBook = async () => {
    if (!newTitle.trim() || !newAuthor.trim() || !newDescription.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/books/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newTitle,
          author: newAuthor,
          description: newDescription
        })
      });

      if (response.ok) {
        setNewTitle('');
        setNewAuthor('');
        setNewDescription('');
        setTimeout(() => {
          refreshData();
        }, 100);
      }
    } catch (error) {
      // Error handling without console logs
    }
  };

  const refreshData = async () => {
    await Promise.all([fetchBooks(), fetchBookmarks()]);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar userData={userData} books={books} loading={loading} />
      </div>
      <div className="main-content">
        {loading ? (
          <p className="loading-text">Cargando libros...</p>
        ) : books.length > 0 || true ? (
          <div className="books-container">
            <div
              className="add-book-card"
              onMouseEnter={(e) => {
                e.currentTarget.classList.add('add-book-card-hover');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('add-book-card-hover');
              }}
            >
              <input
                type="text"
                placeholder="Título"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="add-book-title-input"
              />
              <input
                type="text"
                placeholder="Autor"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="add-book-author-input"
              />
              <textarea
                placeholder="Descripción"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="add-book-description-input"
              />
              <span
                className="add-book-action"
                onClick={handleAddBook}
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add('add-book-action-hover');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove('add-book-action-hover');
                }}
              >
                Add Book
              </span>
            </div>
            {books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                bookmark={bookmarks.find((bm) => bm.bookId === book.id)}
                onRefresh={refreshData}
              />
            ))}
          </div>
        ) : (
          <p className="no-books-text">No hay libros disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;