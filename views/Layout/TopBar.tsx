import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { drawerWidth } from "./drawerWidth";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import { Home, Notifications } from "@mui/icons-material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Grid } from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const StyledGrid = styled(Grid)`
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  align-items: center;
`;
export default function TopBar({
  handleDrawerToggle,
  openCategory,
  openActivity,
}: {
  handleDrawerToggle: () => void;
  openCategory: () => void;
  openActivity: () => void;
}) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <StyledToolbar variant="dense">
        <StyledGrid>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Home />
          </IconButton>
        </StyledGrid>
        <StyledGrid>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="add activity"
            sx={{ mr: 2 }}
            onClick={openActivity}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="add category"
            sx={{ mr: 2 }}
            onClick={openCategory}
          >
            <CreateNewFolderIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Notifications />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <TrendingUpIcon />
            <Typography>5</Typography>
          </IconButton>
        </StyledGrid>
      </StyledToolbar>
    </AppBar>
  );
}
