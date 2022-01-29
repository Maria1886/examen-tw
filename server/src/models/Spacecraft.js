const Sequelize = require('sequelize')
const sequelize = require('../config/database');
const Astronaut = require('./Astronaut');

const Spacecraft = sequelize.define(
    "spacecrafts",
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
        },
        max_speed: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        mass: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamp: false,
        createdAt: false,
        updatedAt: false
    }
)

Spacecraft.hasMany(Astronaut,{
    onDelete: 'CASCADE'
});

module.exports = Spacecraft;

