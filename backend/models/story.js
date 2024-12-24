const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Story = sequelize.define('Story', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  isPublic: { type: DataTypes.BOOLEAN, defaultValue: true },
});

Story.belongsTo(User, { foreignKey: 'authorId' });
module.exports = Story;