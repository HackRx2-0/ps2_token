const express=require('express')
const router=express.Router()
const User=require('../../models/Users')
const { check, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const config=require('config')
const jwt=require('jsonwebtoken')


router.post('/',[
    check('name','Name is required').notEmpty(),
    check('email','Please enter correct Email',) .isEmail(),

    
    check('password','Password should be minimum 8 characters ').isLength({min:8}),
    
],async(req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });

    }

    const {name,email,password,date}=req.body
    try {
        let emailcheck= await User.findOne({email}) 
        if (emailcheck){
            return res.status(400).json({errors:[{msg:"user already exists"}]})
        }
       

        user=new User(
            {name,email,password}
        )
        const salt=await bcrypt.genSalt(10)
        user.password=await bcrypt.hash(password,salt)
        await user.save();
       

        const payload={
            user:{
                id:user.id
            }
        }
        const  Token= jwt.sign(
            payload,
            config.get('JWTSECRET'),
            {algorithm:"HS256",expiresIn:'1w'},
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
            expires: new Date(new Date().getTime() + 6080 * 10000),
            httpOnly: true,
        }).send({token:Token,name,email,password,date})

        
        
    } catch (err) {
        
       
        console.log(err.message)
        res.status(500).send('service error');
    }

})

module.exports=router