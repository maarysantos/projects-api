const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {

    title: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
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

