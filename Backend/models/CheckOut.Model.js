const mongoose= require("mongoose")
const checkOutSchema= new mongoose.Schema({
    userId: {   type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    productName: { type: String, required: true },
    productImage: { type: [String], required: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    productColor: { type: String, required: true },
    productSize: { type: String, required: true },
    productDescription: { type: String, required: true },
    productCategory: { type: [String], required: true },
    productBrand: { type: String, required: true },
    productRating: { type: Number, required: true },
   
   
    productStatus: { type: String, required: true,Default: "Pending" },

    productPaymentMethod: { type: String, required: true },
    productDeliveryAddress: { type: String, required: true },
    productDeliveryCity: { type: String, required: true },
    productDeliveryZip: { type: String, required: true },
    productDeliveryPhone: { type: String, required: true },
    productDeliveryNotes: { type: String, required: true },
    productDeliveryStatus: { type: String, required: true },
    })

    const CheckoutForm = mongoose.model("CheckOutData",checkOutSchema)
module.exports = CheckoutForm
