'use strict'

const request = require('supertest')
const chai = require('chai')
const Faker = require('faker')
const sinon = require('sinon')

const DogService = require('../modules/dog-service')
const app = require('../app')
const expect = chai.expect

const breeds = [
  'labrador',
  'malinois',
  'bulldog'
]

describe('routes/index', async () => {
  const sandbox = sinon.createSandbox()
  let imageObj
  before(async () => {
    sandbox.stub(DogService)
    DogService.getBreeds.returns(breeds)
  })
  beforeEach(() => {
    const image = Faker.internet.url()
    const name = Faker.name.firstName()
    imageObj = {
      image,
      name
    }
    DogService.getRandomImage.resetHistory()
    DogService.getRandomImage.resolves(imageObj)
  })
  after(() => {
    sandbox.restore()
  })

  describe('GET /', async () => {
    it('returns status code 200', async () => {
      const res = await request(app).get('/')
      expect(res.statusCode).to.equal(200)
    })
    it('calls the DogService.getBreeds', async () => {
      await request(app).get('/')
      expect(DogService.getBreeds.called).to.equal(true)
    })
  })
  describe('GET /getDog', async () => {
    it('returns status code 200', async () => {
      const res = await request(app).get('/getDog')
      expect(res.statusCode).to.equal(200)
    })
    it('calls the DogService.getRandomImage', async () => {
      await request(app).get('/getDog')
      expect(DogService.getRandomImage.called).to.equal(true)
    })
    it('returns an object with name and image properties', async () => {
      const res = await request(app).get('/getDog')
      expect(res.body.name).to.equal(imageObj.name)
      expect(res.body.image).to.equal(imageObj.image)
    })
  })
  describe('PUT /end', async () => {
    it('returns status code 204', async () => {
      const res = await request(app).put('/end')
      expect(res.statusCode).to.equal(204)
    })
  })
  describe('PUT /start', async () => {
    it('returns status code 204', async () => {
      const res = await request(app).put('/start')
      expect(res.statusCode).to.equal(204)
    })
  })
})
