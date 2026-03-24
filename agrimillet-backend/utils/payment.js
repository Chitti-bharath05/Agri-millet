const Razorpay = require('razorpay');
const crypto = require('crypto');

let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
} else {
  console.warn('Razorpay keys missing - Payment features will be disabled');
}

const createOrder = async (amount, currency = 'INR') => {
  try {
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`
    };
    if (!razorpay) {
      throw new Error('Razorpay is not configured. Please add keys to environment variables.');
    }
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw error;
  }
};

const verifyPayment = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  try {
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');
    
    return expectedSignature === razorpaySignature;
  } catch (error) {
    return false;
  }
};

module.exports = {
  razorpay,
  createOrder,
  verifyPayment
};
