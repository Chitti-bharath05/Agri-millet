require('dotenv').config();
const mongoose = require('mongoose');
const GovernmentPrice = require('./models/GovernmentPrice');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agrimillet');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedGovernmentPrices = async () => {
  try {
    // Sample government prices for different states and millet types
    const prices = [
      // Andhra Pradesh
      { milletType: 'Finger Millet', state: 'Andhra Pradesh', pricePerKg: 45 },
      { milletType: 'Pearl Millet', state: 'Andhra Pradesh', pricePerKg: 42 },
      { milletType: 'Sorghum', state: 'Andhra Pradesh', pricePerKg: 40 },
      { milletType: 'Foxtail Millet', state: 'Andhra Pradesh', pricePerKg: 50 },
      
      // Karnataka
      { milletType: 'Finger Millet', state: 'Karnataka', pricePerKg: 48 },
      { milletType: 'Pearl Millet', state: 'Karnataka', pricePerKg: 44 },
      { milletType: 'Sorghum', state: 'Karnataka', pricePerKg: 42 },
      { milletType: 'Foxtail Millet', state: 'Karnataka', pricePerKg: 52 },
      
      // Maharashtra
      { milletType: 'Finger Millet', state: 'Maharashtra', pricePerKg: 46 },
      { milletType: 'Pearl Millet', state: 'Maharashtra', pricePerKg: 43 },
      { milletType: 'Sorghum', state: 'Maharashtra', pricePerKg: 41 },
      { milletType: 'Kodo Millet', state: 'Maharashtra', pricePerKg: 55 },
      
      // Rajasthan
      { milletType: 'Pearl Millet', state: 'Rajasthan', pricePerKg: 41 },
      { milletType: 'Sorghum', state: 'Rajasthan', pricePerKg: 39 },
      { milletType: 'Barnyard Millet', state: 'Rajasthan', pricePerKg: 48 },
      
      // Tamil Nadu
      { milletType: 'Finger Millet', state: 'Tamil Nadu', pricePerKg: 50 },
      { milletType: 'Pearl Millet', state: 'Tamil Nadu', pricePerKg: 45 },
      { milletType: 'Little Millet', state: 'Tamil Nadu', pricePerKg: 60 },
      
      // Telangana
      { milletType: 'Finger Millet', state: 'Telangana', pricePerKg: 47 },
      { milletType: 'Pearl Millet', state: 'Telangana', pricePerKg: 43 },
      { milletType: 'Sorghum', state: 'Telangana', pricePerKg: 40 },
      
      // Uttar Pradesh
      { milletType: 'Pearl Millet', state: 'Uttar Pradesh', pricePerKg: 40 },
      { milletType: 'Sorghum', state: 'Uttar Pradesh', pricePerKg: 38 },
      { milletType: 'Proso Millet', state: 'Uttar Pradesh', pricePerKg: 58 },
      
      // Gujarat
      { milletType: 'Pearl Millet', state: 'Gujarat', pricePerKg: 42 },
      { milletType: 'Sorghum', state: 'Gujarat', pricePerKg: 41 },
      { milletType: 'Foxtail Millet', state: 'Gujarat', pricePerKg: 51 }
    ];

    await GovernmentPrice.deleteMany({}); // Clear existing prices
    await GovernmentPrice.insertMany(prices);
    console.log('Government prices seeded successfully');
  } catch (error) {
    console.error('Error seeding government prices:', error);
  } finally {
    await mongoose.connection.close();
  }
};

connectDB().then(() => {
  seedGovernmentPrices();
});
