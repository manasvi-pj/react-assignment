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
    <AppBar
      position='sticky'
      sx={{
        width: '100%',
        transition: 'width 0.3s ease-in-out, margin-left 0.3s ease-in-out',
        background: 'primary',
        zIndex: 1201,
        boxShadow: '0 4px 8px -4px black',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        overflow: 'hidden',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: isMdOrSmaller ? 'space-between' : 'end',
        }}
      >
        {/* Show Menu Button in Small Screens */}
        {isMdOrSmaller && (
          <IconButton onClick={toggleSidebar} sx={{ color: 'white', mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar
              sx={{
                textTransform: 'capitalize',
                fontWeight: 700,
                backgroundColor: '#9a9090',
              }}
              alt={user?.role}
              src='/profile.jpg'
            />
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
