const User = require("../models/user")
const bcryptjs = require('bcryptjs')
const { generateJWT } = require("../helpers/generateJWT")
const { googleSignIn } = require("../helpers/googleVerify")


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

const googleSignin = async (request, response) => {

    const { id_token } = request.body

    try {

        const { name, email, img } = await googleSignIn(id_token)

        let user = await User.findOne({ email })
        if (!user) {

            //Create new user
            const data = {
                name,
                email,
                password: 'P',
                img,
                google: true
            }

            user = new User(data)
            await user.save()
        }

        //user exist in databae
        if (!user.status) {
            return response.status(401).json({
                msg: 'Talk to support, user blocked'
            })
        }

        //generate JWT
        const token = await generateJWT(user.id)

        response.json({
            user,
            token
        })
    } catch (error) {

        response.status(400).json({
            msg: 'invalid google token'
        })

    }

}


module.exports = {
    login,
    googleSignin
}