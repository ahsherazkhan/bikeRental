import { styled, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
export const CustomContainer = styled(Container)({
  padding: "100px",
});

export const CustomButton1 = styled(Button)({});

export const CustomTypography = styled(Typography)({
  variant: "subtitle1",
  textAlign: "center",
  color: "White ",
  backgroundColor: "Black!important",
});

export const CustomBox = styled(Box)({
  color: "White !important",
  backgroundColor: "Black!important",
  component: "footer",
});
// export const CustomButton2 = styled(Button)({
//   marginTop: "40px !important",
// });

// export const CustomButton3 = styled(Button)({
//   marginTop: "40px !important",
// });

// export const CustomButton4 = styled(Button)({
//   marginTop: "40px !important",
// });
