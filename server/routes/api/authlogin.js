const express=require('express')
const router=express.Router()
const User=require('../../models/Users')
const auth=require('../../middleware/auth')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const cookieParser=require('cookie-parser')
const { check, validationResult } = require('express-validator');
const config=require('config')



router.get('/',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    
})

router.post('/',[
    check('email','Enter Email ').notEmpty(),
    check('password','Enter password').notEmpty(),
],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
        
    }
    const {email,password}=req.body

    try {

        let user=await User.findOne({email});
        if(!user){
                return res.status(400).json({errors: [{ msg: 'Invalid Credentials' }] })

        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({errors: [{ msg: 'Invalid Credentials' }] })

        }

        const payload={
            user:{id:user.id}

        }







        


       const  Token=jwt.sign(payload,
                config.get('JWTSECRET'),
                {algorithm:"HS256",expiresIn:"1w"},
                // (err,token)=>{
                //     if(err) throw err;
                //     res.json({token})
                  
                // }
                )





                return res
        .status(202)
        .cookie("token", Token, {
            sameSite: "strict",
            path: "/",
            expires: new Date(new Date().getTime() + 6048 * 10000),
            httpOnly: true,
        })
        .send({ ...user._doc });
               
            //   res.cookie("jwt", Token, {secure: true, httpOnly: true})
               // res.header('x-auth-token',Token).send(Token)
                // res.cookie('jwt',Token, { httpOnly: true, secure: true, maxAge: 3600000 }).send(Token)
            //     res.status(200).cookie('verify',token,{sameSite:'strict',path:'/',
            //     expires: new Date(new Date().getTime() + 6048 * 100),
            //     httpOnly:true
            // }
            // ).send("asdasdasdasdsa")


        
        




    } catch (err) {
        console.log(err.message);
        res.status(500).send('service error');
        
        
    }
})


router.get('/verify',async(request,response)=>{
        
    const token = request.cookies.token;

    try {
        if (!token) {
        return response.status(200).json({ tokenVerified : false });
        }

        const decrypt = await jwt.verify(token, config.get('JWTSECRET'));
        request.user = decrypt.userName;

        return response.status(200).json({ tokenVerified : true });
    } catch (error) {
        response.clearCookie("token");
        return response.status(401).send(error.message);
    }
            
})
module.exports=router;
