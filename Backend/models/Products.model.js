const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ProductSchema = new schema({
    userId:{
        type: String,
        required: true,
        trim: true
    },
    // imageUrl:{
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    product_id: {
        type: String,
        required: true,
        trim: true
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    brandName: {
    type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category:{
        type:[String],
        required:true,
        trim:true
    },
    sizes:{
        type:[String],
        required:true,
        trim:true
    },
    colors:{
        type:[String],
        required:true,
        trim:true
    },
    status:{
        type:String,
        default:"active"
    },

}, { timestamps: true });



const Product = mongoose.model('Products', ProductSchema);
module.exports = Product;