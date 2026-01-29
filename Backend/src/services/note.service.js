const noteRepository = require('../repositories/note.repository');

class NoteService {
  async createNote(noteData, userId) {
    try {
      const { title, content, categories = [] } = noteData;

      if (!title || !content) {
        throw new Error('Title and content are required');
      }

      const note = await noteRepository.create({
        title,
        content,
        archived: false,
        categories,
        user: userId,
      });

      return note;
    } catch (error) {
      throw error;
    }
  }

  async getAllNotes(userId, isAdmin = false) {
    try {
      if (isAdmin) {
        return await noteRepository.findAllAdmin();
      }
      return await noteRepository.findAll(userId);
    } catch (error) {
      throw error;
    }
  }

  async getActiveNotes(userId, isAdmin = false) {
    try {
      if (isAdmin) {
        return await noteRepository.findByArchivedAdmin(false);
      }
      return await noteRepository.findByArchived(false, userId);
    } catch (error) {
      throw error;
    }
  }

  async getArchivedNotes(userId, isAdmin = false) {
    try {
      if (isAdmin) {
        return await noteRepository.findByArchivedAdmin(true);
      }
      return await noteRepository.findByArchived(true, userId);
    } catch (error) {
      throw error;
    }
  }

  async getNoteById(id, userId) {
    try {
      const note = await noteRepository.findById(id, userId);
      if (!note) {
        throw new Error('Note not found');
      }
      return note;
    } catch (error) {
      throw error;
    }
  }

  async updateNote(id, userId, noteData) {
    try {
      const note = await noteRepository.findById(id, userId);
      if (!note) {
        throw new Error('Note not found');
      }

      const updatedNote = await noteRepository.update(id, userId, noteData);
      return updatedNote;
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(id, userId) {
    try {
      const note = await noteRepository.findById(id, userId);
      if (!note) {
        throw new Error('Note not found');
      }

      await noteRepository.delete(id, userId);
      return { message: 'Note deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async archiveNote(id, userId) {
    try {
      const note = await noteRepository.findById(id, userId);
      if (!note) {
        throw new Error('Note not found');
      }

      const updatedNote = await noteRepository.archive(id, userId, true);
      return updatedNote;
    } catch (error) {
      throw error;
    }
  }

  async unarchiveNote(id, userId) {
    try {
      const note = await noteRepository.findById(id, userId);
      if (!note) {
        throw new Error('Note not found');
      }

      const updatedNote = await noteRepository.archive(id, userId, false);
      return updatedNote;
    } catch (error) {
      throw error;
    }
  }

  async getNotesByCategory(category, userId, isAdmin = false) {
    try {
      if (isAdmin) {
        return await noteRepository.findByCategoryAdmin(category);
      }
      return await noteRepository.findByCategory(category, userId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new NoteService();
