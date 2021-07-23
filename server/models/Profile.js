const mongoose =require('mongoose')
const profileSchema=new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    // img:
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    city:{
        type: String,
        default: "XYZ"
        
    },
    state:{
        type:String,
        default: "XYZ"
    },
    

}

)
const profile =mongoose.model('profile',profileSchema)
module.exports=profile;