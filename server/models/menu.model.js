import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
{
    name:
    {
        type:String,
        require:true,
    },
    price:
    {
        type:Number,
        require:true
    },
    category:
    {
        type:String,
        require:true
    },
    image:
    {
        type:String,
        require:true
    },
    rate:
    {
        type:String,
    }

})


export const Menu = mongoose.model("Menu",menuSchema)