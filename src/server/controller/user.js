/* eslint-disable */
import User from 'models/users'

export const postUsers = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
/* eslint-disable consistent-return */
  user.save((err) => {
    if (err) return res.send(err)
    res.json({ message: 'User successfully added' })
  })
}
/* eslint-disable no-unused-vars */
export const getUsers = (req, res) => {
  res.send(req.user)
}
