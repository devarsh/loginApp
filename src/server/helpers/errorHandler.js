class AppError extends Error {
  constructor(settings = {}, implementationContext) {
    super(settings)
    this.name = 'AppError'
    this.type =  (settings.type || 'Application')
    this.message = (settings.message || 'An error occured')
    this.detail = (settings.detail || '')
    this.extendedInfo = (settings.extendedInfo || '')
    this.errorCode = (settings.errorCode || '')
    if(this.captureStackTrace !== 'function') {
      Error.captureStackTrace(this,(implementationContext || AppError))
    }
    this.isAppError = true
  }
}

const createAppError = (settings) => {
    // NOTE: We are overriding the "implementationContext" so that the createAppError()
    // function is not part of the resulting stacktrace.
    return (new AppError( settings, createAppError ))
}

export default createAppError
//ref :
//http://www.bennadel.com/blog/2828-creating-custom-error-objects-in-node-js-with-error-capturestacktrace.htm
