const wrapAsync = (generator) => () => {
  const obj = generator.apply(this,arguments)

  const handle = ({ done, value }) => {
    if(done) {
      return Promise.resolve(value)
    }
    return Promise.resolve(value)
    .then((res) => {
      return handle(obj.next(res))
    })
    .catch((err) => {
      return handle(obj.throw(err))
    })
  }

  try {
    handle(obj.next())
  } catch(ex) {
    return Promise.reject(ex)
  }
}




