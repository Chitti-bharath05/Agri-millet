const mongoose = require('mongoose');

const governmentPriceSchema = new mongoose.Schema({
  milletType: {
    type: String,
    enum: [
      'Finger Millet',
      'Pearl Millet',
      'Sorghum',
      'Foxtail Millet',
      'Kodo Millet',
      'Barnyard Millet',
      'Little Millet',
      'Proso Millet'
    ],
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pricePerKg: {
    type: Number,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GovernmentPrice', governmentPriceSchema);
