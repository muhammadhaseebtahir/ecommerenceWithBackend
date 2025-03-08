const jwt = require("jsonwebtoken");
require("dotenv").config();
 const verifyToken =(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({message:"Access Denied"})
    }
    const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
              if(!err){
                req.user_id=result.user_id
                next()
            }else{
                     return res.status(403).json({message:"Invalid token"})

                 }          

        })
     }
     module.exports=verifyToken;