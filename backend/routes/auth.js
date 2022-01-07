const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
//Handle Tokens
const maxAge = 3 * 24 * 3600;
const createtokens = (id) => {
    return jwt.sign({ id }, 'secretlogin', {
        expiresIn: maxAge
    })
}

// SIGNUP
router.post("/signup", async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newAdmin = new Admin({
            username: req.body.username,
            password: hashedPassword,
        });
        const admin = await newAdmin.save();
        console.log(admin);
        const token = createtokens(admin._id)
        res.cookie('nitmun', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).send(admin)
    } catch (err) {
        res.status(500).json(err);
    }

})

// LOGIN

router.post("/", async (req, res) => {
    const {username,password} = req.body
    try {
        const user = await Admin.login(username,password)
        const token = createtokens(user._id)
    
            res.cookie('nitmun',token,{httpOnly: true, maxAge: maxAge * 1000})
            res.status(201).render('home')
        
    } catch (err) {
        console.log(err);
        res.status(400).json({error: err})
    }
});
module.exports = router