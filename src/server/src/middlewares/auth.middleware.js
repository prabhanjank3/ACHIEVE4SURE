const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth.config');

exports.verifyBearerToken = (req,res,next)=>{

    const authHeader = req.headers.authorization

    if(!authHeader){
        res.status(401).send({message: "Incorrect Authorization header"});
        return
    }

    const authHeaderList =  authHeader.split(' ')

    if(authHeaderList.length !== 2){
        res.status(401).send({message: "Incorrect Authorization header"});
        return
    }

    if(authHeaderList[0] !== "Bearer"){
        res.status(401).json({message: "Missing bearer authentication in header"});
        return
    }

    if(authHeaderList[1]){
        const token = authHeaderList[1]
        jwt.verify(token,jwtSecret,(err)=>{
            if(err) {
                res.status(401).json({message: "Invalid or Expired Token"});
                return
            }
            else return next();
        })
    }
    else{
        res.status(401).json({message:"Missing bearer authentication in header"});
        return
    }
}