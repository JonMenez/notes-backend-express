const jwt = require('jsonwebtoken')

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = { uid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject('token could no be created')
            } else {
                resolve(token)
            }
        })

    })

}

module.exports = {
    generateJWT
}