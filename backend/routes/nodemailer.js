const router = require("express").Router();
const registrations = require("../models/Registrations");
const nodemailer = require("nodemailer");
const {google} = require("googleapis")

const CLIENT_ID = '460493599138-nqmt3ppr4nkdnigv73318k5fq1uic8f9.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04X8DHZRTTO5aCgYIARAAGAQSNwF-L9IrGgSb9YrUcP7267syoBtIcda9j6rLLvqLuMkSS0daYorotVGa5oxuvuahO-HSdtFJQxo'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

// mailer

router.post("/allotmentmail/:id", async (req,res)=>{
    try{
        const participant = await registrations.findById(req.params.id)
        await registrations.findOneAndUpdate({_id:req.params.id},{
          
            
            $set:{Allotedmail: true,
                status: "PAYMENT PENDING"
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
            user: 'verve.nitmun@gmail.com',
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
          let p =0;
          if(participant.institute == "NIT Durgapur"){
               p = 100;
          }
          else  p = 250;
        let info = await transport.sendMail({
            from: '"NITMUN X" <verve.nitmun@gmail.com>', 
            to: participant.email, // list of receivers
            subject: "Registration confirmation", 
            text: ``, 
            html: `Greetings <b>${participant.name}</b>,<br/><br/>Following your registration in <b>NITMUN X</b>, you are requested to submit a registration fee of <b>Rs ${p}</b>.<br/>You may pay using UPI to the following people (UPI IDs provided below) :<br/><br/><b>Rohan Rao</b> - rohanrao.dec11@okhdfcbank (+91 83370 74141)<br/><b>Aditya Mitra</b> - adityamitra1911@okicici (+91 93310 55168)<br/><br/>Please mention NITMUN X- ( your name ) - ( institution ) while sending it. <br/>Let us know when and to whom you have made the payment, via mail. Kindly <b>attach a screenshot</b> of the payment record to the email.<br/><br/>Regards,<br/>Rohan Rao,<br/>Under Secretary General,<br/>NITMUN X.<br/>Contact number - +91 83370 74141`, 
            
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
          
            
            $set:{
                paid:true,
                status: "RECEIVED PAYMENT"
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
            user: 'verve.nitmun@gmail.com',
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
            from: '"NITMUN X" <verve.nitmun@gmail.com>', 
            to: participant.email, // list of receivers
            subject: "Payment Confirmation ", 
            text: "",
            html: `Dear <b>${participant.name}</b>,<br/><br/>Your payment has been received. The payment confirmation letter has been attached to this mail.<br/> <br/>Regards,<br/>Aditya Mitra,<br/>Deputy Director General,<br/>NITMUN X.<br/>Contact - 9331055168.`, 
            attachments: [{
                filename: 'Payment confirmation.pdf',
                path: __dirname + "/../attachment/Payment confirmation.pdf",
                contentType: 'application/pdf'
              }],
          });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.redirect("/api/dashboard")
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router