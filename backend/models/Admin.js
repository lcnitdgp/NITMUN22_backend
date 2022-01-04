const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
}, {timestamps: true})

module.exports = mongoose.model("Admin", adminSchema)