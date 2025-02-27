// ** Redux Imports
import { useSelector } from 'react-redux';

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

// ** Styles Imports
import * as styles from '../../styles-page/sidebar';

const Sidebar = ({ isOpen, toggleSidebar, isTemporary }) => {
  // ** Vars
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <Drawer
      variant={isTemporary ? 'temporary' : 'permanent'}
      open={isOpen}
      onClose={toggleSidebar}
      ModalProps={{
        keepMounted: true,
      }}
      sx={styles.drawer(isTemporary, isOpen)}
    >
      <Box sx={styles.box(isOpen)}>
        <IconButton
          onClick={toggleSidebar}
          sx={styles.arrow(isTemporary, isOpen)}
        >
          {!isTemporary ? <KeyboardDoubleArrowLeftIcon /> : <CloseIcon />}
        </IconButton>
      </Box>

      <List sx={styles.list}>
        {SidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            user?.role &&
            item.roles.includes(user.role) && (
              <ListItemButton
                key={index}
                component={Link}
                to={item.path}
                sx={styles.listItemButton(isActive)}
                onClick={() => {
                  if (isTemporary) toggleSidebar();
                }}
              >
                <ListItemIcon sx={styles.listItemIcon(isActive, isOpen)}>
                  {item.icon}
                </ListItemIcon>
                {isOpen && <ListItemText primary={item.text} />}
              </ListItemButton>
            )
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
