global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
const mongoose = require('mongoose')

const rentalService = require('../../services/rental.service')

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (err) {
    console.error(`An error has occurred. ${err}`)
  }
});

describe('General tests for rental service methods', () => {
  test('should return one records by city using async-await', async () => {
    const result = await rentalService.getRentalsByCity('TOWSON')
    expect(result.length).toBeGreaterThan(1)
  })

  test('should return records by street using async-await', async () => {
    const result = await rentalService.getRentalByStreetName('TAPU')
    expect(result.length).toBeGreaterThan(1)
  })

  test('should return one record by id using async-await', async () => {
    const result = await rentalService.getRental('RHR-2014-02617')
    expect(result).toBeTruthy()
  })

  test('should update expiration date', async () => {
    const result = await rentalService.updateRental('RHR-2014-02617', '2024-02-18T00:00:00.000')
    expect(result).toBe(1)
  })

  test('should return records by street name using async-await', async () => {
    const result = await rentalService.getRentalByStreetName('TAPU')
    expect(result.length).toBeGreaterThan(1)
  })

  test('should return multiple records of rental count by city using async-await', async () => {
    const result = await rentalService.getRentalCountByCity()
    expect(result.length).toBeGreaterThan(1)
  })

  test('should return multiple records of rental count by record status using async-await', async () => {
    const result = await rentalService.getRentalCountByRecordStatus()
    expect(result.length).toBeGreaterThan(1)
  })

  test('should return multiple records of rental count by expiration date using async-await', async () => {
    const result = await rentalService.getRentalCountByExpirationDate()
    expect(result.length).toBeGreaterThan(1)
  })
})
