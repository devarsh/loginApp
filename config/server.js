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
  connectionString: 'mongodb://localhost:27017/userdb',
  jwtEncrKey: 'demo',
  serverEndPoint: `${protocol}://${adr}:${port}/${apiVersion}/${apiEndPointPath}/`,
  mailgun: {
    key: 'key-c832dffabd802d5d278a9e8f9e293251',
    domain: 'sandbox5c3557c0802849a08b8a8cafdfcf2c3f.mailgun.org'
  }
}



