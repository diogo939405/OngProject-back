const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')


let dbConnection

// module.exports = {
//     connectToDb: (cb) => {
//         MongoClient.connect("mongodb+srv://doacoesDatabase:doacoes12@cluster0.4njrm4g.mongodb.net/")
//             .then((client) => {
//                 dbConnection = client.db()
//                 console.log('conectou ao banco')
//                 return cb()
//             })
//             .catch((err) => {
//                 console.log('error no database.js')
//                 return cb(err)
//             })
//     },
//     getDb: () => dbConnection
// }

const connectToDb = async() =>{
    try {
       await mongoose.connect("mongodb+srv://doacoesDatabase:doacoes12@cluster0.4njrm4g.mongodb.net/")
       console.log('entrou no database')
    } catch (error) {
        console.log('não entrou no database')
    }
}
module.exports = connectToDb