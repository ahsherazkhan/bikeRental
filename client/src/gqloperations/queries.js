import { gql } from "@apollo/client";
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
