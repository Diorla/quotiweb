import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BoxProps } from "@mui/system";
import { drawerWidth } from "./drawerWidth";

export default function Body({ children }: BoxProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}
