import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import Toolbar from "@mui/material/Toolbar";
import Link from "components/Link";
import TodayIcon from "@mui/icons-material/Today";
import CategoryIcon from "@mui/icons-material/Category";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Typography } from "@mui/material";
import { Feedback, Help } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import logOut from "services/logOut";

const DrawerItem = ({
  icon,
  path,
  text,
  selected,
}: {
  icon: any;
  path: string;
  text: string;
  selected: boolean;
}) => (
  <Link href={path} sx={{ textDecoration: "none" }}>
    <ListItem button selected={selected}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </Link>
);
export default function DrawerList({ selected }: { selected: string }) {
  return (
    <div>
      <Toolbar variant="dense">
        <Typography>Quotiday</Typography>
      </Toolbar>
      <Divider />
      <DrawerItem
        icon={<TodayIcon />}
        path="/"
        text="Today"
        selected={selected === "today"}
      />
      <DrawerItem
        icon={<CategoryIcon />}
        path="/categories"
        text="Categories"
        selected={selected === "categories"}
      />
      <DrawerItem
        icon={<ViewListIcon />}
        path="/activities"
        text="Activities"
        selected={selected === "activities"}
      />
      <Divider />
      <DrawerItem
        icon={<SettingsIcon />}
        path="/settings"
        text="Settings"
        selected={selected === "settings"}
      />
      <DrawerItem
        icon={<Help />}
        path="/help"
        text="Help"
        selected={selected === "help"}
      />
      <DrawerItem
        icon={<Feedback />}
        path="/feedback"
        text="Feedback"
        selected={selected === "feedback"}
      />
      <ListItem button onClick={logOut}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItem>
    </div>
  );
}
