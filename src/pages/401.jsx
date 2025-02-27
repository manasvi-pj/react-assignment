// ** Router Imports
import { useNavigate } from 'react-router-dom';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// ** Constant Imports
import { strings } from '../constants/strings';

// ** Styles Imports
import * as Styled from '../styles-page/styled-components';

const Error401 = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        p={5}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        textAlign={'center'}
      >
        <Styled.BoxWrapper>
          <Typography variant='h1' color='textSecondary' fontWeight={600}>
            {strings.unauthorized}
          </Typography>
          <Typography
            variant='h5'
            marginBottom={1.2}
            fontSize={'1.5rem'}
            color='textSecondary'
            fontWeight={600}
          >
            {strings.unauthorizedTitle}
          </Typography>
          <Typography variant='body2' color='textSecondary' fontWeight={600}>
            {strings.unauthorizedDesc}
          </Typography>
        </Styled.BoxWrapper>
        <Styled.ImgTag alt='error-illustration' src='/401.png' />
        <Button variant='contained' onClick={() => navigate(-3)}>
          {strings.backToHome}
        </Button>
      </Box>
    </Box>
  );
};

export default Error401;
