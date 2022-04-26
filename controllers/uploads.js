const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { uploadFile } = require("../helpers/uploadFile");
const { User, Products } = require('../models')


const loadFile = async (request, response) => {

    try {
        //images
        const path = await uploadFile(request.files, undefined, "images")

        response.json({ path })
    } catch (msg) {
        response.status(400).json({ msg })
    }
}

const updateImage = async (request, response) => {
    const { collection, id } = request.params

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                response.status(500).json({
                    msg: 'There is not user id ' + id
                })
            }
            break;
        case 'products':
            model = await Products.findById(id)
            if (!model) {
                response.status(500).json({
                    msg: 'There is not product id ' + id
                })
            }
            break;
        default:
            return response.status(500).json({
                msg: 'fotgot to enter colection'
            })
    }

    //Delete previous image
    if (model.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.img)
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)
        }
    }

    //upload Image
    const pathCollection = await uploadFile(request.files, undefined, collection)
    model.img = pathCollection

    await model.save()

    response.json(model)
}
const updateImageColudinary = async (request, response) => {
    const { collection, id } = request.params

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                response.status(500).json({
                    msg: 'There is not user id ' + id
                })
            }
            break;
        case 'products':
            model = await Products.findById(id)
            if (!model) {
                response.status(500).json({
                    msg: 'There is not product id ' + id
                })
            }
            break;
        default:
            return response.status(500).json({
                msg: 'fotgot to enter colection'
            })
    }

    //Delete previous image
    if (model.img) {
        const nameArr = model.img.split('/')
        const name = nameArr[nameArr.length - 1]
        const [public_url] = name.split('.')
        cloudinary.uploader.destroy(public_url)
    }

    //upload Image to Coludinary
    const { tempFilePath } = request.files.file
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    model.img = secure_url

    await model.save()

    response.json(model)
}

const getImage = async (request, response) => {
    const { collection, id } = request.params

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                response.status(500).json({
                    msg: 'There is not user id ' + id
                })
            }
            break;
        case 'products':
            model = await Products.findById(id)
            if (!model) {
                response.status(500).json({
                    msg: 'There is not product id ' + id
                })
            }
            break;
        default:
            return response.status(500).json({
                msg: 'fotgot to enter colection'
            })
    }

    //Delete previous image
    if (model.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.img)
        if (fs.existsSync(pathImage)) {
            return response.sendFile(pathImage)
        }
        return response.redirect(model.img)
    }

    const noImage = path.join(__dirname, '../assets', 'no-image.jpg')

    response.sendFile(noImage)
}

module.exports = {
    loadFile,
    updateImage,
    getImage,
    updateImageColudinary
}