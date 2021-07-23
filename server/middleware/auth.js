const jwt =require('jsonwebtoken')
const config=require('config')

module.exports =(req,res,next)=>{
//get token from header
//const token=req.header('x-auth-token')
const token = req.cookies.token || '';



if(!token){
    return res.status(404).json({msg:"No Token , Authorization Declined"})

}
try {
    const decoded=jwt.verify(token,config.get('JWTSECRET'))
    req.user=decoded.user;
    
    next();
} catch (err) {
    return res.status(401).json({msg:"Token is invalid"})
    
}

}