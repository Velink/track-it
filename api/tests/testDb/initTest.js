require('dotenv').config()
const { MongoClient } = require('mongodb')

const connectionUrl = process.env.CONNECTION_URL_TEST

const initTest = async () => {
  console.log("starting init")

  let client = await MongoClient.connect(connectionUrl)


  return client
}
module.exports = { initTest };
