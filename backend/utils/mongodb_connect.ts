import mongoose from 'mongoose'

const db = process.env.DB_NAME
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const host = process.env.DB_HOST

const connect = (): void => {
  mongoose.connect(`mongodb://${user}:${pass}@${host}/${db}`).then(() => {
    console.log('MongoDb Connected')
  }).catch(err => {
    console.log(err)
  })
}

export default connect
