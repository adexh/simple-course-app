const mongoose = require('mongoose');

const db = process.env.DB_NAME;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const host = 'cluster0.hhinerl.mongodb.net'

const connect = () => {
  mongoose.connect(`mongodb+srv://${user}:${pass}@${host}/${db}`).then(()=>{
    console.log("MongoDb Connected");
  });
}

module.exports = connect;