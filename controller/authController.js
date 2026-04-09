import { User } from "../model/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


async function register (req, res) {
    try {

        const {name, email, password, confirmPassword}=req.body

        if (!name || !email || !password || !confirmPassword) {
           return res.status(400).json({
                success: false,
                message: "imput empty"
            })
    
        }

        if (password !== confirmPassword) {
           return res.status(400).json({
            success: false,
            message: " password dosnt match"
            
           }) 
        }

        const existingUser = await User.findOne({ email })

            if (existingUser) {
             return res.status(400).json({
              success: false,
              message: "User already exists"
             })
        }
        
        const hashpassword = await bcrypt.hash(password, 10)
        // console.log(hashpassword);


        const user = await User.create({
            name,
            email,
            password: hashpassword
        })

                return res.json({
                success: true,
                message: "created successfully",
                data:{
                    name: user.name,
                    email: user.email,


                }
                
})
        




    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
        
        
    }
     

export {register}



async function login (req, res) {
    try {
        const {email, password}=req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "imput empty"
            })
            
        }

              const userdata = await User.findOne({ email })
              
              if (!userdata) {
                return res.status(401).json({
                    success: false,
                    message: "invalid user"
                })
                
              }
      const comparepassword = await bcrypt.compare(password, userdata.password)
      console.log(comparepassword);

         if (!comparepassword) {
          return res.status(400).json({
         success:false,
        message:"invalid password"
       })
    };
      


      const accesstoken = await jwt.sign({userid: userdata.id}, process.env.JWTKEYS,{expiresIn: "20m"})
        console.log(accesstoken);
        
           
        return res.status(200).json({
            success: true,
            message: "Login",
            data: {
                name: userdata.name,
                email: userdata.email,
                accesstoken
            }
        })
        

    } catch (error) {
         console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
    
}
export {login}