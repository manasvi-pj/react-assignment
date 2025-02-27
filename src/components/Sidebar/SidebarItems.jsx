// ** MUI Imports
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SidebarItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/", roles: ["admin"] },
  {
    text: "Products",
    icon: <ShoppingCartIcon />,
    path: "/products",
    roles: ["admin", "user"],
  },
];

export default SidebarItems;
