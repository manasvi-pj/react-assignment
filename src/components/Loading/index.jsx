// ** MUI Imports
import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      width={'100%'}
      height={'100vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <CircularProgress color='primary' sx={{ height: '100vh' }} />
    </Box>
  );
};

export default LoadingScreen;
