import jwt from "jsonwebtoken"



async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                message: "no token"
            })
            
        }

        const token = await authHeader.split(" ")[1]
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "no token provided"
            })
        }


        const payload = await jwt.verify(token, process.env.JWTKEYS)

        if (!payload) {
            return res.status(400).json({
                success: false,
                message: "failed to verify token"
            })
        }

        
        
        req.userid = payload.userid
        console.log(req.userid);
        
       
        
 


        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "server error"
        })

        
    }
    
}
export {authMiddleware}