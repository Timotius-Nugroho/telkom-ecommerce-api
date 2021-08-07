const fs = require('fs')

const deleteImage = (imgLoc) => {
  fs.unlink(imgLoc, (error) => {
    error ? console.log('Image not found') : console.log('Image deleted')
  })
}

module.exports = deleteImage
