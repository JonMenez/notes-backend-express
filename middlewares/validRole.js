const { response } = require("express");
const { request } = require("express");



const validAdminRole = (request, response, next) => {

    if (!request.user) {
        return response.status(500).json({
            msg: "validating user role without token"
        })
    }

    const { rol, name } = request.user

    if (rol !== 'ADMIN_ROLE') {
        return response.status(403).json({
            msg: `user ${name} is not admin`
        })
    }

    next()
}

const validRole = (...roles) => {
    return (request, response, next) => {

        if (!request.user) {
            return response.status(500).json({
                msg: "validating user role without token"
            })
        }

        if (!roles.includes(request.user.rol)) {
            return response.status(403).json({
                msg: `role: ${request.user.rol} is not allowed to this operation, role most be ${roles}`
            })
        }
        next()
    }
}



module.exports = {
    validAdminRole,
    validRole
}