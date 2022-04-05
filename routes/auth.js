const { Router } = require('express')
const { check } = require('express-validator')

const { validationField } = require('../middlewares/validation')

const { login, googleSignin } = require('../controllers/auth')


const router = Router()

router.post('/login', [
    check('email', 'Email is required to login').isEmail(),
    check('password', 'Password is required to login').not().isEmpty(),
    validationField
], login)

router.post('/google', [
    check('id_token', 'id_token is required').not().isEmpty(),
    validationField
], googleSignin)

module.exports = router
