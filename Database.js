const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')


const connectToDb = async() =>{
    try {
       await mongoose.connect(process.env.DB_MONGO)
       console.log('entrou no database')
    } catch (error) {
        console.log('não entrou no database')
    }
}
module.exports = connectToDb