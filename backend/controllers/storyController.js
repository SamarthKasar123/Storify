const Story = require('../models/story');

// Create a new story
exports.createStory = async (req, res) => {
  try {
    const { title, description, isPublic, authorId } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    // Create a new story using Sequelize's `create()` method
    const story = await Story.create({
      title,
      description,
      isPublic,
      authorId // Assuming you pass authorId in the request body
    });

    res.status(201).json({ message: 'Story created successfully!', story });
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Fetch all stories
exports.getAllStories = async (req, res) => {
  try {
    // Use Sequelize's `findAll()` method to get all stories
    const stories = await Story.findAll({
      order: [['createdAt', 'DESC']], // Sort by creation date
    });

    res.status(200).json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Fetch a single story by ID
exports.getStoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Use Sequelize's `findOne()` method to get a story by ID
    const story = await Story.findOne({
      where: { id },
    });

    if (!story) {
      return res.status(404).json({ error: 'Story not found.' });
    }

    res.status(200).json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Delete a story by ID
exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;

    // Use Sequelize's `destroy()` method to delete a story
    const deletedStory = await Story.destroy({
      where: { id },
    });

    if (!deletedStory) {
      return res.status(404).json({ error: 'Story not found.' });
    }

    res.status(200).json({ message: 'Story deleted successfully!' });
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Update a story by ID
exports.updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isPublic } = req.body;

    // Use Sequelize's `update()` method to update a story
    const [updated] = await Story.update(
      { title, description, isPublic },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Story not found.' });
    }

    // Fetch the updated story
    const updatedStory = await Story.findOne({ where: { id } });

    res.status(200).json({ message: 'Story updated successfully!', story: updatedStory });
  } catch (error) {
    console.error('Error updating story:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
