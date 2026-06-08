import express from "express";
import app from "./src/app.js"
import AppDataSource from "./src/db/datasource.js"
import dotenv from "dotenv";
dotenv.config();

const startserver= async()=>{
    try{
      await AppDataSource.initialize()
      console.log("Database connected");
      app.listen(3000, ()=>{
        console.log("Server listening on port 3000")
      })

    }
    catch(error){

       console.log("Database connection failed", error);
    }
}
startserver();
/*app.listen(3000, (error)=>{
    if(error){
        console.log("There is an error in starting the server")
    }
    else{
        console.log("Server listening on port 3000")
    }
}) 
    */