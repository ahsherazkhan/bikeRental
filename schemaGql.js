// import { gql } from "@apollo/server";
const typeDefs = `#graphql
  type Query {
    users: [User]
    user(_id:ID!):User
    myprofile:User
    ibike(by:ID!):[Bike]
    bikes: [BikeWithName]
    bookings:[Booking]
  }
  type Bike{
    by:ID!
    _id:ID!
    imageurl:String!
    name:String!
  }
  type Booking{
    _id: ID!
    bikes:Bike!
    bookingEndDate:String!
    bookingStartDate:String!
    by:ID!
  }
  type BikeWithName{
    _id: ID!
    by:IdName
    name:String
    imageurl:String
  }

  type IdName{
    _id:String
    firstName:String
  }
  type User{
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password:String!
    bikes: [Bike]
    bookings:[Booking]
  }

  type Token{
    token:String!
  }
  type Mutation {
    signupUser(userNew:UserInput!):User
    signinUser(userSignin:UserSigninInput!):Token
    createNewBike(name:String!,imageurl:String!):String
    createBookings(bookingStartDate:String!, bookingEndDate:String!,bikes:String!):String
    removeBookings(_id:ID!):String
  }
  input UserInput{
    firstName:String!
    lastName: String!
    email: String!
    password:String!
  }
  input UserSigninInput{
    email: String!
    password:String!
  }
`;
export default typeDefs;
