import { jwt } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authmiddleware = (req , res , next)=>{
const token = req.header("Authorization")?.replace("Bearer ", ""); // focuse on this remember.......
if (!token){return res.status(401).json({message:"access denied , no token proivded"});}

try{
    const decoded = jwt.verify(token , process.env.JWT_SECRET) ;
    req.user = decoded;
    next();
}
catch(error){
    res.status(401).json({message:"invalid token"});
}

};

export default authmiddleware;