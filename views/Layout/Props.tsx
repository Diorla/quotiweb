import { BoxProps } from "@mui/system";

export default interface Props extends BoxProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  path: string;
}
