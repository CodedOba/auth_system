import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { productlist, getproduct } from "../controller/productController.js";




const productRoute = Router()


productRoute.post("/insert", authMiddleware, productlist)
productRoute.get("/get", authMiddleware, getproduct)








export{productRoute}