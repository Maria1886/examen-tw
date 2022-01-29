const express = require('express');
const Astronaut = require('../models/Astronaut');
const Spacecraft = require('../models/Spacecraft');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.sendStatus(400);

    try {
        const space = await Spacecraft.findOne({
            where: {
                id: id
            },
            include: [Astronaut]
        })
        return res.json(space);
    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})

router.post("/", async (req, res) => {
    const name = req.body.name;
    const speed = parseInt(req.body.max_speed);
    const mass = parseInt(req.body.mass);
    if (name.length < 3 || speed <= 1000 || mass <= 200) return res.sendStatus(400);

    try {
        await Spacecraft.create({
            name: name,
            max_speed: speed,
            mass: mass
        })

        return res.sendStatus(200);
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
})

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.sendStatus(400);

    const name = req.body.name;
    const speed = parseInt(req.body.max_speed);
    const mass = parseInt(req.body.mass);
    if (name.length < 3 || speed <= 1000 || mass <= 200) return res.sendStatus(400);

    try {
        const space = await Spacecraft.findOne({
            where: {
                id: id
            }
        })
        await space.update({
            name: name,
            max_speed: speed,
            mass: mass
        })
        await space.save();

        return res.sendStatus(200);
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.sendStatus(400);

    try {
        await Spacecraft.destroy({
            where: {
                id: id
            }
        })

        return res.sendStatus(200);
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
})

module.exports = router;