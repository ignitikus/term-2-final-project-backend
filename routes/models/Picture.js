const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PictureSchema = new mongoose.Schema({
   owner:{type: Schema.Types.ObjectId, ref:'User'},
   status: Boolean,
   description: {type: String, default: ''},
   urls: {
      full: String,
      thumb: String
   }
})


module.exports = mongoose.model('Picture', PictureSchema)