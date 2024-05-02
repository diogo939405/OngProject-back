const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({

    id: {
        type: String,

    },
    cardId: {
        type: String,

    },
    valor: {
        type: Number,

    }
})
const paymentModel = mongoose.model("paymentModel", paymentSchema)
module.exports = paymentModel