const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

class AuthService {
  // Generate JWT token
  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    });
  }

  // Register new user
  async register(userData) {
    try {
      const { username, email, password, role } = userData;

      // Check if user already exists
      const existingEmail = await userRepository.findByEmail(email);
      if (existingEmail) {
        throw new Error('Email already registered');
      }

      const existingUsername = await userRepository.findByUsername(username);
      if (existingUsername) {
        throw new Error('Username already taken');
      }

      // Create user
      const user = await userRepository.create({
        username,
        email,
        password,
        role: role || 'user',
      });

      // Generate token
      const token = this.generateToken(user._id);

      return {
        user,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async login(email, password) {
    try {
      // Find user by email (need password for comparison)
      const user = await userRepository.findByEmail(email);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check password
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate token
      const token = this.generateToken(user._id);

      // Remove password from response
      const userResponse = user.toJSON();

      return {
        user: userResponse,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  // Get current user
  async getMe(userId) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
