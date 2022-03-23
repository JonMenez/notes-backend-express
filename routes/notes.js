const { Router } = require('express')
const { notesGet,
    notePost,
    notePut,
    noteDelete } = require('../controllers/notes')

const router = Router()

router.get('/', notesGet)

router.put('/:id', notePut)

router.post('/:id', notePost)

router.delete('/id', noteDelete)



module.exports = router