import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ noteToEdit, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategories(noteToEdit.categories || []);
    } else {
      setTitle('');
      setContent('');
      setCategories([]);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ 
        title: title.trim(), 
        content: content.trim(),
        categories 
      });
      if (!noteToEdit) {
        setTitle('');
        setContent('');
        setCategories([]);
      }
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      setCategories([...categories, trimmedCategory]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{noteToEdit ? 'Edit Note' : 'Create New Note'}</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note content"
          rows="5"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="categories">Categories</label>
        <div className="categories-input">
          <input
            type="text"
            id="newCategory"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add category"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory(e)}
          />
          <button type="button" className="btn btn-secondary btn-small" onClick={handleAddCategory}>
            Add
          </button>
        </div>
        {categories.length > 0 && (
          <div className="categories-list">
            {categories.map((category, index) => (
              <span key={index} className="category-tag">
                {category}
                <button type="button" onClick={() => handleRemoveCategory(category)}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {noteToEdit ? '💾 Update Note' : '➕ Create Note'}
        </button>
        {noteToEdit && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            ❌ Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
