import express from "express"
import dotenv from "dotenv"
import { database } from "./config/db_connect.js"
import { authRoute} from "./route/authRoute.js"
import { productRoute } from "./route/productRoute.js"



dotenv.config()
database()

const app = express()

app.use(express.json())

app.use("/api/auth", authRoute)





app.use("/api/product", productRoute)







app.listen(4040,()=>{
    console.log("server is active");
    

})
