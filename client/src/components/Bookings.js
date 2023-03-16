import React from "react";
import { GET_ALL_BOOKINGS } from "../gqloperations/queries";
import { useQuery } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { REMOVE_BOOKING } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import "moment-timezone";
export default function Bookings() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKINGS);
  const [remBooking, { loading1, error1, data1 }] = useMutation(
    REMOVE_BOOKING,
    {
      refetchQueries: ["getAllBookings"],
    }
  );

  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1>Loading..</h1>;
  }
  if (loading) return <h1>Loading..</h1>;

  if (error) {
    console.log("error message=>", error.message);
  }
  if (data.bookings.length === 0) {
    return <h2>No Bookings to show</h2>;
  }
  const dateFormat = (quo) => {
    const date = new Date(parseInt(quo));
    const day = date.getDate();
    return `${day.toString().padStart(2, "0")}`;
  };

  const bookingCheck = (quo) => {
    const currentDate = new Date();
    const currentday = currentDate.getDate();
    const Today = `${currentday.toString().padStart(2, "0")}`;
    const BookDate = dateFormat(quo.bookingEndDate);
    if (Today === BookDate) {
      remBooking({
        variables: {
          _id: quo._id,
        },
      });
    } else {
      return BookDate;
    }
  };

  return (
    <div>
      <>
        <h3 sx={{ display: "flex" }}>Your Bookings...</h3>

        <Container sx={{ py: 8 }}>
          <Grid container spacing={5}>
            {data.bookings.map((quo) => {
              return (
                <Grid item key={quo} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ display: "flex" }}>
                      Start Date{dateFormat(quo.bookingStartDate)}
                    </Typography>
                    <Typography sx={{ display: "flex" }}>
                      End Date:
                      {bookingCheck(quo)}
                    </Typography>
                    <CardMedia
                      component="img"
                      image={quo.bikes.imageurl}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Description
                      </Typography>
                      <Typography>{quo.bikes.name}</Typography>
                    </CardContent>
                    <CardActions>
                      <div>
                        <Stack
                          sx={{ pt: 4 }}
                          direction="row"
                          spacing={2}
                          justifyContent="center"
                        ></Stack>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </>
    </div>
  );
}
