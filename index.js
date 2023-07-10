const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const {restaurantRouter}=require("./routes/restaurant.routes")
const {orderRouter}=require("./routes/order.routes")


const app = express();
require("dotenv").config();


app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Welcome! Food Delivery App Backend." });
});

app.use("/api", userRouter);
app.use("/api",restaurantRouter)
app.use("/api",orderRouter)


app.listen(process.env.port,async(req,res)=>{
    
    try {
        await connection
        console.log({"msg":"Database is connected successfully!"})
    } catch (error) {
        console.log({"msg":error.message})
        console.log({"msg":"DataBase not connected. Please connect first Database"})
    }

    console.log(`Server is running on ${process.env.port}`)
})