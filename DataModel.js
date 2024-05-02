const mongoose = require('mongoose')
const DataSchema = new mongoose.Schema({

    id: {
        type: Number,
        required : true
    },
    Nome: {
        type: String,
        required : true
    },
    descriçãoCurta: {
        type: String,
        required : true
    },
    descriçãoLonga: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    Pais: {
        type: String,
        required : true
    },
    city: {
        type: String,
        required : true
    }

},
    {
        timestamps: true
    }
);
const DataModel = mongoose.model("DataModel", DataSchema)
module.exports = DataModel