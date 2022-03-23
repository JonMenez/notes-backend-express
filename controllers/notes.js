const { request, response } = require('express')


const notesGet = (request, response) => {
    response.json('get petition CONTROLADOR').end()

}

const notePut = (request, response) => {
    const { id } = request.params

    response.json({
        name: 'Joan',
        id
    }).end()
}
const notePost = (request, response) => {
    const { query } = request

    response.json({
        name: 'Joan',
        ...query
    }).end()
}
const noteDelete = (request, response) => {
    response.json('delete petition').end()
}

module.exports = {
    notesGet,
    notePut,
    notePost,
    noteDelete
}