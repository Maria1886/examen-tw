const Sequelize = require('sequelize')
const sequelize = require('../config/database');
const Role = require('./Role');
const Spacecraft = require('./spacecraft');

const Astronaut = sequelize.define(
    "astronauts",
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

Astronaut.hasOne(Role, {
    onDelete: 'RESTRICT'
});

module.exports = Astronaut;