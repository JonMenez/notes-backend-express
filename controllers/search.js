const { ObjectId } = require('mongoose').Types

const user = require('../models/user')
const category = require('../models/category')
const product = require('../models/product')



const collectionsAllowed = [
    'categories',
    'products',
    'users'
]


const searchUser = async (query, response) => {

    const validMongoId = ObjectId.isValid(query)

    if (validMongoId) {
        const User = await user.findById(query)
        return response.json({
            result: (User) ? [User] : []
        })
    }

    const regex = new RegExp(query, 'i')

    const users = await user.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    })

    response.json({
        result: users
    })
}

const searchCategories = async (query, response) => {

    const validMongoId = ObjectId.isValid(query)

    if (validMongoId) {
        const Category = await category.findById(query)
        return response.json({
            result: (Category) ? [Category] : []
        })
    }

    const regex = new RegExp(query, 'i')

    const categories = await category.find({ name: regex, status: true })

    response.json({
        result: categories
    })
}

const searchProducts = async (query, response) => {

    const validMongoId = ObjectId.isValid(query)

    if (validMongoId) {
        const Product = await product.findById(query)
            .populate('category', 'name')
        return response.json({
            result: (Product) ? [Product] : []
        })
    }

    const regex = new RegExp(query, 'i')

    const products = await product.find({ name: regex, status: true })
        .populate('category', 'name')

    response.json({
        result: products
    })
}

const search = async (request, response) => {
    const { collection, query } = request.params

    if (!collectionsAllowed.includes(collection)) {
        return response.status(500).json({
            msg: `Collections allowed: ${collectionsAllowed}`
        })
    }

    switch (collection) {
        case 'categories':
            searchCategories(query, response)
            break;
        case 'products':
            searchProducts(query, response)
            break;
        case 'users':
            searchUser(query, response)
            break;

        default:
            response.status(500).json({
                msg: 'forgot to do this search!'
            })
    }
}

module.exports = {
    search
}