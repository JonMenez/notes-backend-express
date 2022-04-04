const { Router } = require('express')
const { check } = require('express-validator')

const { validationField } = require('../middlewares/validation')

const { login } = require('../controllers/auth')


const router = Router()

router.post('/login', [
    check('email', 'Email is required to login').isEmail(),
    check('password', 'Password is required to login').not().isEmpty(),
    validationField
], login)


module.exports = router
