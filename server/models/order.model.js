import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true
  },
  totalBill: {
    type: Number,
    required: true
  },
  cartItems: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  paid: {
    type: Boolean,
    default: false // Default value set to false, indicating unpaid
  }
});

// Create the Order model

export const Order = mongoose.model("Order",orderSchema)

