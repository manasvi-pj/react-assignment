// ** Router Imports
import { Link, useLocation } from 'react-router-dom';

// ** MUI Imports
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import CloseIcon from '@mui/icons-material/Close';

// ** Sidebar Imports
import SidebarItems from './SidebarItems';

const Sidebar = ({ isOpen, toggleSidebar, isTemporary }) => {
  const location = useLocation();

  return (
    <Drawer
      variant={isTemporary ? 'temporary' : 'permanent'}
      open={isOpen}
      onClose={toggleSidebar}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        zIndex: isTemporary ? 1301 : 1200,
        '& .MuiDrawer-paper': {
          width: isOpen ? 250 : 54,
          transition: 'width 0.3s',
          overflowX: 'hidden',
          backgroundColor: '#282a42',
          color: 'white',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: isOpen ? 'flex-end' : 'center',
          p: 1,
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: 'white',
            transition: 'transform 0.3s ease-in-out',
            ...(!isTemporary
              ? { transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }
              : {}),
            '&:hover': {
              backgroundColor: '#eaeaff0d',
            },
          }}
        >
          {!isTemporary ? <KeyboardDoubleArrowLeftIcon /> : <CloseIcon />}
        </IconButton>
      </Box>

      <List sx={{ py: 0 }}>
        {SidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={index}
              component={Link}
              to={item.path}
              sx={{
                backgroundColor: isActive ? '#1976D2' : 'transparent',
                color: isActive ? 'white' : 'inherit',
                '&:hover': {
                  backgroundColor: isActive ? '#1565C0' : '#eaeaff0d',
                },
                borderRadius: '5px',
                margin: '5px',
                display: 'flex',
                justifyContent: 'center',
              }}
              onClick={() => {
                if (isTemporary) toggleSidebar();
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? 'white' : 'inherit',
                  minWidth: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: isOpen ? 2 : 0,
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isOpen && <ListItemText primary={item.text} />}
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
