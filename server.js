const express = require("express");
const session = require("express-session");
const nocache = require("nocache");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
require('dotenv').config();


const app = express();

// //Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(nocache());

//view engine
app.set("view engine","ejs");


//mongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("MongoDB connected"))
    .catch(err=>console.log(err));




// Admin session middleware
  app.use("/admin", session({
    name: "admin.sid",
    secret: "admin_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

// User session middleware
app.use("/", session({
    name: "user.sid",
    secret: "user_secret",
    resave: false,
    saveUninitialized: false,  
    cookie: { secure: false } // set secure: true in production with HTTPS
  }));
  
  


//Routes
app.use("/",userRouter);
app.use("/admin",adminRouter);




//start server
let port = process.env.port || 5000;
app.listen(port,()=>console.log(`Server running on port: http://localhost:${port}`));