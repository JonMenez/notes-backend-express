const path = require('path')
const { v4: uuidv4 } = require('uuid');


const uploadFile = (files, allowedExtensions = ['png', 'jpeg', 'jpg', 'gif'], directoy = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const cutOffName = file.name.split('.')
        const fileExtension = cutOffName[cutOffName.length - 1]

        //Validate extension
        if (!allowedExtensions.includes(fileExtension)) {
            return reject(
                `Extension ${fileExtension} is not valid, make sure to use ${allowedExtensions}`
            )
        }

        const tempName = uuidv4() + '.' + fileExtension
        const uploadPath = path.join(__dirname, '../uploads/', directoy, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(tempName)
        });
    })
}

module.exports = {
    uploadFile
}