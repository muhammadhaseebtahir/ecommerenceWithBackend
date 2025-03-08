const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AuthUserSchema = new schema({

    user_id: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
        trim: true
    } ,
    status:{
        type:String,
        default:"active"
    },
    role:{
        type:[String],
        default:["customer"]
    },  
},{timestamps:true});
 const AuthUser= mongoose.model("User",AuthUserSchema);
    module.exports=AuthUser;