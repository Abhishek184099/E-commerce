const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const CartSchema = new Schema(
  {
  
    title: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
    },
    addBy : {
        type : ObjectId,
        ref : "User"
    }
  },
  {
    timestamps: true,
  }
);


const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;