const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')


const connectToDb = async() =>{
    try {
       await mongoose.connect("mongodb+srv://doacoesDatabase:doacoes12@cluster0.4njrm4g.mongodb.net/")
       console.log('entrou no database')
    } catch (error) {
        console.log('não entrou no database')
    }
}
module.exports = connectToDb