// ** React Imports
import { useState } from 'react';

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

const Header = ({ toggleSidebar, isMdOrSmaller }) => {
  const [anchorEl, setAnchorEl] = useState(null);

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
            <Avatar alt='User' src='/profile.jpg' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
