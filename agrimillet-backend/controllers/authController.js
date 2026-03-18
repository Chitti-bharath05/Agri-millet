const User = require('../models/User');
const { generateToken } = require('../utils/token');
const { validateEmail, validateMobileNo, validateIFSC, validateUPI } = require('../utils/validators');

// User Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, mobileNo, userType, state, district, bankingDetails } = req.body;

    // Validation
    if (!name || !email || !password || !mobileNo || !userType || !state || !district) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validateMobileNo(mobileNo)) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    if (!['farmer', 'buyer'].includes(userType)) {
      return res.status(400).json({ message: 'User type must be farmer or buyer' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNo }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or mobile number already registered' });
    }

    // For farmers, validate banking details
    let bankDetails = null;
    if (userType === 'farmer' && bankingDetails) {
      if (bankingDetails.ifscCode && !validateIFSC(bankingDetails.ifscCode)) {
        return res.status(400).json({ message: 'Invalid IFSC code' });
      }
      if (bankingDetails.upiId && !validateUPI(bankingDetails.upiId)) {
        return res.status(400).json({ message: 'Invalid UPI ID' });
      }
      if (!bankingDetails.accountNumber && !bankingDetails.upiId) {
        return res.status(400).json({ message: 'Farmer must provide either account number or UPI ID' });
      }
      bankDetails = bankingDetails;
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      mobileNo,
      userType,
      state,
      district,
      bankingDetails: bankDetails,
      profileComplete: userType === 'buyer' // Buyer profile is complete after signup
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id, user.userType);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id, user.userType);

    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.toJSON());
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, state, district, bankingDetails } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (state) user.state = state;
    if (district) user.district = district;

    // Update banking details for farmers
    if (user.userType === 'farmer' && bankingDetails) {
      if (bankingDetails.ifscCode && !validateIFSC(bankingDetails.ifscCode)) {
        return res.status(400).json({ message: 'Invalid IFSC code' });
      }
      if (bankingDetails.upiId && !validateUPI(bankingDetails.upiId)) {
        return res.status(400).json({ message: 'Invalid UPI ID' });
      }
      user.bankingDetails = { ...user.bankingDetails, ...bankingDetails };
      user.profileComplete = true;
    }

    await user.save();
    res.json({ message: 'Profile updated successfully', user: user.toJSON() });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Logout (client-side token removal)
exports.logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};
