const mongoose = require('mongoose')
const DataSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    foto: {
        type: String,
        required: true
    },

    foto2: {
        type: String,
        required: true
    },

    foto3: {
        type: String,
        required: true
    },

    foto4: {
        type: String,
        required: true
    },

    foto5: {
        type: String,
        required: true
    },

    descricaoLonga: {
        type: String,
        required: true
    },

    descricaoCurta: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    }
);
const DataModel = mongoose.model("DataModel", DataSchema)
module.exports = DataModel