const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateMobileNo = (mobileNo) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobileNo);
};

const validateIFSC = (ifsc) => {
  const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return regex.test(ifsc);
};

const validateUPI = (upi) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
  return regex.test(upi);
};

module.exports = {
  validateEmail,
  validateMobileNo,
  validateIFSC,
  validateUPI
};
