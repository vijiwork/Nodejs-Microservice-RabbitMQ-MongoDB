const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.CONNECTION_STRING;

async function connect() {

const client = new MongoClient(uri);

let conn;
try {
  conn = await client.connect();
  console.log("Connected to MongoDB");
} catch(e) {
  console.error(e);
}

}

module.exports=connect();