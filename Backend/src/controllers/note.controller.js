const noteService = require('../services/note.service');

class NoteController {
  async createNote(req, res) {
    try {
      const note = await noteService.createNote(req.body, req.user._id);
      res.status(201).json({
        success: true,
        data: note,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAllNotes(req, res) {
    try {
      const isAdmin = req.user.role === 'admin';
      const notes = await noteService.getAllNotes(req.user._id, isAdmin);
      res.status(200).json({
        success: true,
        data: notes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getActiveNotes(req, res) {
    try {
      const isAdmin = req.user.role === 'admin';
      const notes = await noteService.getActiveNotes(req.user._id, isAdmin);
      res.status(200).json({
        success: true,
        data: notes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getArchivedNotes(req, res) {
    try {
      const isAdmin = req.user.role === 'admin';
      const notes = await noteService.getArchivedNotes(req.user._id, isAdmin);
      res.status(200).json({
        success: true,
        data: notes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getNoteById(req, res) {
    try {
      const note = await noteService.getNoteById(req.params.id, req.user._id);
      res.status(200).json({
        success: true,
        data: note,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  async updateNote(req, res) {
    try {
      const note = await noteService.updateNote(req.params.id, req.user._id, req.body);
      res.status(200).json({
        success: true,
        data: note,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async deleteNote(req, res) {
    try {
      const result = await noteService.deleteNote(req.params.id, req.user._id);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  async archiveNote(req, res) {
    try {
      const note = await noteService.archiveNote(req.params.id, req.user._id);
      res.status(200).json({
        success: true,
        data: note,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async unarchiveNote(req, res) {
    try {
      const note = await noteService.unarchiveNote(req.params.id, req.user._id);
      res.status(200).json({
        success: true,
        data: note,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getNotesByCategory(req, res) {
    try {
      const { category } = req.params;
      const isAdmin = req.user.role === 'admin';
      const notes = await noteService.getNotesByCategory(category, req.user._id, isAdmin);
      res.status(200).json({
        success: true,
        data: notes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new NoteController();
