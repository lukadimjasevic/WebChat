'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
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
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};