// ** React Imports
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ** Constant Imports
import { strings } from '../../constants/strings';

// ** MUI Imports
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// ** Redux Imports
import { logout } from '../../features/authSlice';

// ** Styles Imports
import * as styles from '../../styles-page/header';

const Header = ({ toggleSidebar, isMdOrSmaller }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null);

  // ** Vars
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position='sticky' sx={styles.appBar}>
      <Toolbar sx={styles.toolBar(isMdOrSmaller)}>
        {/* Show Menu Button in Small Screens */}
        {isMdOrSmaller && (
          <IconButton onClick={toggleSidebar} sx={styles.menuIcon}>
            <MenuIcon />
          </IconButton>
        )}

        <Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={styles.avatar} alt={user?.role} src='/profile.jpg' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              {strings.profile}
            </MenuItem>
            <MenuItem onClick={handleLogout}>{strings.logout}</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
