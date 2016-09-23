import AppError from 'helpers/errorHandler'

const assignProps = (instance, newObj) => {
  const keys = Object.keys(newObj)
  keys.forEach(key => {
    instance[key] = newObj[key]
  })
}

export const findOne = (Model, fieldObj, comment, populate) => {
  if(Array.isArray(comment)) {
    populate = comment
    comment = undefined
  }
  return new Promise((resolve, reject) => {
    let instance = Model.findOne(fieldObj)
    if(comment) {
      instance = instance.comment(comment)
    }
    if(populate) {
      instance = instance.populate(...populate)
    }
    let promise = instance.exec()
    promise.then(data => {
      if(data) return resolve(data)
      return reject(AppError({message: 'No data found'}))
    })
    .catch(err => reject(err))
  })
}

export const save = (Model, fieldObj) => {
  let instance = new Model(fieldObj)
  return new Promise((resolve, reject) => {
    instance.save(function (err, user) {
      if (err) return reject(err)
      return resolve(user.toObject())
    })
  })
}

export const updateOne = (instance, fieldObj) => {
  assignProps(instance,fieldObj)
  return new Promise((resolve, reject) => {
    instance.save(function (err, user) {
      if (err) return reject(err)
      return resolve(user.toObject())
    })
  })
}
