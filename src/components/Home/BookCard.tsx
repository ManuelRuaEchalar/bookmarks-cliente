// Modified src/components/Home/BookCard.jsx
import React, { useState } from 'react';
import Bookmark from './Bookmark'; // Import the new component
import '../../index.css';
import { API_URL } from '../../api/auth';

// Definimos la interfaz para las props
interface BookCardProps {
  id: number;
  title: string;
  author: string;
  description: string;
  bookmark?: {
    id: number;
    title: string;
    link: string;
  };
  onRefresh: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, description, bookmark, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [newBookmarkTitle, setNewBookmarkTitle] = useState('');
  const [newBookmarkLink, setNewBookmarkLink] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedAuthor(author);
    setEditedDescription(description);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`${API_URL}/books/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editedTitle,
          author: editedAuthor,
          description: editedDescription
        })
      });

      if (response.ok) {
        setIsEditing(false);
        onRefresh();
      } else {
        console.error("Error updating book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`${API_URL}/books/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        onRefresh();
      } else {
        console.error("Error deleting book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleAddBookmark = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`${API_URL}/bookmarks`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newBookmarkTitle,
          link: newBookmarkLink,
          bookId: id
        })
      });

      if (response.ok) {
        setIsAddingBookmark(false);
        setNewBookmarkTitle('');
        setNewBookmarkLink('');
        onRefresh();
      } else {
        console.error("Error adding bookmark");
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const handleCancelAddBookmark = () => {
    setIsAddingBookmark(false);
    setNewBookmarkTitle('');
    setNewBookmarkLink('');
  };

  return (
    <div
      className="book-card"
      onMouseEnter={(e) => {
        e.currentTarget.classList.add('book-card-hover');
      }}
      onMouseLeave={(e) => {
        e.currentTarget.classList.remove('book-card-hover');
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="book-title-input"
          />
          <input
            type="text"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
            className="book-author-input"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="book-description-input"
          />
          <div className="book-actions">
            <span
              className="book-action"
              onClick={handleSave}
              onMouseEnter={(e) => { e.currentTarget.classList.add('book-action-hover'); }}
              onMouseLeave={(e) => { e.currentTarget.classList.remove('book-action-hover'); }}
            >
              Guardar
            </span>
            <span
              className="book-action"
              onClick={handleCancel}
              onMouseEnter={(e) => { e.currentTarget.classList.add('book-action-hover'); }}
              onMouseLeave={(e) => { e.currentTarget.classList.remove('book-action-hover'); }}
            >
              Cancelar
            </span>
          </div>
        </>
      ) : (
        <>
          <h2 className="book-title">{title}</h2>
          <p className="book-author">Autor: {author}</p>
          <p className="book-description">{description}</p>
          {bookmark ? (
            <Bookmark
              bookmarkId={bookmark.id}
              title={bookmark.title}
              link={bookmark.link}
              onUpdate={onRefresh}
            />
          ) : isAddingBookmark ? (
            <div className="add-bookmark-form">
              <input
                type="text"
                value={newBookmarkTitle}
                onChange={(e) => setNewBookmarkTitle(e.target.value)}
                className="bookmark-title-input"
                placeholder="Bookmark Title"
              />
              <input
                type="text"
                value={newBookmarkLink}
                onChange={(e) => setNewBookmarkLink(e.target.value)}
                className="bookmark-link-input"
                placeholder="Bookmark Link"
              />
              <div className="bookmark-actions">
                <span
                  className="bookmark-action"
                  onClick={handleAddBookmark}
                >
                  Save
                </span>
                <span
                  className="bookmark-action"
                  onClick={handleCancelAddBookmark}
                >
                  Cancel
                </span>
              </div>
            </div>
          ) : null}
          <div className="book-actions">
            <span
              className="book-action"
              onClick={handleEdit}
              onMouseEnter={(e) => { e.currentTarget.classList.add('book-action-hover'); }}
              onMouseLeave={(e) => { e.currentTarget.classList.remove('book-action-hover'); }}
            >
              Editar
            </span>
            <span
              className="book-action"
              onClick={handleDelete}
              onMouseEnter={(e) => { e.currentTarget.classList.add('book-action-hover'); }}
              onMouseLeave={(e) => { e.currentTarget.classList.remove('book-action-hover'); }}
            >
              Borrar
            </span>
            {!bookmark && !isAddingBookmark ? (
              <span
                className="book-action"
                onClick={() => setIsAddingBookmark(true)}
                onMouseEnter={(e) => { e.currentTarget.classList.add('book-action-hover'); }}
                onMouseLeave={(e) => { e.currentTarget.classList.remove('book-action-hover'); }}
              >
                Add Bookmark
              </span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default BookCard;