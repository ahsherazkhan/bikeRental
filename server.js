import { ApolloServer } from "apollo-server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import mongoose from "mongoose";
import { JWT_SECRET, MONGO_URL } from "./config.js";
import jwt from "jsonwebtoken";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to DB", err);
});

// const cors = require("cors");

// app.use(cors()); // Use this after the variable declaration

//imports models
import "./models/Bike.js";
import "./models/User.js";
// import "./models/Bookings.js";
import resolvers from "./resolvers.js";

const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, JWT_SECRET);
    return { userId };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  //   plugins: [ApolloServerPlugin],
});

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });
// console.log(`🚀  Server ready at: ${url}`);

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
