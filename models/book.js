'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // define association here
      Book.belongsTo(models.User, { foreignKey: 'upload_by' });
      Book.hasMany(models.Review, { foreignKey: 'book_id' });
    }
  }
  
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    pages: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    photo: DataTypes.STRING,
    upload_by: DataTypes.STRING,
    genre: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
  });
  
  return Book;
};
