const Sequelize = require('Sequelize');
const sequelize = require('../../database/index');

const bcrypt = require ('bcryptjs');

const Usuario =  sequelize.define('usuario', {
   
  nm_login : {
      type: Sequelize.STRING,
      primaryKey : true,
      allowNull: false
    },
  nm_usuario: {
      type: Sequelize.STRING,
      allowNull : false
    },
  
  nm_senha : {
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

  hooks: {
      beforeCreate : usuario => {
        const salt = bcrypt.genSaltSync();
        usuario.nm_senha = bcrypt.hashSync(usuario.nm_senha, salt);
      }
    }
  });

Usuario.sync();

module.exports = Usuario;
