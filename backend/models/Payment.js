const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    paidto:{
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model("payment", paymentSchema)