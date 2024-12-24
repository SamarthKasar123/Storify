const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChapterVote = sequelize.define('ChapterVote', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chapterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vote: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
});

module.exports = ChapterVote;