const express = require('express');
const cropController = require('../controllers/cropController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/upload', authMiddleware, cropController.uploadCrop);
router.get('/marketplace', authMiddleware, cropController.getMarketplaceCrops);
router.get('/search', authMiddleware, cropController.searchCrops);
router.get('/my-crops', authMiddleware, cropController.getMyCrops);
router.get('/:cropId', authMiddleware, cropController.getCropDetails);
router.delete('/:cropId', authMiddleware, cropController.removeCrop);
router.get('/price/government', authMiddleware, cropController.getGovernmentPrice);

module.exports = router;
