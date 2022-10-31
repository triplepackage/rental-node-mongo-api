global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
const request = require('supertest')
const dotenv = require('dotenv')
const app = require('../../index')

dotenv.config()

let token

beforeAll(async (done) => {
  await request(app)
    .post('/user/authenticate')
    .send({
      username: process.env.MONGO_TEST_USER,
      password: process.env.MONGO_TEST_PASSWORD,
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

describe('GET rental endpoints with valid token', () => {
  it('respond with json containing a list of rentals by city', async () => {
    const result = await request(app)
      .get('/rental/city/NOTTINGHAM')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
  })

  it('respond with json containing a list of rentals by street name', async () => {
    const result = await request(app)
      .get('/rental/street/TAPU')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
  })

  it('respond with json containing a list of rentals by rental id', async () => {
    const result = await request(app)
      .get('/rental/RHR-2014-02617')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
  })

  it('respond with json containing a list of rental counts grouped by city', async () => {
    const result = await request(app)
      .get('/rental/groupedby/city')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
  })

  it('respond with json containing a list of rental counts grouped by expiration date', async () => {
    const result = await request(app)
      .get('/rental/groupedby/expirationdate')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
  })

  it('respond with json containing a list of rental counts grouped by rental status', async () => {
    const result = await request(app)
      .get('/rental/groupedby/recordstatus')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
  })
})

describe('GET rental endpoints with invalid token', () => {
  test('respond with json containing a list of rentals by city', async () => {
    const result = await request(app)
      .get('/rental/city/NOTTINGHAM')
    expect(result.statusCode).toEqual(401)
  })

  test('respond with json containing a list of rentals by street name', async () => {
    const result = await request(app)
      .get('/rental/street/TAPU')
    expect(result.statusCode).toEqual(401)
  })

  it('respond with json containing a list of rentals by rental id', async () => {
    const result = await request(app)
      .get('/rental/140')
    expect(result.statusCode).toEqual(401)
  })

  it('respond with json containing a list of rental counts grouped by city', async () => {
    const result = await request(app)
      .get('/rental/groupedby/city')
    expect(result.statusCode).toEqual(401)
  })

  it('respond with json containing a list of rental counts grouped by expiration date', async () => {
    const result = await request(app)
      .get('/rental/groupedby/expirationdate')
    expect(result.statusCode).toEqual(401)
  })

  it('respond with json containing a list of rental counts grouped by rental status', async () => {
    const result = await request(app)
      .get('/rental/groupedby/recordstatus')
    expect(result.statusCode).toEqual(401)
  })
})

describe('PUT rental endpoints', () => {
  it('respond with json containing a list of rentals by rental id', async () => {
    const result = await request(app)
      .put('/rental')
      .send({
        recordId: 'RHR-2014-02617',
        expirationDate: '2024-02-18',
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
  })

  it('respond with an error message for invalid date format', async () => {
    const result = await request(app)
      .put('/rental')
      .send({
        recordId: 'RHR-2014-02617',
        expirationDate: '2zzzzzzzz',
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(400)
    expect(result.text).toEqual('Invalid expiration date')
  })
})
