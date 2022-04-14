const { Products } = require('../models')

const getProducts = async (request, response) => {
    const { from, limit } = request.query
    const query = { status: true }

    const [total, products] = await Promise.all([
        Products.countDocuments(query),
        Products.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    response.json({
        total,
        products
    }).end()
}

const getProductById = async (request, response) => {
    const { id } = request.params

    const product = await Products.findById(id)
        .populate('category', 'name')
        .populate('user', 'name')


    response.json({
        product
    })
}

const createProduct = async (request, response) => {

    const { status, user, ...body } = request.body

    const name = request.body.name.toUpperCase()

    const productDB = await Products.findOne({ name })

    if (productDB) {
        response.status(400).json({
            msg: `Product: ${productDB.name} already exist`
        })
    }

    //Data to save in database
    const data = {
        ...body,
        name,
        user: request.user._id
    }


    const product = new Products(data)

    //Save to database
    await product.save()

    response.status(201).json(product)


}

const updateProducts = async (request, response) => {

    const { id } = request.params
    const { status, user, ...data } = request.body

    if (data.name) {
        data.name = data.name.toUpperCase()
    }
    data.user = request.user._id

    const product = await Products.findByIdAndUpdate(id, data, { new: true })

    response.json(product)
}

const deleteProducts = async (request, response) => {

    const { id } = request.params
    const deletedProduct = await Products.findByIdAndUpdate(id, { status: false }, { new: true })

    response.json({
        deletedProduct
    })
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProducts,
    deleteProducts,
}