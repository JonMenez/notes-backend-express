const mongoose = require('mongoose');

const dbConection = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN)
        console.log('Database connected')

    } catch (error) {

        console.log(error)
        throw new Error('Error starting database')

    }
}




module.exports = {
    dbConection
}