import React from 'react';
import './NoteCard.css';

const NoteCard = ({ note, onEdit, onDelete, onArchive, onUnarchive }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-badges">
          {note.user && note.user.username && (
            <span className="user-badge" title={`Created by ${note.user.username}`}>
              👤 {note.user.username}
            </span>
          )}
          {note.archived && <span className="archived-badge">Archived</span>}
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      {note.categories && note.categories.length > 0 && (
        <div className="note-categories">
          {note.categories.map((category, index) => (
            <span key={index} className="category-badge">{category}</span>
          ))}
        </div>
      )}
      <div className="note-card-footer">
        <span className="note-date">{formatDate(note.updatedAt)}</span>
        <div className="note-actions">
          {!note.archived && (
            <>
              <button
                className="btn btn-edit"
                onClick={() => onEdit(note)}
                title="Edit note"
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-archive"
                onClick={() => onArchive(note._id)}
                title="Archive note"
              >
                📦 Archive
              </button>
            </>
          )}
          {note.archived && (
            <button
              className="btn btn-unarchive"
              onClick={() => onUnarchive(note._id)}
              title="Unarchive note"
            >
              📤 Unarchive
            </button>
          )}
          <button
            className="btn btn-delete"
            onClick={() => onDelete(note._id)}
            title="Delete note"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
