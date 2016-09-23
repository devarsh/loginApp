import expect from 'expect'
import mongoose from 'mongoose'
import User from 'models/users'
import Token from 'models/token'


describe('Token doa operations', () => {
  it('should generate a token', (next) => {
    User._findOne({ email: 'devarshmshah@gmail.com' })
    .then(user => {
      Token._save({ token: 'token1',
        expiresAt: 123456,
        issuedFor: 'REST',
        user: user._id })
      .then(token => {
        expect(token).toInclude({
          token: 'token1',
          expiresAt: 123456,
          usedOnce: false,
          issuedFor: 'REST',
          user: user._id
        })
        next()
      })
    })
  })
  it('should get a token belonging to a particular user', (next) => {
    Token._findOne({ token: 'token1' })
    .then(token => {
      expect(token).toInclude({
        token: 'token1',
        expiresAt: 123456,
        usedOnce: false,
        issuedFor: 'REST'
      })
      next()
    })
  })
  it('should get a token belonging to a particular user with user data also populated', (next) => {
    Token._findOne({ token: 'token1' },['user','-password'])
    .then(token => {
      expect(token).toInclude({
        token: 'token1',
        expiresAt: 123456,
        usedOnce: false,
        issuedFor: 'REST',
        user: {
          email: 'devarshmshah@gmail.com',
          username: 'deva',
          phone: '9925204913',
          emailVerified: true
        }
      })
      next()
    })
  })
  it('should throw no data found expection when invalid token passes', (next) => {
    Token._findOne({ token: 'token2' })
    .catch(err => {
      expect(() => { throw err }).toThrow(/No data found/)
      next()
    })
  })
  it('should update a token', (next) => {
    Token._findOne({ token: 'token1' },'No:Lean')
    .then(token => {
      token._updateOne({ usedOnce: true, expiresAt: 123 })
      .then(updatedToken => {
        expect(token).toInclude({
          token: 'token1',
          expiresAt: 123,
          usedOnce: true,
          issuedFor: 'REST'
        })
        next()
      })
    })
  })
})

