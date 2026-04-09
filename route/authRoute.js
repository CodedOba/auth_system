import { Router } from "express";
import { register, login, refreshAccessToken, logout} from "../controller/authController.js";




const authRoute = Router()



authRoute.post("/create", register)
authRoute.post("/login", login )
authRoute.post("/refreshtoken", refreshAccessToken)
authRoute.post("/login", logout )






export{authRoute}