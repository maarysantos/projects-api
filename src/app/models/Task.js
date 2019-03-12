const Sequelize = require('Sequelize');
const sequelize = require('../../database/index');

const bcrypt = require ('bcryptjs');

const Task =  sequelize.define('task', {
//pertecence a um projeto e a um usuario

    title : {
        type: Sequelize.STRING,
        primaryKey : true,
        allowNull: false
      },
      description : {
        type: Sequelize.STRING,
        allowNull: false
      },
      completed: {
          type : Sequelize.BOOLEAN,
          defaultValue : false,
          allowNull: false
      }
    }
            //assigneTo(user) e project

      ,{

        classMethods: {
            associate: (models) => {
                Task.belongsTo(models.User)
              
            }
        }
    });
