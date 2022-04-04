
const validation = require('../middlewares/validation')
const validJWT = require('../middlewares/validJWT')
const validRole = require('../middlewares/validRole')

module.exports = {
    ...validation,
    ...validJWT,
    ...validRole,
}