const User = require('../models/user.model');

class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findByUsername(username) {
    return await User.findOne({ username });
  }

  async findById(id) {
    return await User.findById(id).select('-password');
  }

  async findAll() {
    return await User.find().select('-password');
  }

  async updateRole(id, role) {
    return await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();
