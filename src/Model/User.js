const mongoose = require("mongoose")
const validator = require("validator")


const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        minlength : 2,
        maxlength : 8,
        required : true 
    },
    lastName : {
        type : String,
        minlength : 3,
        maxlength : 10,
        required : true
    },
    userName :{
        type : String,
        minlength : 3,
        maxlength : 10,
        required : true,
        unique : true
    },
    role : {
        type : String,
        enum : {
            values : ["buyer" , "seller"],
            message : 'enum validator failed for `{PATH}` with `{VALUE}`' 
        },
        required : true,
    },
    mobile : {
       type : String, 
       validate : (val) =>{
        const isMobile = validator.isMobilePhone(val , "en-IN")
        if(!isMobile)
        {
            throw new Error("Mobile Number is not valid ")
        }
       },
       required : true
    },
    profilePicture : {
        type : String ,
        // validate : (val) =>{
        //    const  isImg = validator.isURL(val)
        //     if(!isImg)
        //     {
        //         throw new Error("Please Enter valid Image URL")
        //     }
        // },
        // required : true
    },
    password : {
       type : String,
       required : true
    },
    cart : []
})



const User = mongoose.model("user", UserSchema)

module.exports = {
    User
}