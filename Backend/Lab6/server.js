import express from "express";
import fs from "node:fs/promises";
const filePath="../userData.json";
const port=process.env.PORT||3000;
const app=express();
app.use(express.json());
async function readData(){
    try{
        const content=await fs.readFile(filePath,"utf8");
        return JSON.parse(content);
    }catch(err){
        return [];
    }
}
async function writeData(data){
    await fs.writeFile(filePath,JSON.stringify(data,null,2),"utf8");
}
app.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to server"});
});
app.get("/user",async(req,res)=>{
    try{
        const userData=await readData();
        res.status(200).json({message:"data received",userData});
    }catch(err){
        console.error("Error:",err.message);
    }
});
app.get("/user/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const userData=await readData();
        const user=userData.find((u)=>u.id===id);
        if(!user) return res.status(404).json({message:"user not found"});
        res.status(200).json({message:"data found",user});
    }catch(err){
        console.error("Error:",err.message);
    }
});
app.post("/create",async(req,res)=>{
    try{
        const {name,email}=req.body;
        const userData=await readData();
        const newUser={id:userData.length+101,name,email};
        userData.push(newUser);
        await writeData(userData);
        res.status(201).json({message:"User created",newUser});
    }catch(err){
        console.error("Error:",err.message);
    }
});
app.put("/edit/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const {name,email}=req.body;
        const userData=await readData();
        const index=userData.findIndex((u)=>u.id===id);
        if(index===-1) return res.status(404).json({message:"user not found"});
        userData[index]={id,name,email};
        await writeData(userData);
        return res.status(200).json({message:"user updated successfully",user:userData[index]});
    }catch(err){
        console.error("Error:",err.message);
    }
});
app.delete("/delete/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const userData=await readData();
        const index=userData.findIndex((u)=>u.id===id);
        if(index===-1) return res.status(404).json({message:"user not found"});
        userData.splice(index,1);
        await writeData(userData);
        return res.status(200).json({message:"user deleted successfully"});
    }catch(err){
        console.error("Error:",err.message);
    }
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});