import { gql } from "@apollo/client";

//query to get all bikes
export const GET_ALL_BIKES = gql`
  query getAllBikes {
    bikes {
      _id
      name
      imageurl
      by {
        _id
        firstName
      }
    }
  }
`;

//query to get all the bookings
export const GET_ALL_BOOKINGS = gql`
  query getAllBookings {
    bookings {
      _id
      bookingStartDate
      bookingEndDate
      bikes {
        _id
        name
        imageurl
      }
    }
  }
`;

//query to get profile information
export const GET_MY_PROFILE = gql`
  query getMyProfile {
    user: myprofile {
      firstName
      lastName
      email
      bikes {
        name
        imageurl
      }
    }
  }
`;

//query to get a user by id
export const GET_USER_BY_ID = gql`
  query getUserById($userid: ID!) {
    user(_id: $userid) {
      _id
      firstName
      lastName
      email
      bikes {
        name
        imageurl
      }
    }
  }
`;
