const express = require('express');
const noteController = require('../controllers/note.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// Create a new note
router.post('/', noteController.createNote);

// Get all notes
router.get('/', noteController.getAllNotes);

// Get active notes
router.get('/active', noteController.getActiveNotes);

// Get archived notes
router.get('/archived', noteController.getArchivedNotes);

// Get notes by category
router.get('/category/:category', noteController.getNotesByCategory);

// Get a specific note by ID
router.get('/:id', noteController.getNoteById);

// Update a note
router.put('/:id', noteController.updateNote);

// Delete a note
router.delete('/:id', noteController.deleteNote);

// Archive a note
router.patch('/:id/archive', noteController.archiveNote);

// Unarchive a note
router.patch('/:id/unarchive', noteController.unarchiveNote);

module.exports = router;
