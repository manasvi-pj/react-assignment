// ** MUI Imports
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// ** Styles Imports
import { MaskImg } from "../../styles-page/styled-components";

const BackgroundImage = (props) => {
  // ** Props
  const { image } = props;

  // ** Hook
  const theme = useTheme();

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down("md"));
  const src = image || `/background-image.png`;

  if (!hidden) {
    return <MaskImg alt="mask" src={src} />;
  } else {
    return null;
  }
};

export default BackgroundImage;
