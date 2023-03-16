import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BIKES, GET_ALL_BOOKINGS } from "../gqloperations/queries";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CustomButton1 } from "./Class";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useMutation } from "@apollo/client";
import { CREATE_BOOKING } from "../gqloperations/mutations";
export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_BIKES);
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(GET_ALL_BOOKINGS);
  const [createBookings, { loading1, error1, data1 }] = useMutation(
    CREATE_BOOKING,
    {
      refetchQueries: ["getAllBikes", "getAllBookings"],
    }
  );
  const navigate = useNavigate();
  const [setbookingStartDate, setStart] = useState(new Date());
  const [setbookingEndDate, setEnd] = useState(new Date());
  // useEffect(() => {
  //   const mynewbooking = data.bikes.map((bike) => {
  //     if (bike._id != data2.bookings.bikes._id) {
  //       return (bikearray = bike);
  //     }
  //   });
  // }, []);
  const setDateformat = (currentDate) => {
    const currentday = currentDate.getDate();
    return `${currentday.toString().padStart(2, "0")}`;
  };
  const dateFormat = (quo) => {
    const date = new Date(parseInt(quo));
    const day = date.getDate();
    const val = `${day.toString().padStart(2, "0")}`;
    return val;
  };

  const handleChange = (quo) => {
    let check = true;
    // if (!loading2) console.log("6666666666666666", data2);
    // else console.log("6666666666errrerererere666666", error2);
    const newbooking = data2.bookings.map((booked) => {
      if (booked.bikes._id === quo._id) console.log(booked.bikes._id);
      return {
        booked,
      };
    });
    // console.log(newbooking);
    newbooking.map((booked) => {
      console.log(
        "=============1===1===" + booked + dateFormat(setbookingStartDate)
      );
      if (
        dateFormat(booked.bookingEndDate) > dateFormat(setbookingStartDate) &&
        dateFormat(booked.bookingStartDate) < dateFormat(setbookingEndDate)
      ) {
        console.log(" Bike has already been booked in this time slot");
        alert(" Bike has already been booked in this time slot");
        check = false;
        return check;
      }
    });
    if (check === true) {
      createBookings({
        variables: {
          bookingStartDate: setbookingStartDate.toISOString(),
          bookingEndDate: setbookingEndDate.toISOString(),
          bikes: quo._id,
        },
      });
    }
  };
  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1>Loading..</h1>;
  }
  if (loading) return <h1>Loading..</h1>;
  if (error) {
    console.log("error message=>", error.message);
  }
  if (loading2) return <h1>Loading..</h1>;
  if (error2) {
    console.log("error message=>", error.message);
  }
  if (data.bikes.length === 0) {
    return <h2>No Posts available</h2>;
  }
  const backgroundimg = {
    paperContainer: {
      backgroundImage: `url(${"./components/bg.jpg"})`,
    },
  };

  return (
    <div>
      <>
        <div style={backgroundimg.paperContainer}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
              spacing={3}
              sx={{ pt: 4 }}
              direction="row"
              justifyContent="center"
            >
              <DesktopDatePicker
                label="Starting date"
                inputFormat="MM/DD/YYYY"
                selected={setbookingStartDate}
                onChange={setStart}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Ending Date"
                inputFormat="MM/DD/YYYY"
                selected={setbookingEndDate}
                onChange={setEnd}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <h3 sx={{ display: "flex" }}>Available Bikes</h3>

        <Container sx={{ py: 8 }}>
          <Grid container spacing={5}>
            {data.bikes.map((quo) => {
              {
                /* {mynewbooking.map((quo) => { */
              }
              return (
                <Grid item key={quo} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={quo.imageurl}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Description
                      </Typography>
                      <Typography>{quo.name}</Typography>
                    </CardContent>
                    <CardActions>
                      <div>
                        <Stack
                          sx={{ pt: 4 }}
                          direction="row"
                          spacing={2}
                          justifyContent="center"
                        >
                          <CustomButton1
                            variant="contained"
                            key={quo}
                            onClick={() => handleChange(quo)}
                          >
                            Rent
                          </CustomButton1>
                          <Link to={`/profile/${quo.by?._id}`}>
                            <CustomButton1 variant="outlined">
                              Contact Us
                            </CustomButton1>
                          </Link>
                        </Stack>
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
