const mongoose = require('mongoose');   
require('dotenv').config();
const dbConnected=async()=>{
       
  await mongoose.connect(process.env.MONGO_URL,{
    dbName:"Ecommerence",
  })
  .then(()=>{
    console.log("MongoDb connected");
  }).catch((err)=>{
           console.log(`MongoDb connection error ${err}` );           
  })
}
module.exports= dbConnected;