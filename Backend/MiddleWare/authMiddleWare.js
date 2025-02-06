// secure route'
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = async(req,res,next)=>{
  const token = (req.headers["authorization"]).split(" ")[1];
  if(!token){
    return res.status(401).json({message:"Unauthorized Access"});
  }
  else{
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
      if(err){
        return res.status(401).json({message:"Unauthorized Access"});
      }
      else{
        req.user = decoded;
        next();
      }
    });
  }
}


module.exports = {authMiddleWare};