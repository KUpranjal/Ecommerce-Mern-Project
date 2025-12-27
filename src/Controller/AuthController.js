const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User} = require("../Model/User")


const userSignup = async(req, res) =>{
    try {
          const {firstName, lastName, userName , profilePicture, mobile, role , password} = req.body

         if(!firstName || firstName.length < 2 || firstName.length > 8)
         {
            throw new Error("firstName should be greaterthan 2 and less than 8")
         }
         if(!lastName || lastName.length < 3 || lastName.length > 10)
         {
            throw new Error("lastName should be greaterthan 3 and less than 10")
         }
         if(! userName || userName.length < 3 || userName.length > 10 )
         {
            throw new Error("userName should be greaterthan 3 and less than 10")
         }
         if(!mobile  || !validator.isMobilePhone(mobile , "en-IN"))
         {
            throw new Error("Please Provide a valid number")
         }
        //  if(!profilePicture || ! validator.isURL(profilePicture))
        //  {
        //     throw new Error("Please Provide a Imge URL")
        //  }
         if(!role || !["seller", "buyer"].includes(role))
         {
            throw new Error("You can create either Buyer or seller Account")
         }
         if(!password)
         {
            throw new Error("Please Provide your password")
         }

         const isStrongPassword = validator.isStrongPassword(password)

         if(!isStrongPassword)
         {
            throw new Error("Please Enter Vlaid Password")
         }

        const isPresentUserName = await User.findOne({userName : userName.toLowerCase()})

        if(isPresentUserName)
        {
            throw new Error("User already exist")
        }



         const hashPassword = await bcrypt.hash(password, 10)
         const createdUser = await User.create({firstName, lastName, userName: userName.toLowerCase() , profilePicture, mobile, role , password: hashPassword})
       
         res.status(201).json({Success : true , data : createdUser})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

const userSignin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName) {
      return res.status(400).json({ error: "Please enter a valid username" });
    }

    if (!password) {
      return res.status(400).json({ error: "Please enter your password" });
    }

    const foundUser = await User.findOne({
      userName: userName.toLowerCase()
    });

    if (!foundUser) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { firstName, lastName, userName: un, profilePicture, mobile, role } =
      foundUser;

    res
      .cookie("loginToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "You are logged in now",
        userData: { firstName, lastName, userName: un, profilePicture, mobile, role },
      });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const userSignout = async(req,res) =>{
    res.cookie("loginToken" , null).status(200).json({Success : true , msg : "You are logout Now"})
}


module.exports = {
    userSignup,
    userSignin,
    userSignout
 
}