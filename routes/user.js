const express=require('express')
const UserModel = require('../models/user')
const jwt = require("jsonwebtoken");

console.log("JWT module:", jwt);
const router= express.Router()
module.exports=router;

router.post("/signup", async (req,res)=>{
    const userData = req.body
    try{
        const user = new UserModel(userData)
        const newuser = await user.save()
        res.send(newuser)
    } catch(err){
        res.status(500).send({message: err.message})
    }
})
router.post("/login", async (req,res)=>{
    let uname = req.body.username
    UserModel.findOne({username: uname} ).
    then((user)=>{
        if(!user) {
            res.status(404).send({message: "User not found"})
        } else {
            if(user.password!=req.body.password){
                res.status(404).send({message: "Password incorrect"})
            }
            else{
                const token = jwt.sign(
                    {
                      userId: user._id,
                      userUname: uname,
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                  );
                  res.status(200).send({
                    message: "Login Successful",
                    username: uname,
                    token,
                    });
                

            }
        }
    }).catch((err)=>{
        res.status(500).send({message: err.message})


    })
    
})


// router.get("/login", async (req,res)=>{
//     let uname = req.body.username
//     UserModel.findOne({username: uname} ).
//     then((user)=>{
//         if(!user) {
//             res.status(404).send({message: "User not found"})
//         } else {
//             if(user.password!=req.body.password){
//                 res.status(404).send({message: "Password incorrect"})
//             }
//             else{
//                 res.send("Welcome to website")
//             }
//         }
//     }).catch((err)=>{
//         res.status(500).send({message: err.message})
//     })
    
// })