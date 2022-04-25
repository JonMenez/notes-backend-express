const { Schema, model } = require('mongoose')

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'please insert a name'],
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    img: {
        type: String
    },

    description: { type: String },
    stock: { type: Boolean, default: true }
})

productSchema.methods.toJSON = function () {
    const { __v, status, ...product } = this.toObject()
    return product
}


module.exports = model('Product', productSchema)