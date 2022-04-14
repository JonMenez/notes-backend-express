const { Router } = require('express')
const { check } = require('express-validator')

const {
    getProducts,
    getProductById,
    createProduct,
    updateProducts,
    deleteProducts } = require('../controllers/products')


const router = Router()

const { categoryExistById, productExistById } = require('../helpers/db-validators')

const { validJWT, validationField, validAdminRole } = require('../middlewares')


router.get('/', getProducts)

router.get('/:id', [
    check('id', 'Invalid MongoId').isMongoId(),
    check('id').custom(productExistById),
    validationField
], getProductById)

router.post('/', [
    validJWT,
    check('name', 'name is required').not().isEmpty(),
    check('category', 'category mongo Id invalid').isMongoId(),
    check('category').custom(categoryExistById),
    validationField,
], createProduct)

router.put('/:id', [
    validJWT,
    check('id').custom(productExistById),
    validationField
], updateProducts)

router.delete('/:id', [
    validJWT,
    validAdminRole,
    check('id', 'Invalid MongoId').isMongoId(),
    check('id').custom(productExistById),
    validationField
], deleteProducts)

module.exports = router
