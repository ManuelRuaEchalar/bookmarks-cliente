// src/components/Home/Bookmark.jsx
import React, { useState } from 'react';
import '../../index.css';

interface BookmarkProps {
  bookmarkId: number;
  title: string;
  link: string;
  onUpdate: () => void;
}

const Bookmark: React.FC<BookmarkProps> = ({ bookmarkId, title, link, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedLink, setEditedLink] = useState(link);

  const handleChange = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedLink(link);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`http://localhost:3000/bookmarks/${bookmarkId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editedTitle,
          link: editedLink
        })
      });

      if (response.ok) {
        setIsEditing(false);
        onUpdate();
      } else {
        console.error("Error updating bookmark");
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  return (
    <div className="bookmark-section">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="bookmark-title-input"
          />
          <input
            type="text"
            value={editedLink}
            onChange={(e) => setEditedLink(e.target.value)}
            className="bookmark-link-input"
          />
          <div className="bookmark-actions">
            <span
              className="bookmark-action"
              onClick={handleSave}
            >
              Save
            </span>
            <span
              className="bookmark-action"
              onClick={handleCancel}
            >
              Cancel
            </span>
          </div>
        </>
      ) : (
        <>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bookmark-title"
          >
            {title}
          </a>
          <span
            className="bookmark-change"
            onClick={handleChange}
          >
            change
          </span>
        </>
      )}
    </div>
  );
};

export default Bookmark;