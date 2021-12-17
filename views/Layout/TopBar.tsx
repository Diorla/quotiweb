import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "../../constants/drawerWidth";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import { Home } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Link from "components/Link";

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
          <Box sx={{ display: { sm: "none" } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Link href="/" sx={{ color: "white" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Home />
            </IconButton>
          </Link>
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
            onClick={openCategory}
          >
            <CreateNewFolderIcon />
          </IconButton>
          {/* <IconButton
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
          </IconButton> */}
        </StyledGrid>
      </StyledToolbar>
    </AppBar>
  );
}
