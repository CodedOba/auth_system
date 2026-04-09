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

     const refreshToken = await jwt.sign( { userid: userdata.id }, process.env.REFRESHTOKENKEY, { expiresIn: "20d" } );

    userdata.refreshToken = refreshToken;
    await userdata.save();
        
           
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

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "No refresh token",
    });
  }

  const user = await User.findOne({ refreshToken });

  if (!user)
    return res.status(403).json({
      message: "Invalid refresh token",
    });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESHTOKENKEY);

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.ACCESSTOKENTKEY, // ✅ FIXED (was wrong before)
      { expiresIn: "15m" },
    );

    res.json({
      accessToken: newAccessToken,
    });

  } catch (error) {
    console.log(error);
    
    res.status(403).json({
      success: false,
      message: "Token expired or invalid",
    });
  }
};

export { refreshAccessToken };

const logout = async (req, res) => {

  const { refreshToken } = req.body;

  // remove token from DB
  await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: null }
  );

  res.json({ message: "Logged out successfully" });
};

export { logout };