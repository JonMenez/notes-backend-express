const { Schema, model } = require('mongoose')

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'please insert a name'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

categorySchema.methods.toJSON = function () {
    const { __v, status, ...category } = this.toObject()
    return category
}


module.exports = model('Category', categorySchema)