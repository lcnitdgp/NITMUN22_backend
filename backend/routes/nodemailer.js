const router = require("express").Router();
const registrations = require("../models/Registrations");
const nodemailer = require("nodemailer");
const {google} = require("googleapis")

const CLIENT_ID = '457703136236-96a3rrf7kie1fksvvc84jm5chh1qu29c.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//046XTjnS5O8NACgYIARAAGAQSNwF-L9IrYJL4IcSmPTeXsE0HRineTriT_R5jjo_6N7UFyC-noJJOmOLtQE-fO-ey3wGiELP4tRk'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

// mailer

router.post("/allotmentmail/:id", async (req,res)=>{
    try{
        const participant = await registrations.findById(req.params.id)
        await registrations.findOneAndUpdate({_id:req.params.id},{
          
            
            $set:{Allotedmail: true,
                status: "pending"
            } 
           
        }).then(()=>{
           console.log(req.params.id)
        }).catch(err=>{console.log(err)})
        let accessToken = await oAuth2Client.getAccessToken()
        console.log(oAuth2Client)
        
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            type: 'OAuth2',
            user: 'subrolinaghosh@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
            },
            tls:{
                rejectUnauthorized:false
            }
          });
          console.log(transport)
        let info = await transport.sendMail({
            from: '"Mouli" <subrolinaghosh@gmail.com>', 
            to: participant.email, // list of receivers
            subject: "Hello ", 
            text: "Hello participants", 
            html: "<b>welcome to nitmun x</b>", 
          });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.redirect("/api/dashboard")
    } catch(err){
        res.status(500).json(err);
    }
});


router.post("/paymentmail/:id", async (req,res)=>{
    try{
        const participant = await registrations.findById(req.params.id)
        await registrations.findOneAndUpdate({_id:req.params.id},{
          
            
            $set:{paid: true,
                status: "done"
            } 
           
        }).then(()=>{
           console.log(req.params.id)
        }).catch(err=>{console.log(err)})
        let accessToken = await oAuth2Client.getAccessToken()
        console.log(oAuth2Client)
        
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            type: 'OAuth2',
            user: 'subrolinaghosh@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
            },
            tls:{
                rejectUnauthorized:false
            }
          });
          console.log(transport)
        let info = await transport.sendMail({
            from: '"Mouli" <subrolinaghosh@gmail.com>', 
            to: participant.email, // list of receivers
            subject: "Hello ", 
            text: "Hello participants", 
            html: "<b>welcome to nitmun x</b>", 
          });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.redirect("/api/dashboard")
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router