
const express = require('express')
const cors = require('cors')
const { dbConection } = require('../database/config')



class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

        //Connect to database
        this.connectDB()

        //Middlewares
        this.middlewares()

        //Routes'a App
        this.routes()
    }

    async connectDB() {
        await dbConection()
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
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usersPath, require('../routes/users'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server connected, port:', this.port)
        })
    }
}

module.exports = Server