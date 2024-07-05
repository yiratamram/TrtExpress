// getting-started.js
const mongoose = require('mongoose');
const {config} = require ('../config/secret')
main().catch(err => console.log(err));

async function main() {
  // mongoose.set('strictQuery', false)
   await mongoose.connect(`mongodb+srv://${config.userDB}:${config.passDB}@cluster0.snv6prn.mongodb.net/expresstryDB`);
 //await mongoose.connect('mongodb://127.0.0.1:27017/expresstryDB');
  console.log("mongo connect")
}
// exports.default = mongoose;