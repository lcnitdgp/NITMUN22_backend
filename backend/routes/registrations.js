const express = require("express").Router();
const registrations = require("../models/Registrations");
const payments = require("../models/Payment");
const router = require("./auth");

// Register
router.post("/register", async (req,res) => {
    try{

        const newRegistration = new registrations({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            institute: req.body.institute,
            preference1: req.body.preference1,
            preference2: req.body.preference2,
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
router.post("/update", async(req,res)=>{
        try{
             await registrations.findByIdAndUpdate(req.body.id,{
                $set: req.body,
            });
            res.status(200).json("Details Updated")
        } catch(err){
            return res.status(500).json(err)
        }
})


// dashboard
router.get("/dashboard", async(req,res)=>{
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

router.post("/payments", async (req,res) => {
    try{

        const newPayment = new payments({
            name: req.body.name,
            amount: req.body.amount,
            paidto: req.body.paidto
        });

        const payment = await newPayment.save();
        res.status(200).send("Updated")
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