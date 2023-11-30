const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req,res,next) =>{
    const authHeader = req.get("Authorization");
    if(!authHeader){
        return res.status(401).json({message : "Not authenticated 1."});
    }
    const token = authHeader.split(" ")[1];
    try{
        const tokenMatch = jwt.verify(token,process.env.JWT_KEY);
        if(!tokenMatch){
            return res.status(401).json({ message : "Not authenticated 2"});
        }
        req.userId = tokenMatch.userId;
        next();
    }
    catch(err){
        return res.status(401).json({ message : "Not authenticated 3"});
    }
}

module.exports = isAuth;