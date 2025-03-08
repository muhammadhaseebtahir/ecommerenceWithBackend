const express=require('express');
const cors=require('cors'); 
const bodyParser=require('body-parser');    
const app=express();

const dbConnected=require('./config/db');
const auth=require('./routes/Auth');
dbConnected();

app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    
});


app.use("/auth",auth);