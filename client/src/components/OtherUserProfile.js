import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../gqloperations/queries";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CustomButton1 } from "./Class";
export default function OtherUserProfile() {
  const { userid } = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userid },
  });

  if (loading) return <h2>Profile is loading</h2>;
  if (error) {
    console.log(error);
  }
  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h6>Email - {data.user.email}</h6>
      </div>
      <h3>Your Posts</h3>
      <Container sx={{ py: 8 }}>
        <Grid container spacing={5}>
          {data.user.bikes.map((quo) => {
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
                    sx={{
                      pt: "25.25%",
                    }}
                    image={quo.imageurl}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Desription
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
                        <CustomButton1 variant="contained">Buy</CustomButton1>
                        <CustomButton1 variant="outlined">
                          Contact Us
                        </CustomButton1>
                      </Stack>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
