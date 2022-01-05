const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

// SIGNUP
router.post("/signup", async (req,res) => {
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const newAdmin = new Admin({
            username: req.body.username,
            password: hashedPassword,
        });


        const admin = await newAdmin.save();
        res.status(200).send(admin)
    } catch(err){
        res.status(500).json(err);
    }
    
})

// LOGIN

router.post("/", async (req,res)=>{
    try{
            const admin = await Admin.findOne({
            username:req.body.username
        });
        !admin && res.status(404).json("Sorry invalid Credentials");
        const validPassword = await bcrypt.compare(req.body.password , admin.password)
        !validPassword && res.status(400).json("Sorry invalid Credentials")

        // res.status(200).json("User logged in Succesfully")
        res.render('home');
    } catch(err){
        // res.status(500).json(err);
    }
});

module.exports = router