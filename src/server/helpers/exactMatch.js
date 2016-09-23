/* eslint-disable no-else-return */
const testEqual = (caseSensitive = true) => (name) => {
  if (caseSensitive) {
    return new RegExp(`^${name}$`)
  } else {
    return new RegExp(`^${name}$`,'i')
  }
}

export default testEqual
