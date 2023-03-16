import mongoose from "mongoose";
const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  by: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

mongoose.model("Bike", bikeSchema);

const BookingsSchema = new mongoose.Schema({
  bookingStartDate: {
    type: Date,
    required: true,
  },
  bookingEndDate: {
    type: Date,
    required: true,
  },
  bikes: {
    type: mongoose.Schema.ObjectId,
    ref: "Bike",
    required: true,
  },
  by: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

mongoose.model("Bookings", BookingsSchema);
