import express from "express";
import fs from "node:fs/promises";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Student from "./student.js";

dotenv.config();
connectDB();

const filePath="../userData.json";

const port=process.env.PORT||3000;

const app=express();
app.use(express.json());
app.use(cors());

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
app.get("/test-db",async(req,res)=>{
    try{
        const students=await Student.find();
        res.status(200).json(students);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
app.post("/test-db",async(req,res)=>{
    try{
        const student=await Student.create({
            name:"Aditya",
            email:"aditya@example.com",
            course:"MERN Stack"
        });
        res.status(201).json({message:"Data inserted successfully!", data:student});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});