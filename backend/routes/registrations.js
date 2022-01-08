const express = require("express").Router();
const registrations = require("../models/Registrations");
const payments = require("../models/Payment");
const router = require("./auth");
const bodyParser = require("body-parser");
const {reqauth, checkuser} = require('../middleware/authpass')
router.use(bodyParser.urlencoded({extended:false}));
// Register
router.post("/register", async (req,res) => {
    try{

        const newRegistration = new registrations({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            institute: req.body.institute,
            committee1: req.body.committee1,
            preference1: req.body.preference1,
            committee2: req.body.committee2,
            preference2: req.body.preference2,
            committee3: req.body.committee3,
            preference3: req.body.preference3,
            experience: req.body.experience,
        });

        const registration = await newRegistration.save();
        res.status(200).send(registration)
    } catch(err){
        res.status(500).json(err);
    }
    
})

// update details
router.post("/update/:id", async(req,res)=>{
        try{
             await registrations.findOneAndUpdate({_id:req.params.id},{
              
                
                $set:{portfolioAlloted: req.body.portfolioAlloted} 
               
            }).then(()=>{
                
                res.redirect("/api/dashboard")
            }).catch(err=>{console.log(err)})
            
        } catch(err){
            return res.status(500).json(err)
        }
})

//update committee

router.post("/updatecommittee/:id", async(req,res)=>{
    try{
         await registrations.findOneAndUpdate({_id:req.params.id},{
          
            
            $set:{committeeAlloted: req.body.committeeAlloted} 
           
        }).then(()=>{
            console.log(req.body.committeeAlloted)
           console.log("updated")
           console.log(req.params.id)
           res.redirect("/api/dashboard")
        }).catch(err=>{console.log(err)})
        
    } catch(err){
        return res.status(500).json(err)
    }
})

//update payment status
router.post("/updatepaid/:id", async(req,res)=>{
    try{
         await registrations.findOneAndUpdate({_id:req.params.id},{
          
            
            $set:{paid: true} 
           
        }).then(()=>{
            console.log(req.body.paid)
           console.log("updated")
           console.log(req.params.id)
           res.redirect("/api/dashboard")
        }).catch(err=>{console.log(err)})
        
    } catch(err){
        return res.status(500).json(err)
    }
})


// dashboard
router.get("/dashboard", reqauth, checkuser ,async(req,res)=>{
    const committee = req.query.committee;
    try{    
             const participants = committee ? 
             await registrations.find({
             allotment: committee,
             })
             :
             await registrations.find()
         let committeeList = [];
         participants.map(participant=>{
             committeeList.push(participant)
         })
        //  res.status(200).json(committeeList)
        if(committee)
         res.render('dashboard',{title: 'root',committeeList:committeeList ,committee:committee});
        else
        res.render('root',{title: 'dashboard',committeeList:committeeList });
    }catch(err){
        res.status(500).json(err)
    }
})

router.post("/payments/:id", async (req,res) => {
    try{
        
        await registrations.findOneAndUpdate({_id:req.params.id},{
          
            
            $set:{Paymentupdate: true} 
           
        }).then(()=>{
           console.log(req.params.id)
        }).catch(err=>{console.log(err)})
        
        const newPayment = new payments({
            name: req.body.name,
            amount: req.body.amount,
            paidto: req.body.paidto
        });
        const payment = await newPayment.save();

        

        res.redirect("/api/dashboard")
    } catch(err){
        res.status(500).json(err);
    }
    
})

router.get("/payments", async(req,res)=>{
    try{    
         const paymentDetails = await payments.find()
         let paymentList = [];
         paymentDetails.map(payment=>{
             paymentList.push(payment)
         })
        //  res.status(200).json(paymentList)
        res.render('payment',{title: 'payment',paymentList:paymentList });
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router