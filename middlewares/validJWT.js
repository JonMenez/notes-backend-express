const jwt = require('jsonwebtoken')
const User = require('../models/user')




const validJWT = async (request, response, next) => {

    const token = request.header('x-token')

    if (!token) {
        return response.status(401).json({
            msg: 'there is not token in header'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        // find user by id
        const user = await User.findById(uid)

        if (!user) {
            response.status(401).json({
                msg: 'this user is not in database'
            })
        }

        //virify user uid status is true
        if (!user.status) {
            response.status(401).json({
                msg: 'invalid token -user status false'
            })
        }

        request.user = user

        next()
    } catch (error) {
        console.log(error)
        response.status(401).json({
            msg: 'invalid token'
        })

    }
}


module.exports = {
    validJWT
}