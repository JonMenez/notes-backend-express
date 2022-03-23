const { request, response } = require('express')


const notesGet = (request, response) => {
    response.json('get petition CONTROLADOR')
}

const notePut = (request, response) => {
    const { id } = request.params

    response.json({
        name: 'Joan',
        id
    })
}
const notePost = (request, response) => {
    const { query } = request

    response.json({
        name: 'Joan',
        ...query
    })
}
const noteDelete = (request, response) => {
    response.json('delete petition')
}

module.exports = {
    notesGet,
    notePut,
    notePost,
    noteDelete
}