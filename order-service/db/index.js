const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.CONNECTION_STRING;

mongoose.set('strictQuery', false);
 async function connect() {

mongoose.connect(uri).then(() => {
  console.log(`successfully connected`);
}).catch((e) => {
  console.log(`not connected`);
}); 
 }

module.exports=connect();