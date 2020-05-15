import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  buttonLoading: {
    backgroundColor: green[500]
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

function LoadingButton({
  loading,
  success,
  children,
  type,
  disabled,
  ...rest
}) {
  const classes = useStyles();

  const styles = {
    loading: classes.buttonLoading,
    success: classes.buttonSuccess
  };

  return (
    <div className={classes.wrapper}>
      <Button
        variant="outlined"
        color="primary"
        type={type}
        className={styles[loading || success]}
        disabled={disabled || loading}
        {...(rest.onClick ? { onClick: e => rest.onClick(e) } : {})}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
}

LoadingButton.propTypes = {
  success: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default LoadingButton;
