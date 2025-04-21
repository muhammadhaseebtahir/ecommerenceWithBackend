const express=require('express');
const cors=require('cors'); 
const bodyParser=require('body-parser');    
const app=express();
const addproduct= require('./routes/AddProducts');
const cartproduct=require('./routes/CartProduct');

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
app.use("/dashboard",addproduct);
app.use("/cart",cartproduct);