import { useUser } from "context/userContext";
import React, { useState } from "react";
import Props from "./Props";
import { Box } from "@mui/material";
import Body from "./Body";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import CategoryForm from "./CategoryForm";
import ActivityForm from "./ActivityForm";
import { ToastContainer } from "react-toastify";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import googleSignIn from "./googleSignIn";
import CategoriesProvider from "context/categoryContext";
import ActivitiesProvider from "context/activityContext";

export default function Layout(props: Props) {
  const {
    user: { uid },
    loading,
  } = useUser();
  const { window, children, path } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (loading) return <div>app is loading</div>;
  if (uid)
    return (
      <CategoriesProvider>
        <ActivitiesProvider>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Box sx={{ display: "flex" }}>
              <TopBar
                handleDrawerToggle={handleDrawerToggle}
                openCategory={() => setCategoryOpen(true)}
                openActivity={() => setActivityOpen(true)}
              />
              <SideBar
                path={path}
                container={container}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
              />
              <Body>
                {categoryOpen && (
                  <CategoryForm closeForm={() => setCategoryOpen(false)} />
                )}
                {activityOpen && (
                  <ActivityForm closeForm={() => setActivityOpen(false)} />
                )}
                <Box>{children}</Box>
                <ToastContainer />
              </Body>
            </Box>
          </LocalizationProvider>
        </ActivitiesProvider>
      </CategoriesProvider>
    );
  return <div onClick={googleSignIn}>Log in</div>;
}
