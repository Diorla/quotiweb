import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Confirm({
  open,
  onCancel,
  onAccept,
  title,
  message,
  acceptTitle,
  cancelTitle,
}: {
  open: boolean;
  onCancel: () => void;
  onAccept: () => void;
  title: string;
  message: string;
  acceptTitle?: string;
  cancelTitle?: string;
}) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelTitle || "Cancel"}</Button>
        <Button onClick={onAccept} autoFocus>
          {acceptTitle || "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
