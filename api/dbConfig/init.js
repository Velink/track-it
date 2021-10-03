require('dotenv').config()
const { MongoClient } = require('mongodb')

// will make variables environment variables later
const dbName = 'habitsaddicts'
//replace 'mussie' with your name (lowercase)
//password is habbi tsaddicts
const connectionUrl = process.env.CONNECTION_URL

const init = async () => {
  let client = await MongoClient.connect(connectionUrl)
  console.log('connected to database!', dbName)
  return client.db(dbName)
} // this should establish connection to cloud database 


module.exports = { init };