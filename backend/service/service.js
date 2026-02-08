const User=require("../model/model.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const validator=require("validator");
const createUser=async(data)=>{
    const {username,email,password,role}=data;
    if(!username||!email||!password||!role)
    {
        throw new Error ("all field are required");
    };
    if(!validator.isEmail(email))
    {
        throw new Error ("emails has required valid");
    };
     if(!validator.isStrongPassword(password))
    {
        throw new Error ("password should be strong");
    };
    const alreadyUser=await User.findOne({email});
    if(alreadyUser)
    {
        throw new Error ("user has already exist");
    }
    const hashPassword=await bcrypt.hash(password,10);
    data.password=hashPassword;
    return await User.create(data);
};
const goUser=async(data)=>{
    const {email,password}=data;
    if(!email||!password)
    {
        throw new Error ("all field are required");
    };
  
    const user=await User.findOne({email});
    if(!user)
    {
        throw new Error ("user has not exist");
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        throw new Error ("password is incorrect");
    }
    const token=jwt.sign(
        {userId:user._id,
        email:user.email,
        role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    return{
        token,
        userId:user._id,
        email:user.email,
        role:user.role
    };
};

module.exports={createUser,goUser};