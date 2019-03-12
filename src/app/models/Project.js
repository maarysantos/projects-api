const Sequelize = require('Sequelize');
const sequelize = require('../../database/index');

const bcrypt = require ('bcryptjs');

const Project =  sequelize.define('project', {

    title : {
        type: Sequelize.STRING,
        primaryKey : true,
        allowNull: false
      },
      description : {
        type: Sequelize.STRING,
        allowNull: false
      }
    }
      ,{


        classMethods: {
            associate: (models) => {
                Project.belongsTo(models.User)
              
            }
        }
    });
