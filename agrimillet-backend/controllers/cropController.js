const Crop = require('../models/Crop');
const GovernmentPrice = require('../models/GovernmentPrice');
const User = require('../models/User');

// Upload Crop (Farmer only)
exports.uploadCrop = async (req, res) => {
  try {
    const { milletType, quantity, harvestDate, market, expectedPrice } = req.body;

    if (!milletType || !quantity || !harvestDate || !market || !expectedPrice) {
      return res.status(400).json({ message: 'All crop fields are required' });
    }

    const user = await User.findById(req.userId);
    if (!user || user.userType !== 'farmer') {
      return res.status(403).json({ message: 'Only farmers can upload crops' });
    }

    // Get government price for this millet type and state
    const govPrice = await GovernmentPrice.findOne({
      milletType,
      state: user.state
    });

    const crop = new Crop({
      farmerId: req.userId,
      farmerState: user.state,
      farmerDistrict: user.district,
      milletType,
      quantity,
      harvestDate,
      market,
      expectedPrice,
      governmentPrice: govPrice ? govPrice.pricePerKg : null
    });

    await crop.save();
    res.status(201).json({ message: 'Crop uploaded successfully', crop });
  } catch (error) {
    console.error('Upload crop error:', error);
    res.status(500).json({ message: 'Error uploading crop', error: error.message });
  }
};

// Get Crops for Marketplace
exports.getMarketplaceCrops = async (req, res) => {
  try {
    const { market, state, milletType, page = 1, limit = 20 } = req.query;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let filter = { status: 'available' };

    if (market === 'state') {
      filter.farmerState = user.state;
    } else if (market === 'national') {
      // National market shows all crops
    } else {
      // Default: show both state and national crops
    }

    if (milletType) {
      filter.milletType = milletType;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const crops = await Crop.find(filter)
      .populate('farmerId', 'name mobileNo state district')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Crop.countDocuments(filter);

    res.json({
      crops,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get marketplace crops error:', error);
    res.status(500).json({ message: 'Error fetching crops', error: error.message });
  }
};

// Get Crop Details
exports.getCropDetails = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.cropId).populate('farmerId', 'name state district');

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.json(crop);
  } catch (error) {
    console.error('Get crop details error:', error);
    res.status(500).json({ message: 'Error fetching crop details', error: error.message });
  }
};

// Get My Crops (Farmer)
exports.getMyCrops = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || user.userType !== 'farmer') {
      return res.status(403).json({ message: 'Only farmers can view their crops' });
    }

    const crops = await Crop.find({ farmerId: req.userId }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (error) {
    console.error('Get my crops error:', error);
    res.status(500).json({ message: 'Error fetching your crops', error: error.message });
  }
};

// Delete/Remove Crop (Farmer)
exports.removeCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.cropId);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    if (crop.farmerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only remove your own crops' });
    }

    crop.status = 'removed';
    await crop.save();

    res.json({ message: 'Crop removed successfully' });
  } catch (error) {
    console.error('Remove crop error:', error);
    res.status(500).json({ message: 'Error removing crop', error: error.message });
  }
};

// Get Government Price
exports.getGovernmentPrice = async (req, res) => {
  try {
    const { milletType, state } = req.query;

    if (!milletType || !state) {
      return res.status(400).json({ message: 'Millet type and state are required' });
    }

    const price = await GovernmentPrice.findOne({ milletType, state });

    if (!price) {
      return res.status(404).json({ message: 'Price not found for this millet type and state' });
    }

    res.json(price);
  } catch (error) {
    console.error('Get government price error:', error);
    res.status(500).json({ message: 'Error fetching government price', error: error.message });
  }
};

// Search Crops
exports.searchCrops = async (req, res) => {
  try {
    const { query, market, page = 1, limit = 20 } = req.query;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let filter = {
      status: 'available',
      $or: [
        { milletType: { $regex: query, $options: 'i' } }
      ]
    };

    if (market === 'state') {
      filter.farmerState = user.state;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const crops = await Crop.find(filter)
      .populate('farmerId', 'name state district')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Crop.countDocuments(filter);

    res.json({
      crops,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) }
    });
  } catch (error) {
    console.error('Search crops error:', error);
    res.status(500).json({ message: 'Error searching crops', error: error.message });
  }
};
