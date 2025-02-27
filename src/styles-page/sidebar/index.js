export const drawer = (isTemporary, isOpen) => ({
  zIndex: isTemporary ? 1301 : 1200,
  "& .MuiDrawer-paper": {
    width: isOpen ? 250 : 54,
    transition: "width 0.3s",
    overflowX: "hidden",
    backgroundColor: "#282a42",
    color: "white",
  },
});

export const box = (isOpen) => ({
  display: "flex",
  justifyContent: isOpen ? "flex-end" : "center",
  p: 1,
});

export const arrow = (isTemporary, isOpen) => ({
  color: "white",
  transition: "transform 0.3s ease-in-out",
  ...(!isTemporary
    ? { transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }
    : {}),
  "&:hover": {
    backgroundColor: "#eaeaff0d",
  },
});

export const list = { py: 0 };

export const listItemButton = (isActive) => ({
  backgroundColor: isActive ? "#1976D2" : "transparent",
  color: isActive ? "white" : "inherit",
  "&:hover": {
    backgroundColor: isActive ? "#1565C0" : "#eaeaff0d",
  },
  borderRadius: "5px",
  margin: "5px",
  display: "flex",
  justifyContent: "center",
});

export const listItemIcon = (isActive, isOpen) => ({
  color: isActive ? "white" : "inherit",
  minWidth: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mr: isOpen ? 2 : 0,
});
