const express = require('express');
const Spacecraft = require('../models/Spacecraft');
const router = express.Router();
const { Op } = require("sequelize");

router.post('/filter', async (req, res) => {
    const speed = parseInt(req.body.speed);
    const mass = parseInt(req.body.mass);
    const page = parseInt(req.body.page)

    if (isNaN(mass) || isNaN(speed) || isNaN(page)) return res.sendStatus(400)

    try {
        const spacecrafts = await Spacecraft.findAndCountAll({
            where: {
                max_speed: {
                    [Op.gte]: speed
                },
                mass: {
                    [Op.gte]: mass
                }
            },
            limit: 10,
            offset: 10 * page
        })
        return res.json(spacecrafts.rows)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
})

router.post('/sort', async (req, res) => {
    const page = parseInt(req.body.page)
    if (isNaN(page)) return res.sendStatus(400)

    try {
        const spacecrafts = await Spacecraft.findAndCountAll({
            limit: 10,
            offset: 10 * page
        });
        spacecrafts.rows.sort((a, b) => a.dataValues.max_speed - b.dataValues.max_speed)

        return res.json(spacecrafts.rows)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
})

module.exports = router;
