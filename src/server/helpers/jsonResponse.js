export const successMsg = (data) => {
  status: 'success',
  data
}

export const failMsg = (data) => {
  status: 'fail',
  data
}

export const errorMsg = (message) => {
  status: 'error',
  message
}

