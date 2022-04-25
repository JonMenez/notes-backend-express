

const validFile = (request, response, next) => {
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).json({
            msg: 'No files were uploaded.'
        });
    }
    next()
}

module.exports = {
    validFile
}