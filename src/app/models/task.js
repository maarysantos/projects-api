const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        }
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
      tableName: 'task'
    });
  Task.associate = function (models) {
    Task.belongsTo(models.User, { foreignKey: 'fk_user' });
    Task.belongsTo(models.Project, { foreignKey: 'fk_projectId' });
  };
  return Task;
  
};

