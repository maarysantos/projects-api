const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    //pertecence a um projeto e a um usuario

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
  };
  return Task;
};