var mongoose=require('mongoose'),
passportLocalMongoose=require('passport-local-mongoose')

var UserSchema=new mongoose.Schema({
    // username:String,
    // password:String,
    // email:String,
    // otp:Number
    mainEmail:String,
    password:String,
    teamSize:Number,
    teamName:String,
    username1:String,
    email1:String,
    contact1:Number,
    username2:String,
    email2:String,
    contact2:String
})
UserSchema.plugin(passportLocalMongoose)
module.exports=mongoose.model("User",UserSchema)