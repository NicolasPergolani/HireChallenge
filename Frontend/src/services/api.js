const API_URL = 'http://localhost:3000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Set token in localStorage
const setToken = (token) => localStorage.setItem('token', token);

// Remove token from localStorage
const removeToken = () => localStorage.removeItem('token');

// Get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to register');
    }
    const data = await response.json();
    if (data.success && data.data.token) {
      setToken(data.data.token);
    }
    return data;
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to login');
    }
    const data = await response.json();
    if (data.success && data.data.token) {
      setToken(data.data.token);
    }
    return data;
  },

  // Get current user
  getMe: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to get user');
    return response.json();
  },

  // Logout
  logout: () => {
    removeToken();
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!getToken();
  },

  getToken,
};

export const notesAPI = {
  // Get all notes
  getAllNotes: async () => {
    const response = await fetch(`${API_URL}/notes`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch notes');
    return response.json();
  },

  // Get active notes
  getActiveNotes: async () => {
    const response = await fetch(`${API_URL}/notes/active`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch active notes');
    return response.json();
  },

  // Get archived notes
  getArchivedNotes: async () => {
    const response = await fetch(`${API_URL}/notes/archived`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch archived notes');
    return response.json();
  },

  // Get note by ID
  getNoteById: async (id) => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch note');
    return response.json();
  },

  // Create a new note
  createNote: async (noteData) => {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });
    if (!response.ok) throw new Error('Failed to create note');
    return response.json();
  },

  // Update a note
  updateNote: async (id, noteData) => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });
    if (!response.ok) throw new Error('Failed to update note');
    return response.json();
  },

  // Delete a note
  deleteNote: async (id) => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete note');
    return response.json();
  },

  // Archive a note
  archiveNote: async (id) => {
    const response = await fetch(`${API_URL}/notes/${id}/archive`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to archive note');
    return response.json();
  },

  // Unarchive a note
  unarchiveNote: async (id) => {
    const response = await fetch(`${API_URL}/notes/${id}/unarchive`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to unarchive note');
    return response.json();
  },

  // Get notes by category
  getNotesByCategory: async (category) => {
    const response = await fetch(`${API_URL}/notes/category/${encodeURIComponent(category)}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch notes by category');
    return response.json();
  },
};
