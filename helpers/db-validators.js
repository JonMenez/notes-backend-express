const Product = require('../models/product')
const Category = require('../models/category')
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

// Check category by id
const categoryExistById = async (id) => {
    const checkCategory = await Category.findById(id)
    if (!checkCategory) {
        throw new Error(`there is not category with id: ${id}`)
    }
}

// Check product by id
const productExistById = async (id) => {
    const checkProduct = await Product.findById(id)
    if (!checkProduct) {
        throw new Error(`there is not product with id: ${id}`)
    }
}

const allowedColection = (colection = '', colections = []) => {

    const validate = colections.includes(colection)
    if (!validate) {
        throw new Error(`Colection: ${colection} does not exist, ${colections}`)
    }

    return true
}

module.exports = {
    categoryExistById,
    emailExist,
    mongoIdExist,
    productExistById,
    rolValidation,
    allowedColection,
}