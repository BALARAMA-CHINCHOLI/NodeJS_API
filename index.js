//package name 'express'
const express = require("express");

//jwt-jsonwebtoken
const jwt = require("jsonwebtoken");

//creating app
const app = express();

const secretkey = "secretkey"; //Hidding

//creating here small app and call back function using (request, response) two parameter
app.get("/", (req, resp)=>{
    //passing "resp.json"
    resp.json({
        message: "a sample api"
    })
})


//port no 5000 and call back function '()=>{}'
app.listen(5000, ()=>{
  console.log("app is running 5000 port");
})


//Creating here simple login
app.post("/login", (req, resp)=>{
    const user = {
        id: 1,
        userName: "Balarama",
        email: "balarama@gmail.com"
    }

    //Here passing the parameter "user" details can helps to generating tokens.
    //expireIn 300s
    //using here callback function (error,token)=>{}
    jwt.sign({user}, secretkey, {expiresIn: '300s'}, (err, token)=>{
        resp.json({
            //passing here token
           token  
        })
    }) 
})


//To verify "user" function, "profile" has to be first verifyToken, 
//so again create here "profile" and passed two parameters with callback (req, resp)=>{}
app.post("profile", verifyToken, (req, resp)=>{
   jwt.verify(req.token, secretkey,(err, authData)=>{
      if(err){
        resp.send({result: "invalid token"})
      }else{
         resp.json({
            message:"profile accessed"
        })
      }
   })
})

//Verifying token after generating from post man by this below "verifyToken()"
//Here in function 3 parameters verifyToken(req,resp, next)
function verifyToken(req,resp, next){
  const bearerHeader = req.headers ['authorization'];
  if(typeof bearerHeader !== 'undefined'){

    //Use here any name ex: bearer and .split(" ") it is giving spave between tokens.
    const bearer = bearerHeader.split(" ");

    //After recieving token sending to req.token
    const token = bearer[1]; 

    //getting token from "token"
    req.token = token;

    //verifying the profile token
    next(); 

  } else{
      resp.send({
         result: 'Token is not valid'
      })
  } 
}