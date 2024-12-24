const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');

router.post('/create', storyController.createStory);
router.get('/', storyController.getAllStories);
router.get('/:id', storyController.getStoryById);
router.delete('/:id', storyController.deleteStory);
router.put('/:id', storyController.updateStory);

module.exports = router;