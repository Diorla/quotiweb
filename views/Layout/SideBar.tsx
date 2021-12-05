import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import DrawerList from "./DrawerList";
import { drawerWidth } from "../../constants/drawerWidth";

export default function SideBar({
  container,
  mobileOpen,
  handleDrawerToggle,
  path = "today",
}: {
  container: (() => HTMLElement) | undefined;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  path: string;
}) {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerList selected={path} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <DrawerList selected={path} />
      </Drawer>
    </Box>
  );
}
