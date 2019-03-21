const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },

    email: {
      type: DataTypes.STRING,
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
      tableName: 'user',
      hooks: {
        beforeCreate : usuario => {
          const salt = bcrypt.genSaltSync();
          usuario.password = bcrypt.hashSync(usuario.password, salt);
        },
        beforeUpdate : usuario =>{
          const salt = bcrypt.genSaltSync();
          usuario.password = bcrypt.hashSync(usuario.password, salt);
          }
      }
    });
  User.associate = function (models) {
    User.hasMany(models.Project);
  };
  return User;
 
};

