
const validation = require('../middlewares/validation')
const validJWT = require('../middlewares/validJWT')
const validRole = require('../middlewares/validRole')
const validFile = require('./validateFile')

module.exports = {
    ...validation,
    ...validJWT,
    ...validRole,
    ...validFile
}