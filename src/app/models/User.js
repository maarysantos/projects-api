const Sequelize = require('Sequelize');
const sequelize = require('../../database/index');

const bcrypt = require ('bcryptjs');

const User =  sequelize.define('user', {
   
  email : {
      type: Sequelize.STRING,
      primaryKey : true,
      allowNull: false
    },
  name: {
      type: Sequelize.STRING,
      allowNull : false
    },
  
  password : {
      type: Sequelize.STRING,
      allowNull : false,
      
    },
  
  passwordResetToken : {
    type : Sequelize.STRING,
    //select : false
  },

  passwordResetExpires : {
    type : Sequelize.DATE,
    //select : false
  }
  },{

    classMethods: {
      associate: (models) => {
          User.hasMany(models.Project);
        
      }
  }
});

//User.sync();

module.exports = User;
