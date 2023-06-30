const config = {
  serviceXUrl: 'google.com',
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  privateKey: process.env.PRIVATE_KEY,
  session : process.env.SECRET_SESSION
}

export default config;