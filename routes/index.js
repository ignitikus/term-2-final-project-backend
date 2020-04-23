const express = require('express');
const router = express.Router();
const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Picture = require('./models/Picture')

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

/* GET home page. */
router.get('/info', function(req, res, next) {
  return res.json({message: 'Coming from backend'})
});

router.get('/randompic', async(req,res,next) => {
  try {
    // const randomPic = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.ACCESS_KEY}`)
    // return res.json({picture: {...randomPic.data}})
    return res.json({picture: {...testPic.picture}})
  } catch (error) {
    console.log(error)
  }
})

router.get('/gallery', async(req,res,next) => {
  try {
    const allPictures = await Picture.find({})
    return res.json(allPictures)
  } catch (error) {
    console.log(error)
  }
})

router.post('/savepicture', async(req,res,next) => {
  try {
    const newPic = new Picture()
    newPic.status = req.body.status
    newPic.description = req.body.description
    newPic.urls.full = req.body.urls.full
    newPic.urls.thumb = req.body.urls.thumb
    newPic.save().then(pic => res.json(pic))
    
  } catch (error) {
    console.log(error)
  }
})

router.post('/login', async(req,res,next) => {
  const user = await User.findOne({email: req.body.email})
  if(!user){
      res.json({message:'User not found'})
  }else{
    jwt.sign({user}, 'secretKey', (err, token) => {
      res.json({message:'Success', token, email: user.email, avatar: user.avatar})
    })
  }
})

router.post('/register', (req,res,next) => {
    User.findOne({email:req.body.email }).then(user=>{
        if(user) {
          res.json('already exists')
        }

        const newUser = new User

        newUser.avatar = 'https://www.w3schools.com/w3images/avatar2.png'
        newUser.email = req.body.email
        newUser.password = req.body.password

        newUser.save().then(user=>{
          // if(user) return req.login(user, (err) => {
              if(err){
                return res.json('couldn\'t save')
              }
              return console.log(user)
          })
        // }).catch(err=> next(err))
    }).catch(err=> next(err))
  },
)

router.put('/updatestatus', async(req,res,next) => {
  try {
    await Picture.findOneAndUpdate({_id: req.body.id}, {status: !req.body.status})
  } catch (error) {
    console.log(error)
  }
})

router.delete('/deletepicture/:id', async(req,res,next) => {
  try {
    await Picture.deleteOne({_id: req.params.id})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
