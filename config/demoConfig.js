let protocol = 'http'
let adr = 'localhost'
let port = 3000
let apiVersion = 'v1'
let apiEndPointPath = 'api'
module.exports = {
  adr,
  port,
  protocol,
  apiVersion,
  apiEndPointPath,
  connectionString: '[mongo_db connection Stringr]',
  jwtEncrKey: 'demo',
  serverEndPoint: `${protocol}://${adr}:${port}/${apiVersion}/${apiEndPointPath}/`,
  mailgun: {
    key: '[mailgun-key]',
    domain: '[mailgun-domain]'
  }
}

