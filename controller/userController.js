const bcrypt = require("bcrypt");
const User = require("../model/User.js");
// const {authMiddleware} = require("../middleware/authmiddleware.js")

//GET signup
function getSignup(req,res){
    // if (req.session.user) {
    //     return res.redirect('/home');
    // }
    res.render("signup");
}

//POST signup
 async function postSignup (req,res){
    const {username,email,password} = req.body;
    try{
        const userData = await User.find({email});
        if(userData){
            return res.render("signup",{error:"Email already in use"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            username,
            email,
            password:hashedPassword
        });
        await user.save();
       res.redirect('/login?msg=Signup%20successful');


    } catch(error){
        console.error("Signup error:", error);
        res.render("signup", { error: "Something went wrong. Please try again." });
    }
}

//GET login
function getLogin (req,res){
    if (req.session.user) {
        return res.redirect('/home');
        // res.cookie('theme', 'dark');
    }
    res.render('login', { 
        message: req.query.msg || null,
        error:null
    });
}



//POST login
async function postLogin (req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    res.redirect("/home");

  } else {
    res.render("login", { error: "Invalid email or password" });
  }
}

//GET home
async function home(req, res) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  try {
    const freshUser = await User.findById(req.session.user.id);
    if (!freshUser) {
      req.session.destroy();
      return res.redirect("/login");
    }

    // Optionally update session
    req.session.user.username = freshUser.username;
    req.session.user.email = freshUser.email;

    res.render("home", { user: freshUser });  // send fresh user data to view
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.status(500).send("Internal Server Error");
  }
};

//GET Logout User
function logoutUser (req,res){
    req.session.destroy((err)=>{
        if(err){
            return res.redirect("/home");
        }
        res.clearCookie("user.sid");
        res.redirect("/");
    })
}



module.exports = {
    getSignup,
    postSignup,
    getLogin,
    postLogin,
    home,
    logoutUser
};