
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbConection } = require('../database/config')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            auth: '/api/auth',
            search: '/api/search',
            categories: '/api/categories',
            products: '/api/products',
            uploads: '/api/uploads',
            users: '/api/users',
        }

        //Connect to database
        this.connectDB()

        //Middlewares
        this.middlewares()

        //Routes's App
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

        //File upload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.search, require('../routes/search'))
        this.app.use(this.paths.categories, require('../routes/categories'))
        this.app.use(this.paths.products, require('../routes/products'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
        this.app.use(this.paths.users, require('../routes/users'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server connected, port:', this.port)
        })
    }
}

module.exports = Server