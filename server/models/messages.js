'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
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
  Messages.init(
      {
          messages_id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              allowNull: false,
              autoIncrement: true,
          },
          user_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
          },
          group_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
          },
          message: {
              type: DataTypes.STRING(255),
              allowNull: false,
          },
      },
      {
          sequelize,
          tableName: "messages",
          modelName: "Message",
      }
  );
  return Messages;
};