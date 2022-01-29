const express = require('express');
const Role = require('../models/Role');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const id_p = req.params.id;
    console.log(id_p)
    try {
        const role = await Role.findOne({
            where: {
                id: id_p
            }
        })
        return res.json(role)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.post("/", async (req, res) => {
    const name = req.body.name;
    if (name.length < 2) return res.sendStatus(400)
    try {
        await Role.create({
            name: name
        })
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

module.exports = router;