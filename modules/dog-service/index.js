const superagent = require('superagent')

const BASE_URL = 'https://dog.ceo/api'
const BASE_IMG_URL = 'https://images.dog.ceo/breeds/'

class DogService {
  static async getBreeds () {
    const url = `${BASE_URL}/breeds/list/all`
    const res = await superagent.get(url)
    if (res.ok) return res.body.message
    return []
  }

  static async getRandomImage (breed = null) {
    let url = BASE_URL
    url = breed
      ? `${url}/breed/${breed}/images/random`
      : `${url}/breeds/image/random`
    const res = await superagent.get(url)
    if (res.ok) {
      return {
        image: res.body.message,
        name: breed || res.body.message
          .replace(BASE_IMG_URL, '')
          .replace(/\/[^/]+\.[a-z]+$/gi, '')
          .replace(/-/gi, ' ')
      }
    }
    return null
  }
}

module.exports = DogService
