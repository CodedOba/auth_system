import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    name: String,
    food: String,
    amount: Number,
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }

})

const Goods = mongoose.model("Goods", productSchema);


export {Goods}