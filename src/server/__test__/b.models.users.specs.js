import expect from 'expect'
import mongoose from 'mongoose'
import User from 'models/users'
import brcypt from 'bcrypt-nodejs'

describe('Users doa operations', () => {

  before((done) => {
    mongoose.connection.db.dropDatabase()
    .then(data => {
      console.log('db dropped for fresh test cases')
      done()
    })
    .catch(err => {
      throw err
    })
  })

  it('should add new user to the database', (next) => {
    User._save({
      email: 'devarshmshah@gmail.com',
      password: 'abc123',
      username: 'devarsh',
      phone: '9925204916'
    })
    .then(user => {
      expect(user).toInclude({
      email: 'devarshmshah@gmail.com',
      username: 'devarsh',
      phone: '9925204916',
      emailVerified: false
      })
      next()
    })
  })
  it('should throw an error if a duplicate use is added', (next) => {
    User._save({
      email: 'devarshmshah@gmail.com',
      password: 'abc123',
      username: 'devarsh',
      phone: '9925204916'
    })
    .catch(err => {
      expect(() => { throw err }).toThrow()
      next()
    })
  })
  it('should throw an error if required field is not entered', (next) => {
    User._save({
      phone:'9925204916'
    })
    .catch(err => {
      expect(() => { throw err }).toThrow()
      next()
    })
  })
  it('should get a record for given query', (next) => {
    User._findOne({ email: 'devarshmshah@gmail.com' })
    .then(user => {
      expect(user).toInclude({
      email: 'devarshmshah@gmail.com',
      username: 'devarsh',
      phone: '9925204916',
      emailVerified: false
      })
      next()
    })
    .catch(err => console.log(err))
  })
  it('should throw no data found exepection if no rows retrived for the given query', (next) => {
    User._findOne({ email: 'devarshsx' })
    .catch(err => {
      expect(()=> { throw err }).toThrow(/No data found/)
      next()
    })
  })
  it('should update the fields for a given record',(next) => {
    User._findOne({ email: 'devarshmshah@gmail.com' },'No:Lean')
    .then(user => {
      user._updateOne({
        username: 'deva',
        phone: '9925204913',
        emailVerified: true
      })
      .then(updatedUser => {
        expect(updatedUser).toInclude({
          email: 'devarshmshah@gmail.com',
          username: 'deva',
          phone: '9925204913',
          emailVerified: true
        })
        next()
      })
    })
  })
  it('should return all the fields expect password', (next) => {
    User._findOne({ email: 'devarshmshah@gmail.com' })
    .then(user => {
      expect(user).toExcludeKey('password')
      next()
    })
  })
  it('should encrypt the password passed in plaintext', (next) => {
    User._findOne({ email: 'devarshmshah@gmail.com' },'Yes:Pwd')
    .then(user => {
      expect({ password: user.password }).toNotMatch({
        password: /^abc123$/
      })
      next()
    })
  })
})
