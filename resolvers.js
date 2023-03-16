import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { GraphQLScalarType, Kind } from "graphql";
import "moment-timezone";
const User = mongoose.model("User");
const Bike = mongoose.model("Bike");
const Bookings = mongoose.model("Bookings");
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    bikes: async () => await Bike.find({}).populate("by", "_id firstName"),
    ibike: async (_, { by }) => await Bike.find({ by }),
    bookings: async () => await Bookings.find({}).populate("bikes by"),
    myprofile: async (_, args, { userId }) => {
      if (!userId) throw new Error("You must be logged in!");
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    bikes: async (ur) => await Bike.find({ by: ur._id }),
    // bookings: async (ur) => await Bookings.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exist with that email");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12);
      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUser.save();
    },

    signinUser: async (_, { userSignin }) => {
      //TODO
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User doesn't exist with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("Email or Password invalid");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    createNewBike: async (_, { name, imageurl }, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      const newBike = new Bike({
        name,
        imageurl,
        by: userId,
      });
      await newBike.save();
      return "Post Saved Successfully";
    },

    createBookings: async (
      _,
      { bookingStartDate, bookingEndDate, bikes },
      { userId }
    ) => {
      if (!userId) throw new Error("You must be logged in");
      const newBooking = new Bookings({
        bookingStartDate,
        bookingEndDate,
        bikes,
        by: userId,
      });
      await newBooking.save();
      return "Booking Saved Successfully";
    },

    removeBookings: async (_, { _id }) => {
      // if (!userId) throw new Error("You must be logged in");

      await Bookings.deleteOne({ _id });
      return "Booking removed Successfully";
    },
  },
};
export default resolvers;
