const User = require('../models/user')
const Note = require('../models/note')
const bcrypt = require('bcrypt')

const asyncHandler = require('express-async-handler')



//get all users
//get /users
//access Private
const getAllUsers = asyncHandler(async (req, res) =>
    {
        const user = await User.find().select('-password').lean()
        if(!user?.length)
        {
            return res.status(400).json({ Message : 'No users found'})
        }
        res.json(user)
    })

//create new user
//post /users
//access Private
const createNewUser = asyncHandler(async (req, res) =>
    {
        const { username, password, roles } = req.body
        if(!username || !password || !Array.isArray(roles) || !roles.length)
        {
            return res.status(400).json({ Message : "All fields are required" })
        }
        const duplicate = await User.findOne({username}).lean().exec()
        if(duplicate)
        {
            return res.status(409).json({ Message : "Duplicate username" })
        }

        const userObject = {username, password, roles}
        const user = await User.create(userObject)

        if(user)
        {
            res.status(201).json({ Message : `New user ${username} created`})
        }
        else
        {
            res.status(400).json({ Message : "Invalid user data"})

        }
    })

//update a user
//patch /users
//access Private
const updateUser = asyncHandler(async (req, res) =>
    {
        const { id, username, roles, active, password } = req.body
        if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean')
        {
            return res.status(400).json({ Message : "All fields are required" })
        }
        
        const user = await User.findById(id).exec()
        if(!user)
        {
            return res.status(400).json({ Message : "User not found"})
        }
        const duplicate = await User.findOne({ username }).lean().exec()

        if(duplicate && duplicate?._id.toString() !== id)
        {
            return res.status(409).json({ Message : "Duplicate username"})
        }
        user.username = username
        user.roles = roles
        user.active = active

        if(password)
        {
            user.password = await bcrypt.hash(password, 10)
        }

        const updatedUser = await user.save()
        res.status(200).json({Message : `${updatedUser.username} updated`})
    })

//delete a user
//delete /users
//access Private
const deleteUser = asyncHandler(async (req, res) =>
    {
        const { id } = req.body

        if(!id)
        {
            return res.status(400).json({Message : "User id is required"})
        }

        const note = await Note.findOne({ user: id}).lean().exec()
        if (note?.length)
        {
            return res.status(400).json({Message : "User has notes assigned"})
        }
        const user = await User.findById(id).exec()
        if(!user)
        {
            return res.status(400).json({Message : "user not found"})
        }
        await user.deleteOne()
        res.status(200).json({Message : `Username ${user.username} with ID ${user._id} deleted` })
    })

module.exports = 
{
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
}
