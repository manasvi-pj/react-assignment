// ** React Imports
import { useState } from "react";
import { Outlet } from "react-router-dom";

// ** MUI Imports
import { Box, useMediaQuery, useTheme } from "@mui/material";

// ** Components Imports
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";

// ** Styles Imports
import * as styles from "../styles-page/styles";

const MainLayout = () => {
  // ** States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // ** Vars
  const sidebarWidth = isSidebarOpen ? 251 : 55;
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box sx={styles.layoutBox}>
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
      <Box sx={styles.contentMainBox(isMdOrSmaller, sidebarWidth)}>
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
        <Box sx={styles.content}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
