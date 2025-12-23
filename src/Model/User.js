const mongoose=require("mongoose")
const validate =require("validator")
const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        minLength:3,
        maxLength:10,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:15,
        required:true,

    },
    userName:{
        type:String,
        maxLength:15,
        minLength:5,
        required:true,
        unique:true,
        immutable:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:15
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        immutable:true
    },
    profilePicture:{
        type:String,

    },
    mobileNumber:{
        type:String,

    },
    cart:[]
})
const User=mongoose.model("User",UserSchema)
module.exports={
    User
}





