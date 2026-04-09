import { Router } from "express";
import { register, login } from "../controller/authController.js";




const authRoute = Router()



authRoute.post("/create", register)
authRoute.get("/login", login )





export{authRoute}