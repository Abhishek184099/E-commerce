
const mongoose = require("mongoose");
const Product = require("./Products");
const User = require("./User");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const OrderSchema = new Schema({

  products: [
    {
      _id: ObjectId,
      price: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
  createdBy: {
    type: ObjectId,
    required: true,
  },
});


const Order = mongoose.model("Order", OrderSchema);

  
module.exports = Order;