const Role = require('../models/role')
const User = require('../models/user')

//Check if Role exist
const rolValidation = async (rol = '') => {
    const existRole = await Role.findOne({ rol })
    if (!existRole) {
        throw new Error('this role does not exist in DB')
    }
}

// Check email availability
const emailExist = async (email = '') => {
    const checkEmail = await User.findOne({ email })
    if (checkEmail) {
        throw new Error(`email: ${email} already in use`)
    }
}

// Check if valid MongoId
const mongoIdExist = async (id) => {
    const MongoId = await User.findById(id)
    if (!MongoId) {
        throw new Error(`${id} is not a MongoId`)
    }
}

module.exports = {
    rolValidation,
    emailExist,
    mongoIdExist
}