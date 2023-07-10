const express = require("express");
require("dotenv").config()
const { userModel } = require("../models/user.model");

const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const exists = await userModel.findOne({ email });
    
    if (exists) {
      return res.status(400).json({ ok: false, msg: "User already exists. Please provide a different email ID." });
    }

    bcrypt.hash(password, 8, async (err, hashedPassword) => {
      if (err) {
        throw new Error(err.message);
      }

      const userData = new userModel({ name, email, password: hashedPassword, address });
      await userData.save();

      return res.status(201).json({ ok: true, msg: "User registered successfully!" });
    });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error.message });
  }
});


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).json({"ok":false,"msg":"Oops! Users not Found."})
        }

        const usercompare=await bcrypt.compare(password,user.password);
        if(!usercompare){
            return res.status(400).json({"ok":false,"msg":"Oops! Wrong credentials"})
        }

        const token=jwt.sign({userId:user._id},process.env.userToken,{expiresIn:"2hr"})
        const respose={
            "ok":true,
            "Token":token,
            "msg":"Login Successfully"
        }
        res.status(201).json({"ok":true,"msg":"Yeah Login Successully!"})
    } catch (error) {
        return res.status(400).json({"ok":false,"msg":error.message})
    }
})


userRouter.patch("/user/:id/reset", async (req, res) => {
    const { password, newPassword } = req.body;
    const userId = req.params.id; 
    try {
      const user = await userModel.findById(userId); 
      if (!user) {
        return res.status(400).json({ ok: false, msg: "User not found. Register first." });
      }
  
      const userCompare = await bcrypt.compare(password, user.password);
      if (!userCompare) {
        return res.status(400).json({ ok: false, msg: "Incorrect password. Please enter the correct password." });
      }
  
      bcrypt.hash(newPassword, 8, async (err, hashedPassword) => {
        try {
          user.password = hashedPassword;
          await user.save();
          return res.status(204).json({ ok: true, msg: "Password reset successful." });
        } catch (error) {
          return res.status(400).json({ ok: false, msg: error.message });
        }
      });
    } catch (error) {
      return res.status(400).json({ ok: false, msg: error.message });
    }
  });
  

module.exports = {
  userRouter
};
