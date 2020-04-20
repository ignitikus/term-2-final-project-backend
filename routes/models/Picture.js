const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PictureSchema = new mongoose.Schema({
   status: Boolean,
   description: {type: String, default: ''},
   urls: {
      full: String,
      thumb: String
   }
})


module.exports = mongoose.model('Picture', PictureSchema)