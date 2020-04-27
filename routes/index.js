const express = require('express');
const router = express.Router();


const {
  getRandomPic,
  getGallery,
  savePicture,
  login,
  register,
  updatePicStatus,
  deletePicture,
  savePhoto

} = require('./controllers/indexController')

router.get('/randompic', getRandomPic)
router.get('/gallery/:token', getGallery)

router.post('/savepicture', savePicture)
router.post('/savephoto', savePhoto)
router.post('/login', login)
router.post('/register', register)

router.put('/updatestatus', updatePicStatus)

router.delete('/deletepicture/:token/:id', deletePicture)

module.exports = router;
