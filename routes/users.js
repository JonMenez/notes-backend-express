const { Router } = require('express')
const { check } = require('express-validator')

const { validationField, validJWT, validAdminRole } = require('../middlewares')

const { rolValidation, emailExist, mongoIdExist } = require('../helpers/db-validators')

const { usersGet,
    usersPut,
    usersPost,
    usersDelete } = require('../controllers/users')

const router = Router()

router.get('/', usersGet)

router.put('/:id', [
    check('id', 'Invalid MongoId').isMongoId(),
    check('id').custom(mongoIdExist),
    check('rol').custom(rolValidation),
    validationField
], usersPut)

router.post('/', [
    check('name', 'Name is empty').not().isEmpty(),
    check('password', 'The password must be at least 6 characters long').isLength({ min: 6 }),
    check('email', 'Email already in use').isEmail(),
    check('email').custom(emailExist),
    // check('rol', 'Invalid rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(rolValidation),
    validationField
], usersPost)

router.delete('/:id', [
    validJWT,
    validAdminRole,
    check('id', 'Invalid MongoId').isMongoId(),
    validationField
], usersDelete)



module.exports = router