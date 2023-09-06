const mongoose = require('mongoose');

const db = process.env.DB_NAME;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const host = process.env.DB_HOST;

const connect = () => {
  mongoose.connect(`mongodb://${user}:${pass}@${host}/${db}`).then(()=>{
    console.log("MongoDb Connected");
  });
}

module.exports = connect;