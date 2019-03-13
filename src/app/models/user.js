const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    passwordResetToken: {
      type: DataTypes.STRING,
      //select : false
    },

    passwordResetExpires: {
      type: DataTypes.DATE,
      //select : false
    }
  }, {
      tableName: 'user'
    });
  User.associate = function (models) {
    User.hasMany(models.Project);
  };
  return User;
};