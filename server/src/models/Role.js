const Sequelize = require('sequelize')
const sequelize = require('../config/database');

const Role = sequelize.define(
    "roles",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    },
    {
        timestamp: false,
        createdAt: false,
        updatedAt: false
    }
)

module.exports = Role;