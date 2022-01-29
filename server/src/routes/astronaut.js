const express = require('express');
const Astronaut = require('../models/Astronaut');
const Role = require('../models/Role');
const Spacecraft = require('../models/Spacecraft');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.sendStatus(400);
    try {
        const astr = await Astronaut.findOne({
            where: {
                id: id
            },
            include: [Role]
        })
        return res.status(200).json(astr);
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
})

router.post("/", async (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    const spacecraft = req.body.spacecraft;
    if (name.length < 5 || !spacecraft || !role) return res.sendStatus(400);

    try {
        const role_db = await Role.findOne({
            where: {
                name: role
            }
        }) 
        if (!role_db) return res.status(404).json("Role not found.");

        const spacecraft_db = await Spacecraft.findOne({
            where: {
                name: spacecraft
            }
        }) 
        if (!spacecraft_db) return res.status(404).json("Spacecraft not found.");

        const astr = await Astronaut.create({
            name: name
        })

        await astr.setRole(role_db);
        await spacecraft_db.addAstronaut(astr);
        return res.sendStatus(200);
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
})

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.sendStatus(400);
    const name = req.body.name;

    if (name.length < 5) return res.sendStatus(400);

    try {
        const astr = await Astronaut.findOne({
            where: {
                id: id
            }
        })
        await astr.update({name: name});
        await astr.save();

        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.sendStatus(400);
    try {
        await Astronaut.destroy({
			where: {
				id: id
			}
		})
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
})


module.exports =  router;