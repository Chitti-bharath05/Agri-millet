const Transaction = require('../models/Transaction');
const Crop = require('../models/Crop');
const User = require('../models/User');
const { createOrder, verifyPayment } = require('../utils/payment');

// Create Payment Order
exports.createPaymentOrder = async (req, res) => {
  try {
    const { cropId, quantity } = req.body;

    if (!cropId || !quantity) {
      return res.status(400).json({ message: 'Crop ID and quantity are required' });
    }

    const crop = await Crop.findById(cropId);
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    if (quantity > crop.quantity) {
      return res.status(400).json({ message: 'Requested quantity exceeds available quantity' });
    }

    const totalAmount = crop.expectedPrice * quantity;

    // Create Razorpay order
    const razorpayOrder = await createOrder(totalAmount);

    // Create transaction record
    const transaction = new Transaction({
      cropId,
      farmerId: crop.farmerId,
      buyerId: req.userId,
      quantity,
      pricePerKg: crop.expectedPrice,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: 'pending'
    });

    await transaction.save();

    res.json({
      transactionId: transaction._id,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      currency: 'INR'
    });
  } catch (error) {
    console.error('Create payment order error:', error);
    res.status(500).json({ message: 'Error creating payment order', error: error.message });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { transactionId, razorpayPaymentId, razorpaySignature } = req.body;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Verify payment signature
    const isValid = verifyPayment(transaction.razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValid) {
      transaction.paymentStatus = 'failed';
      await transaction.save();
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Update transaction
    transaction.razorpayPaymentId = razorpayPaymentId;
    transaction.razorpaySignature = razorpaySignature;
    transaction.paymentStatus = 'completed';
    transaction.deliveryStatus = 'pending';
    await transaction.save();

    // Update crop quantity
    const crop = await Crop.findById(transaction.cropId);
    crop.quantity -= transaction.quantity;
    if (crop.quantity === 0) {
      crop.status = 'sold';
    }
    await crop.save();

    res.json({
      message: 'Payment verified successfully',
      transaction
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};

// Get Transaction Details
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId)
      .populate('cropId')
      .populate('farmerId', 'name mobileNo bankingDetails')
      .populate('buyerId', 'name mobileNo');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check authorization
    if (transaction.buyerId._id.toString() !== req.userId && transaction.farmerId._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ message: 'Error fetching transaction', error: error.message });
  }
};

// Get My Transactions
exports.getMyTransactions = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    let transactions;
    if (user.userType === 'farmer') {
      transactions = await Transaction.find({ farmerId: req.userId })
        .populate('cropId')
        .populate('buyerId', 'name mobileNo')
        .sort({ createdAt: -1 });
    } else {
      transactions = await Transaction.find({ buyerId: req.userId })
        .populate('cropId')
        .populate('farmerId', 'name mobileNo')
        .sort({ createdAt: -1 });
    }

    res.json(transactions);
  } catch (error) {
    console.error('Get my transactions error:', error);
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

// Update Delivery Status and GPS
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { transactionId, deliveryStatus, latitude, longitude, address } = req.body;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Only farmer can update delivery
    if (transaction.farmerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only farmer can update delivery status' });
    }

    if (deliveryStatus) {
      transaction.deliveryStatus = deliveryStatus;
    }

    if (latitude && longitude) {
      transaction.gpsCordinates.push({
        latitude,
        longitude,
        timestamp: new Date(),
        address: address || ''
      });
    }

    // If delivery completed, remove crop
    if (deliveryStatus === 'delivered') {
      const crop = await Crop.findById(transaction.cropId);
      if (crop) {
        crop.status = 'removed';
        await crop.save();
      }
    }

    await transaction.save();

    res.json({ message: 'Delivery status updated', transaction });
  } catch (error) {
    console.error('Update delivery status error:', error);
    res.status(500).json({ message: 'Error updating delivery status', error: error.message });
  }
};
