import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { authAPI, notesAPI } from './services/api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'archived'
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (authAPI.isAuthenticated()) {
        try {
          const response = await authAPI.getMe();
          setUser(response.data);
        } catch (err) {
          authAPI.logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Load notes when user is logged in and tab changes
  useEffect(() => {
    if (user) {
      loadNotes();
      loadAllCategories();
    }
  }, [user, activeTab, selectedCategory]);

  const loadAllCategories = async () => {
    try {
      // Fetch all notes to get all categories
      const activeResponse = await notesAPI.getActiveNotes();
      const archivedResponse = await notesAPI.getArchivedNotes();
      
      const allNotes = [...activeResponse.data, ...archivedResponse.data];
      const categories = new Set();
      
      allNotes.forEach(note => {
        if (note.categories) {
          note.categories.forEach(cat => categories.add(cat));
        }
      });
      
      setAllCategories([...categories].sort());
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const loadNotes = async () => {
    try {
      setNotesLoading(true);
      setError(null);
      let response;
      
      if (selectedCategory) {
        response = await notesAPI.getNotesByCategory(selectedCategory);
      } else {
        response = activeTab === 'active' 
          ? await notesAPI.getActiveNotes()
          : await notesAPI.getArchivedNotes();
      }
      
      setNotes(response.data);
    } catch (err) {
      setError('Failed to load notes. ' + err.message);
      console.error(err);
    } finally {
      setNotesLoading(false);
    }
  };

  const handleLogin = async (formData, isLogin) => {
    try {
      const response = isLogin
        ? await authAPI.login(formData.email, formData.password)
        : await authAPI.register({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          });

      if (response.success) {
        setUser(response.data.user);
        setError(null);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setNotes([]);
    setNoteToEdit(null);
  };

  const handleCreateNote = async (noteData) => {
    try {
      await notesAPI.createNote(noteData);
      loadNotes();
      setError(null);
    } catch (err) {
      setError('Failed to create note: ' + err.message);
      console.error(err);
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      await notesAPI.updateNote(noteToEdit._id, noteData);
      setNoteToEdit(null);
      loadNotes();
      setError(null);
    } catch (err) {
      setError('Failed to update note: ' + err.message);
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(id);
        loadNotes();
        setError(null);
      } catch (err) {
        setError('Failed to delete note: ' + err.message);
        console.error(err);
      }
    }
  };

  const handleArchiveNote = async (id) => {
    try {
      await notesAPI.archiveNote(id);
      loadNotes();
      setError(null);
    } catch (err) {
      setError('Failed to archive note: ' + err.message);
      console.error(err);
    }
  };

  const handleUnarchiveNote = async (id) => {
    try {
      await notesAPI.unarchiveNote(id);
      loadNotes();
      setError(null);
    } catch (err) {
      setError('Failed to unarchive note: ' + err.message);
      console.error(err);
    }
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setNoteToEdit(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>📝 Notes App</h1>
            <p>Organize your thoughts and ideas</p>
          </div>
          <div className="user-info">
            <span>Welcome, {user.username}!</span>
            {user.role === 'admin' && <span className="admin-badge">Admin</span>}
            <button className="btn btn-logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <NoteForm
            noteToEdit={noteToEdit}
            onSubmit={noteToEdit ? handleUpdateNote : handleCreateNote}
            onCancel={handleCancelEdit}
          />

          {error && <div className="error-message">{error}</div>}

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'active' && !selectedCategory ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('active');
                setSelectedCategory(null);
                setNoteToEdit(null);
              }}
            >
              📋 Active Notes
            </button>
            <button
              className={`tab ${activeTab === 'archived' && !selectedCategory ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('archived');
                setSelectedCategory(null);
                setNoteToEdit(null);
              }}
            >
              📦 Archived Notes
            </button>
          </div>

          {allCategories.length > 0 && (
            <div className="category-filter">
              <label>Filter by category:</label>
              <div className="category-buttons">
                <button
                  className={`category-btn ${!selectedCategory ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
                {allCategories.map((category, index) => (
                  <button
                    key={index}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          <NoteList
            notes={notes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onArchive={handleArchiveNote}
            onUnarchive={handleUnarchiveNote}
            loading={notesLoading}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Notes App © 2026 | Logged in as {user.email}</p>
      </footer>
    </div>
  );
}

export default App;
