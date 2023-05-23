'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_group_rel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Group }) {
      // define association here

      // users
      this.belongsTo(User, { foreignKey: "user_id" });
      
      // groups
      this.belongsTo(Group, { foreignKey: "group_id" });
    }
  }
  user_group_rel.init(
      {
          user_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
          },
          group_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
          },
      },
      {
          sequelize,
          tableName: "user_group_rel",
          modelName: "user_group_rel",
      }
  );
  return user_group_rel;
};