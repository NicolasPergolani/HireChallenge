import React from 'react';
import NoteCard from './NoteCard';
import './NoteList.css';

const NoteList = ({ notes, onEdit, onDelete, onArchive, onUnarchive, loading }) => {
  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>📝 No notes found</p>
        <p className="empty-state-subtitle">Create your first note to get started!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
        />
      ))}
    </div>
  );
};

export default NoteList;
