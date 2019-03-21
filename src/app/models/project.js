const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },

    title: {
      type: DataTypes.STRING,
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
    this.belongsTo(models.User, { foreignKey: 'fk_userId' });
  };
  return Project;
};

