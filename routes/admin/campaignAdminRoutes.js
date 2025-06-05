const express = require('express');
const router = express.Router();
const campaignAdminController = require('../../controllers/admin/campaignAdminController');
const { isAdmin } = require('../../middleware/adminMiddleware');
const upload = require('../../middleware/uploadMiddleware');

router.get('/campaigns', isAdmin, campaignAdminController.getAllCampaigns);
router.post('/campaigns', isAdmin, upload.single('banner'), campaignAdminController.createCampaign);
router.put('/campaigns/:id', isAdmin, upload.single('banner'), campaignAdminController.updateCampaign);
router.delete('/campaigns/:id', isAdmin, campaignAdminController.deleteCampaign);

module.exports = router;