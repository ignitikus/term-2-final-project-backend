const jwt = require('jsonwebtoken')
const axios = require('axios')
const faker = require('faker')
const User = require('../models/User')
const Picture = require('../models/Picture')
const bcrypt = require('bcryptjs')

module.exports = {

   getRandomPic: async(req,res,next) => {
      try {
         // const randomPic = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.ACCESS_KEY}`)
         // return res.json({picture: {...randomPic.data}})
         return res.json({picture: {...testPic.picture}})
      } catch (error) {
         console.log(error)
      }
   },

   getGallery: async(req,res,next) => {
      try {
         await jwt.verify(req.params.token, process.env.JWT_SECRET, async(err, decoded) => {
            if(err){
               return res.json(err)
            }
            const allPictures = await Picture.find({owner: decoded.user._id})
            return res.json(allPictures)
         })
      } catch (error) {
         console.log(error)
      }
   },

   savePicture: async(req,res,next) => {
      try {
         await jwt.verify(req.body.token, process.env.JWT_SECRET, async(err, decoded) => {
            if(err){
               return res.json(err)
            }
            const foundUser = await User.findOne({email: decoded.user.email})
            if(!foundUser) return res.json('No user found')
            const newPic = new Picture()
            newPic.owner = foundUser._id
            newPic.status = req.body.status
            newPic.description = req.body.description
            newPic.urls.full = req.body.urls.full
            newPic.urls.thumb = req.body.urls.thumb
            newPic.save().then(pic => res.json(pic))
         })
         
      } catch (error) {
         console.log(error)
      }
   },

   login: async(req,res,next) => {
      const user = await User.findOne({email: req.body.email})
      if(user){
         const passCheck = await bcrypt.compare(req.body.pass, user.password)
         if(!passCheck){
            return res.json({message: 'check credentials'})
         }else{
            jwt.sign({user}, process.env.JWT_SECRET, /*{ expiresIn: '10000' },*/ (err, token) => {
            res.json({message:'Success', token, email: user.email, avatar: user.avatar})
            })
         }
      }else{
         return res.json({message:'User not found'})
      }
   },

   register: async(req,res,next) => {
      try {
         const user = await User.findOne({email:req.body.email })
         if(user) return res.json({message: 'already exists'})
         const newUser = new User
         newUser.avatar = faker.image.avatar()
         newUser.email = req.body.email
         newUser.password = req.body.pass

         newUser.save().then(user=>{
            jwt.sign({user}, process.env.JWT_SECRET, /*{ expiresIn: '10000' },*/ (err, token) => {
            res.json({message:'Success', token, email: user.email, avatar: user.avatar})
            })
         })
      } catch (error) {
         console.log(error)
      }  
   },

   updatePicStatus: async(req,res,next) => {
      try {
         await jwt.verify(req.body.token, process.env.JWT_SECRET, async(err, {user}) => {
            if(err){
               return res.json(err)
            }
         await Picture.findOneAndUpdate({_id: req.body.id}, {status: !req.body.status})
         })
      } catch (error) {
         console.log(error)
      }
   },

   deletePicture: async(req,res,next) => {
      try {
         await jwt.verify(req.params.token, process.env.JWT_SECRET, async(err, {user}) => {
            if(err){
               return res.json(err)
            }
            await Picture.deleteOne({_id: req.params.id})
         })
      } catch (error) {
         console.log(error)
      }
   },

   savePhoto: async(req,res,next) => {
      try {
         await jwt.verify(req.body.user.token, process.env.JWT_SECRET, async(err, {user}) => {
            if(err){
               return res.json(err)
            }
            const foundUser = await User.findOne({email: user.email})
            if(!foundUser) return res.json('No user found')
         
            const screenshot = new Picture
            screenshot.owner = foundUser._id
            screenshot.status = true
            screenshot.description = `Screenshot ${new Date()}`
            screenshot.urls.full = req.body.screenshot
            screenshot.urls.thumb = req.body.screenshot
            screenshot.save().then(pic => res.json({message: 'Success', pic})).catch((err) => {
               return res.json({message: 'Couldn\'t save', err})
            })
         })
      } catch (error) {
         console.log(error)
      }
   }
}

const testPic = {
   "picture": {
   "id": "3iB--pWZ1fQ",
   "created_at": "2020-04-01T10:44:44-04:00",
   "updated_at": "2020-04-07T01:03:56-04:00",
   "promoted_at": "2020-04-01T12:30:02-04:00",
   "width": 3744,
   "height": 5616,
   "color": "#FDFAF4",
   "description": "Fire Fighter climbs a ladder above a crowded street to reach a building engulfed in flames.",
   "alt_description": "red double decker bus on road near brown concrete building during daytime",
   "urls": {
   "raw": "https://images.unsplash.com/photo-1585752194125-7c2804163758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMyMH0",
   "full": "https://images.unsplash.com/photo-1585752194125-7c2804163758?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMyMH0",
   "regular": "https://images.unsplash.com/photo-1585752194125-7c2804163758?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMyMH0",
   "small": "https://images.unsplash.com/photo-1585752194125-7c2804163758?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMyMH0",
   "thumb": "https://images.unsplash.com/photo-1585752194125-7c2804163758?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMyMH0"
   },
   "links": {
   "self": "https://api.unsplash.com/photos/3iB--pWZ1fQ",
   "html": "https://unsplash.com/photos/3iB--pWZ1fQ",
   "download": "https://unsplash.com/photos/3iB--pWZ1fQ/download",
   "download_location": "https://api.unsplash.com/photos/3iB--pWZ1fQ/download"
   },
   "categories": [],
   "likes": 38,
   "liked_by_user": false,
   "current_user_collections": [],
   "user": {
   "id": "YxAXFh3SywE",
   "updated_at": "2020-04-14T10:31:43-04:00",
   "username": "reallygoodjames",
   "name": "James Fitzgerald",
   "first_name": "James",
   "last_name": "Fitzgerald",
   "twitter_username": "reallygoodjames",
   "portfolio_url": "https://www.instagram.com/reallygood.graphics/",
   "bio": "Really Good at all things media and messaging",
   "location": "Brooklyn",
   "links": {
   "self": "https://api.unsplash.com/users/reallygoodjames",
   "html": "https://unsplash.com/@reallygoodjames",
   "photos": "https://api.unsplash.com/users/reallygoodjames/photos",
   "likes": "https://api.unsplash.com/users/reallygoodjames/likes",
   "portfolio": "https://api.unsplash.com/users/reallygoodjames/portfolio",
   "following": "https://api.unsplash.com/users/reallygoodjames/following",
   "followers": "https://api.unsplash.com/users/reallygoodjames/followers"
   },
   "profile_image": {
   "small": "https://images.unsplash.com/profile-1559660369842-67b87fd1e8e4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
   "medium": "https://images.unsplash.com/profile-1559660369842-67b87fd1e8e4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
   "large": "https://images.unsplash.com/profile-1559660369842-67b87fd1e8e4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
   },
   "instagram_username": "reallygood.graphics",
   "total_collections": 5,
   "total_likes": 3,
   "total_photos": 121,
   "accepted_tos": true
   },
   "exif": {
   "make": "Canon",
   "model": "Canon EOS 5D Mark II",
   "exposure_time": "1/500",
   "aperture": "2.0",
   "focal_length": "50.0",
   "iso": 5000
   },
   "location": {
   "title": "New York, NY, USA",
   "name": "New York, NY, USA",
   "city": "New York",
   "country": "United States",
   "position": {
   "latitude": 40.712775,
   "longitude": -74.005973
   }
   },
   "views": 284086,
   "downloads": 488
   }
}