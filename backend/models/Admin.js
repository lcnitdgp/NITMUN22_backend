const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
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

adminSchema.statics.login = async function(username,password){
    const user = await this.findOne({username});
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user;
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect Details')
}

module.exports = mongoose.model("Admin", adminSchema)