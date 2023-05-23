'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_group_rel, User, Message }) {
      // define association here

      // users
      this.belongsTo(User, { foreignKey: "admin_id" });

      // user_group_rel
      this.hasMany(user_group_rel, { foreignKey: "group_id" });

      // messages
      this.hasMany(Message, { foreignKey: "group_id" });
    }
  }
  Group.init(
      {
          group_id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              allowNull: false,
              autoIncrement: true,
          },
          group_code: {
              type: DataTypes.STRING(16),
              allowNull: false,
              unique: true,
          },
          name:  {
              type: DataTypes.STRING(24),
              allowNull: false,
          },
          admin_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
          }
      },
      {
          sequelize,
          tableName: "groups",
          modelName: "Group",
      }
  );
  return Group;
};