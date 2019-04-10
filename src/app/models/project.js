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
      allowNull: false,
      validate : {
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        },
        len: {
          args:[4,20],
          msg : 'Esse campo deve ter entre 4 e 20 caracteres'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty :{
          msg : 'Esse campo não pode ser vazio'
        },
        max : {
          msg : 'Não pode passar de 500 caracteres'
        }
      }
    }
  }, {
      tableName: 'project'
    });
  Project.associate = function (models) {
    this.belongsTo(models.User, { foreignKey: 'fk_userId' });
  };
    return Project;
};

