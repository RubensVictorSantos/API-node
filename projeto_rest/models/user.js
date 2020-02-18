'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncremente: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    timestamp: false
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};