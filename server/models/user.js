"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ user_group_rel, Group, Message }) {
            // define association here

            // groups
            this.hasMany(Group, { foreignKey: "admin_id", sourceKey: "user_id" });

            // user_group_rel
            this.hasMany(user_group_rel, { foreignKey: "user_id" });

            // messages
            this.hasMany(Message, { foreignKey: "user_id" });
        }
    }
    User.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING(24),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(320),
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING(16),
                allowNull: true,
            },
            bio: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            picture: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            token: {
                type: DataTypes.STRING(128),
                allowNull: true,
            },
            token_created: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "users",
            modelName: "User",
        }
    );
    return User;
};
