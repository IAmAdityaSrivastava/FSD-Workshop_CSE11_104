import express from "express";
//import dotenv from "dotenv";
//import cors from "cors";
//dotenv.config();
const port=process.env.PORT||3000;
const app=express();
app.use(express.json());    //middleware
const userData=[
    {id: 101,name: "John",email: "john@gmail.com"},
    {id: 102,name: "Alice",email: "alice@example.com"}];
//const registerData=[];
//app.use(express.json());
//app.use(cors());
app.get("/",(req,res)=>{    //GET localhost:3000/
    res.status(200).json({message: "Welcome to server"});
});
app.get("/user",(req,res)=>{    //GET localhost:3000/user
    try{
        res.status(200).json({message: "data recieved",userData});
    } catch(err){
        console.error("error",err.message);
    }
});
//app.get("/registered",(req,res)=>{});
app.get("/user/:id",(req,res)=>{    //GET localhost:3000/user/102
    try{
        const id=req.params.id;
        const user=userData.find((u)=>u.id==id);
        if(!user) return res.status(400).json({message:"user not found"});
        res.status(200).json({message:"data found",user});
    }catch(err){
        console.error("Error",err.message);
    }
});
app.post("/create",(req,res)=>{    //POST localhost:3000/create & body-->raw(JSON): {"name":"Ash","email":"ash@gmail.com"}
    try{
        const {name,email}=req.body;
        const newUser={id: userData.length+101,name,email};
        userData.push(newUser);
        res.status(201).json({message:"User created",newUser});    //GET localhost:3000/user
    } catch(err){
        console.error("Error:",err.message);
    }
});
app.put("/edit/:id",(req,res)=>{    //PUT localhost:3000/edit/101 & body-->raw(JSON): {"name":"Senku","email":"senku@gmail.com"}
    try{
        const id=req.params.id;
        const {name,email}=req.body;
        const index=userData.findIndex((u)=>u.id==id);
        if(index==-1) return res.status(400).json({message:"user not found"});
        userData[index]={id,name,email};
        return res.status(200).json({message:"user updated successfully"});    //GET localhost:3000/user
    }catch(err){
        console.error("Error:",err.message);
    }
});
app.delete("/delete/:id",(req,res)=>{    //DELETE localhost:3000/delete/102
    try{
        const id=req.params.id;
        const index=userData.findIndex((u)=>u.id==id);
        if(index==-1) return res.status(400).json({message:"user not found"});
        userData.splice(index,1);
        return res.status(200).json({message:"user deleted successfully"});    //GET localhost:3000/user
    }catch(err){
        console.error("Error:",err.message);
    }
});
// app.put("/update/:id",(req,res)=>{});
//app.post("/register",(req,res)=>{});
//app.post("/login",(req,res)=>{});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});