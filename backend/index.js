const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const router = express.Router();
const authRoute = require("./routes/auth");
const registrationsRoute = require("./routes/registrations");
const mailer = require("./routes/nodemailer");
const fs = require('fs');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
var cors = require('cors')

app.use(cookieParser())
dotenv.config();

mongoose.connect(process.env.dbURL,
    { useNewUrlParser: true, useUnifiedTopology:true},
    ()=>{
        console.log("Connected to DB");
    }
);


// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(morgan("common"));
app.use(express.static(__dirname + '/public'));
app.use("/public", express.static('public'));
app.use(express.urlencoded({extended: false}));


// app.use("/api/auth", authRoute);
// app.use("/api", registrationsRoute);
// app.use("/api", mailer);
app.use("/login", authRoute);
app.use("/api", registrationsRoute);
app.use("/api", mailer);

app.get('/login', function(req, res) {
    res.render('admin');
});

app.post('/api/modal', async(req,res) => {
    const show_modal = true;
    res.render('root',{show_modal})
})



app.listen(5400,()=>{
    console.log("Server Running");
})
