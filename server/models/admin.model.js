import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const adminSchema = mongoose.Schema(
{
    name:
    {
        type:String,
        require:true,
    },
    password:
    {
        type:String,
        require:true
    },
    email:
    {
        type:String,
        require:true
    },
    phone:
    {
        type:Number,
        require:true
    }

})

adminSchema.pre("save", async function(next)
{
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password, 10);
    console.log("successfull")
    next()
})

adminSchema.methods.isPassowrdCorrect = async function(password)
{
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.generatetoken = async function()
{
    try {

        return jwt.sign({
            userId:this._id.toString(),
            name: this.name,
        },
        process.env.JWT_SCREAT_KEY,
        {
            expiresIn:"30d",
        })
        
    } catch (error) {
        console.error(error);
    }
}


export const Admininfo = mongoose.model("Admininfo",adminSchema)