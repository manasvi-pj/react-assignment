// ** Dashboard
export const card = (color) => ({
  borderTop: `5px solid ${color}`,
});

// ** Loader
export const loader = {
  height: '100vh',
};

// ** Main Layout
export const layoutBox = {
  display: 'flex',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
};

export const contentMainBox = (isMdOrSmaller, sidebarWidth) => ({
  flexGrow: 1,
  transition: 'margin 0.3s ease-in-out, width 0.3s ease-in-out',
  marginLeft: isMdOrSmaller ? 0 : `${sidebarWidth}px`,
  width: `calc(100vw - ${isMdOrSmaller ? '0px' : `${sidebarWidth}px`})`,
  maxWidth: `calc(100% -  ${isMdOrSmaller ? '0px' : `${sidebarWidth}px`})`,
  overflowX: 'hidden',
});

export const content = {
  p: 3,
};
