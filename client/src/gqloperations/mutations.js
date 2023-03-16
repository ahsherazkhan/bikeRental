import { gql } from "@apollo/client";
export const SIGNUP_USER = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
    }
  }
`;
export const LOGIN_USER = gql`
  mutation SigninUser($userSignin: UserSigninInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const CREATE_NEW_BIKE = gql`
  mutation createNewBike($name: String!, $imageurl: String!) {
    bike: createNewBike(name: $name, imageurl: $imageurl)
  }
`;

export const CREATE_BOOKING = gql`
  mutation createBookings(
    $bookingStartDate: String!
    $bookingEndDate: String!
    $bikes: String!
  ) {
    booking: createBookings(
      bookingStartDate: $bookingStartDate
      bookingEndDate: $bookingEndDate
      bikes: $bikes
    )
  }
`;

export const REMOVE_BOOKING = gql`
  mutation removeBookings($_id: ID!) {
    removeBookings(_id: $_id)
  }
`;
