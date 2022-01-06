const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RegistrationSchema = new Schema({
   name:{
       type: String,
       required: true,
   },
   email:{
       type: String,
       required: true,
       max: 50,
       unique: true
   },
   phoneNumber:{
       type: Number,
       required: true,
       min: 10,
       unique: true,
   },
   institute:{
       type: String, 
       required: true,
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
   experience:{
       type: String,
       required: true,
       max: 80
   },
   committeeAlloted: {
    type: String,
    default: "",
   },
   portfolioAlloted:{
    type: String,
    default: "",  
   },
   Allotedmail:{
    type: Boolean,
    default:false
   },
   paid:{
       type: Boolean,
       default:false
   },
},{timestamps: true})

module.exports = mongoose.model("registrations",RegistrationSchema)