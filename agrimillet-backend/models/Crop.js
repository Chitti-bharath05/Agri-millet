const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmerState: {
    type: String,
    required: true
  },
  farmerDistrict: {
    type: String,
    required: true
  },
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
  quantity: {
    type: Number,
    required: true,
    // in kg
  },
  harvestDate: {
    type: Date,
    required: true
  },
  market: {
    type: String,
    enum: ['state', 'national'],
    required: true
  },
  expectedPrice: {
    type: Number,
    required: true,
    // price per kg
  },
  governmentPrice: {
    type: Number,
    // price per kg as per government
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'removed'],
    default: 'available'
  },
  images: [String],
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Crop', cropSchema);
