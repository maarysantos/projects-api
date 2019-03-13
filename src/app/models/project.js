const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {

    title: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      tableName: 'project'
    });
  Project.associate = function (models) {
    this.belongsTo(models.User, { foreignKey: 'fk_user' });
  };
  return Project;
};