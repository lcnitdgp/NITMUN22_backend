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
    email:{
        type: String,
        required: true,
        max: 50,
    },
    phoneNumber:{
        type: Number,
        required: true,
        min: 10,
    },
    institute:{
        type: String, 
        required: true,
    },
    committeeAlloted: {
        type: String,
        default: "",
       },
    portfolioAlloted:{
        type: String,
        default: "",  
       },
    Date:{
        type: String,
        default: ""
       },
       preference1:{
        type: String,
        required: true,
    },
    preference2:{
        type: String,
        required: true,
    },
    preference3:{
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model("payment", paymentSchema)