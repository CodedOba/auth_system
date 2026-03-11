import { Router } from "express";
import { register, login } from "../controller/authController.js";



const authRoute = Router()



authRoute.post("/create", register)
authRoute.post("/login",login )




export{authRoute}