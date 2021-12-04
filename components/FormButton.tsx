import { Button, Grid } from "@mui/material";

export default function FormButton({
  accept,
  cancel,
}: {
  accept: () => void;
  cancel: () => void;
}) {
  return (
    <Grid
      sx={{
        alignItems: "flex-end",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Button
        variant="contained"
        color="success"
        disableElevation
        sx={{ mr: 4 }}
        size="small"
        onClick={accept}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="inherit"
        disableElevation
        sx={{ mr: 4 }}
        size="small"
        onClick={cancel}
      >
        Cancel
      </Button>
    </Grid>
  );
}
