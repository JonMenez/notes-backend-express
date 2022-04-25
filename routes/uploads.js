const { Router } = require('express')
const { check } = require('express-validator')
const { loadFile, getImage, updateImageColudinary } = require('../controllers/uploads')
const { allowedColection } = require('../helpers/db-validators')
const { validationField, validFile } = require('../middlewares')


const router = Router()

router.post('/', validFile, loadFile)

router.put('/:collection/:id', [
    validFile,
    check('id', 'invalid mongoID').isMongoId(),
    check('collection').custom(c => allowedColection(c, ['users', 'products'])),
    validationField
], updateImageColudinary)

router.get('/:collection/:id', [
    check('id', 'invalid mongoID').isMongoId(),
    check('collection').custom(c => allowedColection(c, ['users', 'products'])),
    validationField
], getImage)


module.exports = router