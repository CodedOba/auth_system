import { Goods } from "../model/productUser.js";



const productlist = async (req, res) => {
const user_id =req.userid
    try {
        
        const {name,food, amount}=req.body

        const data = await Goods.create({
            name,
            food,
            amount,
            user: user_id
            
        })

        return res.status(200).json({
            success: true,
            message: "inserted successfully",
            data

        })




    } catch (error) {
        console.log(error);
        
        
    }
    
}

export {productlist}



const getproduct = async (req, res) => {

       const user_id =req.userid
    try {
        
        const product = await Goods.find({user:user_id})

        return res.status(200).json({
            success: true,
            message: "data recieved successfully",
            product
            

        })





    } catch (error) {
        console.log(error);
        
        
    }
    
}

export {getproduct}
