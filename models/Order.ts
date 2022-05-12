import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  order: [
    {
      title: String,
      color: [String],
      quantity: Number,
      price: Number,
      photo: String,
      size: String,
    },
  ],
  shipment: {
    kind: String,
    price: Number,
  },
  archive: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
