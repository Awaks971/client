import { useState } from "react";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

function useNotification({ message, severity = "success" }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Notification = (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={6000}
      onClose={handleClose}
    />
  );

  return [handleOpen, Notification];
}

export default useNotification;
