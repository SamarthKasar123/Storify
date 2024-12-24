const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Story = require('./story');

const Chapter = sequelize.define('Chapter', {
  content: { type: DataTypes.TEXT, allowNull: false },
  votes: { type: DataTypes.INTEGER, defaultValue: 0 },
});

Chapter.belongsTo(Story, { foreignKey: 'storyId' });
module.exports = Chapter;