
const express = require('express')
const cors = require('cors')



class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.notesPath = '/api/notes'

        //Middlewares
        this.middlewares()

        //Routes'a App
        this.routes()
    }

    middlewares() {

        //CORS
        this.app.use(cors())

        // Parse and lecture JSON
        this.app.use(express.json())

        //public directory
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.notesPath, require('../routes/notes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server connected, port:', this.port)
        })
    }
}

module.exports = Server