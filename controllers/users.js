const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const usersGet = async (request, response) => {
    const { from, limit } = request.query
    const query = { status: true }

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    response.json({
        total,
        users
    }).end()
}

const usersPut = async (request, response) => {
    const { id } = request.params
    const { password, email, google, ...rest } = request.body

    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync(10)
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest)

    response.json({
        put: 'put request',
        user
    }).end()
}

const usersPost = async (request, response) => {

    const { name, password, email, rol } = request.body
    const user = new User({ name, password, email, rol })

    // Encrypt password
    const salt = bcryptjs.genSaltSync(10)
    user.password = bcryptjs.hashSync(password, salt)

    // Save to database
    await user.save()

    response.json(user).end()
}

const usersDelete = async (request, response) => {
    const { id } = request.params

    const user = await User.findByIdAndUpdate(id, { status: false })


    response.json({ user }).end()
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}