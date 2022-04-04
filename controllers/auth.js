const User = require("../models/user")
const bcryptjs = require('bcryptjs')
const { generateJWT } = require("../helpers/generateJWT")





const login = async (request, response) => {
    const { email, password } = request.body

    try {

        //Varify user
        const user = await User.findOne({ email })
        if (!user) {
            return response.status(500).json({
                msg: 'invalid email or password - email'
            })
        }

        //Verify if user is active
        if (!user.status) {
            return response.status(400).json({
                msg: 'invalid email or password - status'
            })
        }

        //Verify password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return response.status(400).json({
                msg: 'invalid email or password - password'
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id)

        response.json({
            user,
            token
        })


    } catch (error) {
        console.log(error)
        response.status(400).json({
            msg: 'user or passwrod are wrong'
        })
    }





}

module.exports = {
    login
}