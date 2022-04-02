const { Schema, model } = require('mongoose')

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'please insert a valid Role']
    }
})


module.exports = model('Role', RoleSchema)