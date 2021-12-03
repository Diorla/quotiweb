import { useUser } from "context/userContext";
import React, { useState } from "react";
import Props from "./Props";
import { Box } from "@mui/material";
import Body from "./Body";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default function Layout(props: Props) {
  const {
    user: { uid },
  } = useUser();
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (uid)
    return (
      <Box sx={{ display: "flex" }}>
        <TopBar
          handleDrawerToggle={handleDrawerToggle}
          openCategory={() => setCategoryOpen(true)}
          openActivity={() => setActivityOpen(true)}
        />
        <SideBar
          container={container}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Body>
          {categoryOpen && <div>Category open</div>}
          {activityOpen && <div>Activity open</div>}
          <Box>{children}</Box>
        </Body>
      </Box>
    );
  return <div>Log in</div>;
}
