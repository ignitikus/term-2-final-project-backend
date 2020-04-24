const express = require('express');
const router = express.Router();


const {
  getRandomPic,
  getGallery,
  savePicture,
  login,
  register,
  updatePicStatus,
  deletePicture

} = require('./controllers/indexController')

router.get('/randompic', getRandomPic)
router.get('/gallery/:token', getGallery)

router.post('/savepicture', savePicture)
router.post('/login', login)
router.post('/register', register)

router.put('/updatestatus', updatePicStatus)

router.delete('/deletepicture/:id', deletePicture)

module.exports = router;
