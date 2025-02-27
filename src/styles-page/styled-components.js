import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// ** Login Backgrounge Image
export const MaskImg = styled("img")(({ theme }) => ({
  zIndex: -1,
  bottom: "7%",
  width: "100%",
  position: "absolute",
  [theme.breakpoints.down("lg")]: {
    bottom: "10%",
  },
}));

// ** 401 & 404
export const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

export const ImgTag = styled("img")(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  height: 350,
  [theme.breakpoints.down("lg")]: {
    height: 350,
  },
  [theme.breakpoints.down("md")]: {
    height: 300,
  },
}));
