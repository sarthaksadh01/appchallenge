var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose", {}),
    passport        = require("passport"),
    User            = require("./models/user"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    flash           = require('connect-flash')

 mongoose.connect("mongodb://localhost/app_challenge", { useNewUrlParser: true });
 app.use(bodyParser.urlencoded({extended: true}));
 app.set("view engine", "ejs");
 app.use(express.static(__dirname + "/public"));
 app.use(methodOverride("_method"));
 app.use(flash())

 app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error")
    res.locals.success=req.flash("success")
    next();
});

app.get("/",function(req,res){
    res.render("index");
})
// show register form
app.get("/register", function(req, res) {
    res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res) {
    // console.log(req.body.teamName);
    
    var newUser = new User({
        mainEmail:req.body.mainEmail,
        password:req.body.password,
        teamSize:req.body.teamSize,
        teamName:req.body.teamName,
        username1:req.body.username1,
        email1:req.body.email1,
        contact1:req.body.contact1,
        username2:req.body.username2,
        email2:req.body.email2,
        contact2:req.body.contact2
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message)
            return res.render("register");
        }
        //
        //
        passport.authenticate("local")(req, res, function() {
            req.flash("success","Welcome "+user.teamName)
            res.redirect("/");
        });
    });
});
// show login form
app.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res) {
});

// logout route
app.get("/logout", function(req, res) {
    req.logout();
    req.flash("success","Logged you out!")
    res.redirect("/");
});




app.listen(process.env.PORT||4454, process.env.IP, function(){
   console.log("Server Has Started");
});
    