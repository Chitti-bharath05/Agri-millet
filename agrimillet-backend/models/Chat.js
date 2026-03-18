const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [
    {
      sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true
      },
      text: String,
      language: {
        type: String,
        default: 'en'
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  language: {
    type: String,
    enum: ['en', 'hi', 'ta', 'te', 'kn', 'mr', 'gu', 'bn'],
    default: 'en'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', chatSchema);
