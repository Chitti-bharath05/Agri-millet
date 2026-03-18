const Chat = require('../models/Chat');

// Save Chat Message
exports.saveChatMessage = async (req, res) => {
  try {
    const { message, language = 'en' } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    let chat = await Chat.findOne({ userId: req.userId });

    if (!chat) {
      chat = new Chat({ userId: req.userId, language });
    }

    // Add user message
    chat.messages.push({
      sender: 'user',
      text: message,
      language
    });

    // Simple bot response (can be integrated with Dialogflow later)
    const botResponse = getBotResponse(message, language);
    chat.messages.push({
      sender: 'bot',
      text: botResponse,
      language
    });

    chat.language = language;
    await chat.save();

    res.json({
      message: 'Chat message saved',
      chat
    });
  } catch (error) {
    console.error('Save chat message error:', error);
    res.status(500).json({ message: 'Error saving chat message', error: error.message });
  }
};

// Get Chat History
exports.getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ userId: req.userId });

    if (!chat) {
      return res.json({ messages: [], language: 'en' });
    }

    res.json(chat);
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ message: 'Error fetching chat history', error: error.message });
  }
};

// Simple Bot Response (to be replaced with Dialogflow/Rasa)
const getBotResponse = (message, language) => {
  const responses = {
    en: {
      'hello': 'Hello! How can I help you with AgriMillet?',
      'help': 'I can help you with crop uploads, marketplace browsing, payments, and delivery tracking.',
      'price': 'You can check government-set prices for different millet types in our app.',
      'payment': 'We support secure payments through Razorpay.',
      'default': 'Thank you for your message. Please ask about crops, prices, or payments.'
    },
    hi: {
      'hello': 'नमस्ते! मैं आपको AgriMillet में कैसे मदद कर सकता हूं?',
      'help': 'मैं आपको फसल अपलोड, बाजार ब्राउजिंग, भुगतान और डिलीवरी ट्रैकिंग में मदद कर सकता हूं।',
      'price': 'आप हमारे ऐप में विभिन्न मिलेट प्रकारों के लिए सरकार द्वारा निर्धारित कीमतें देख सकते हैं।',
      'payment': 'हम Razorpay के माध्यम से सुरक्षित भुगतान का समर्थन करते हैं।',
      'default': 'आपके संदेश के लिए धन्यवाद। कृपया फसलों, कीमतों या भुगतान के बारे में पूछें।'
    }
  };

  const langResponses = responses[language] || responses['en'];
  const lowerMessage = message.toLowerCase();

  for (const [key, value] of Object.entries(langResponses)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }

  return langResponses['default'];
};
