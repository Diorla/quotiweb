import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/lab";
import { CssBaseline } from "@mui/material";
import ActivitiesProvider from "./context/activityContext";
import CategoriesProvider from "./context/categoryContext";
import UserProvider from "./context/userContext";
import DateAdapter from "@mui/lab/AdapterDayjs";
import theme from "./src/styles/theme";

const AllTheProviders: FC = ({ children }) => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <CategoriesProvider>
          <ActivitiesProvider>
            <LocalizationProvider dateAdapter={DateAdapter}>
              {children}
            </LocalizationProvider>
          </ActivitiesProvider>
        </CategoriesProvider>
      </ThemeProvider>
    </UserProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
