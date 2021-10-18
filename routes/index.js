const express = require('express')
const router = express.Router()
const DogService = require('../modules/dog-service')

const cookieOpts = {
  // maxAge: , // would expire after 0 minutes
  expires: 0, // session cookie
  httpOnly: true, // The cookie only accessible by the web server
  signed: true // Indicates if the cookie should be signed
}

let breeds = []
const getBreeds = async () => {
  if (!breeds || breeds.length === 0) breeds = Object.keys(await DogService.getBreeds() || {})
  return breeds
}

router.get('/', async (req, res, next) => {
  await getBreeds()
  res.clearCookie('imageObj')
  res.render('index')
})

router.get('/getDog', async (req, res, next) => {
  await getBreeds()
  let breedIdx = +(req.signedCookies.breedIdx || 0)
  let imageObj
  if (req.signedCookies.imageObj) {
    imageObj = JSON.parse(req.signedCookies.imageObj)
  } else {
    if (breedIdx >= breeds.length) breedIdx = 0
    const breed = breeds[breedIdx]
    imageObj = await DogService.getRandomImage(breed)
    res.cookie('breedIdx', breedIdx + 1, cookieOpts)
    res.cookie('last_imgObj', JSON.stringify(imageObj), cookieOpts)
  }
  res.send(imageObj)
})

router.put('/start', (req, res, next) => {
  res.clearCookie('imageObj')
  res.sendStatus(204)
})

router.put('/stop', (req, res, next) => {
  if (req.signedCookies.last_imgObj) {
    const imageObj = JSON.parse(req.signedCookies.last_imgObj)
    if (imageObj && imageObj.image && imageObj.name) {
      res.cookie('imageObj', JSON.stringify(imageObj), cookieOpts)
    }
  }
  res.sendStatus(204)
})

module.exports = router
