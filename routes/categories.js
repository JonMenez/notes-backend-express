
const { Router } = require('express')
const { check } = require('express-validator')
const { getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory } = require('../controllers/categories')
const { categoryExistById } = require('../helpers/db-validators')

const { validJWT, validationField, validAdminRole } = require('../middlewares')


const router = Router()

router.get('/', getCategories)

router.get('/:id', [
    check('id', 'Invalid MongoId').isMongoId(),
    check('id').custom(categoryExistById),
    validationField
], getCategoryById)

router.post('/', [
    validJWT,
    check('name', 'name is required').not().isEmpty(),
    validationField,
], createCategory)

router.put('/:id', [
    validJWT,
    check('name', 'name is required').not().isEmpty(),
    check('id').custom(categoryExistById),
    validationField
], updateCategory)

router.delete('/:id', [
    validJWT,
    validAdminRole,
    check('id', 'Invalid MongoId').isMongoId(),
    check('id').custom(categoryExistById),
    validationField
], deleteCategory)

module.exports = router
