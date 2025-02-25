// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar src='/profile.jpg' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
