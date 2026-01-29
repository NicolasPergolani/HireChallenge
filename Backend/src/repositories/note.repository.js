const Note = require('../models/note.model');

class NoteRepository {
  async create(noteData) {
    const note = new Note(noteData);
    return await note.save();
  }

  async findAll(userId) {
    return await Note.find({ user: userId }).sort({ createdAt: -1 });
  }

  async findById(id, userId) {
    return await Note.findOne({ _id: id, user: userId });
  }

  async findByArchived(archived, userId) {
    return await Note.find({ archived, user: userId }).sort({ createdAt: -1 });
  }

  async update(id, userId, noteData) {
    return await Note.findOneAndUpdate(
      { _id: id, user: userId },
      noteData,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async delete(id, userId) {
    return await Note.findOneAndDelete({ _id: id, user: userId });
  }

  async archive(id, userId, archived) {
    return await Note.findOneAndUpdate(
      { _id: id, user: userId },
      { archived },
      { new: true }
    );
  }

  async findByCategory(category, userId) {
    return await Note.find({ 
      categories: category, 
      user: userId 
    }).sort({ createdAt: -1 });
  }

  // Admin methods - can access all notes
  async findAllAdmin() {
    return await Note.find().populate('user', 'username email').sort({ createdAt: -1 });
  }

  async findByArchivedAdmin(archived) {
    return await Note.find({ archived }).populate('user', 'username email').sort({ createdAt: -1 });
  }

  async findByCategoryAdmin(category) {
    return await Note.find({ 
      categories: category
    }).populate('user', 'username email').sort({ createdAt: -1 });
  }
}

module.exports = new NoteRepository();
