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

export default function FullScreenDialog({
  children,
  buttonTitle,
  buttonComponent,
  onSubmit,
  buttonAction,
  isOpen = x => x,
  title = "Impression des stats"
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
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              size="small"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            {buttonAction}
          </Toolbar>
        </AppBar>
        {typeof children === "function"
          ? children({ onClose: () => handleClose() })
          : children}
      </Dialog>
    </div>
  );
}
