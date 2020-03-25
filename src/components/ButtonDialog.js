import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { DialogContent } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ButtonDialog({
  children,
  buttonTitle,
  buttonComponent,
  onSubmit,
  isOpen = x => x
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    isOpen(open);
  }, [open]);

  return (
    <div>
      {buttonComponent ? (
        buttonComponent({ onClick: () => handleClickOpen() })
      ) : (
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          {buttonTitle && buttonTitle}
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent>
          {typeof children === "function"
            ? children({ onClose: () => handleClose() })
            : children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
