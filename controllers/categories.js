const { Category } = require('../models')



const getCategories = async (request, response) => {

    const { from, limit } = request.query
    const query = { status: true }

    const [total, category] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    response.json({
        total,
        category
    }).end()
}

const getCategoryById = async (resquest, response) => {

    const { id } = resquest.params

    const category = await Category.findById(id).populate('user', 'name')


    response.json({
        category
    })
}

const createCategory = async (request, response) => {

    const name = request.body.name.toUpperCase()

    const categoryDB = await Category.findOne({ name })

    if (categoryDB) {
        response.status(400).json({
            msg: `Category: ${categoryDB.name} is already used`
        })
    }

    //Data to save in database
    const data = {
        name,
        user: request.user._id
    }

    const category = new Category(data)

    //Save to databse
    await category.save()

    response.status(201).json(category)
}

const updateCategory = async (request, response) => {

    const { id } = request.params
    const { status, user, ...data } = request.body

    data.name = data.name.toUpperCase()
    data.user = request.user._id

    const category = await Category.findByIdAndUpdate(id, data, { new: true })

    response.json(category)

}

const deleteCategory = async (request, response) => {

    const { id } = request.params
    const deletedCategory = await Category.findByIdAndUpdate(id, { status: false }, { new: true })

    response.json({
        deletedCategory
    })
}



module.exports = {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}