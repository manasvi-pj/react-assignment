// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import { Box, useMediaQuery, useTheme } from '@mui/material';

// ** Components Imports
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';

const MainLayout = ({ children }) => {
  // ** States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // ** Vars
  const sidebarWidth = isSidebarOpen ? 251 : 55;
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isMdOrSmaller ? isMobileSidebarOpen : isSidebarOpen}
        toggleSidebar={() =>
          isMdOrSmaller
            ? setIsMobileSidebarOpen(!isMobileSidebarOpen)
            : setIsSidebarOpen(!isSidebarOpen)
        }
        isTemporary={isMdOrSmaller}
      />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          transition: 'margin 0.3s ease-in-out, width 0.3s ease-in-out',
          marginLeft: isMdOrSmaller ? 0 : `${sidebarWidth}px`,
          width: `calc(100vw - ${isMdOrSmaller ? '0px' : `${sidebarWidth}px`})`,
          maxWidth: `calc(100% -  ${isMdOrSmaller ? '0px' : `${sidebarWidth}px`})`,
          overflowX: 'hidden',
        }}
      >
        {/* Header */}
        <Header
          toggleSidebar={() =>
            isMdOrSmaller
              ? setIsMobileSidebarOpen(!isMobileSidebarOpen)
              : setIsSidebarOpen(!isSidebarOpen)
          }
          isMdOrSmaller={isMdOrSmaller}
        />

        {/* Main Content Wrapper */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
