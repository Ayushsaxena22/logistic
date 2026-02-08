const jwt=require("jsonwebtoken");
const authMiddleware=async(req,res,next)=>{
  try{
    const authHeader=req.headers.authorization;
    if(!authHeader)
    {
        return res.status(401).json({
            success:false,
            message:"token is missing",
            error:error.message
        });
    };
    const token=authHeader.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({
            success:false,
            message:"invalid token",
            error:error.message
        });
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
  }catch(error)
  {
    return res.status(401).json({
            success:false,
            message:"unauthorized access",
            error:error.message
        });
  }
};
const authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return res.status(403).json({
            success:false,
            message:"access denied"
        });
        }
        next();
    }
};
module.exports={authMiddleware,authorize};
