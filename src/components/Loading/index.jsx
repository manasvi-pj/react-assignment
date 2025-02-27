// ** MUI Imports
import { Box, CircularProgress } from '@mui/material';

// ** Styles Imports
import * as styles from '../../styles-page/styles';

const LoadingScreen = () => {
  return (
    <Box
      width={'100%'}
      height={'100vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <CircularProgress color='primary' sx={styles.loader} />
    </Box>
  );
};

export default LoadingScreen;
