const express = require('express')
const router = express.Router()
const Users = require('../models/user')


//getting all
router.get('/', async (req, res) => {

    try {
        const user = await Users.find()
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//post 
router.post('/', (req, res) => {
    const user = new Users({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    })
    try {
        const newUser = user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ messae: error.message })
    }

})
//updating one

router.patch('/;id', getUser, async (req, res) => {
    if (res.body.name != null) {
        res.user.name = res.body.name
    }
    if (res.body.age != null) {
        res.user.age = res.body.age
    }
    if (res.body.email != null) {
        res.user.email = res.body.email
    }
    try {
        const userUpdated = await res.user.save()
        res.json(userUpdated)
    } catch (error) {
        res.status(400).json({ messae: error.message })
    }



})
//deleted user

router.delete('/;id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json('deleted user successfully')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//middleware
async function getUser(req, res, next) {
    let user
    try {
        user = await Users.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'cannot find user' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.user = user
    next()
}
module.exports = router