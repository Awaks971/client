import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 420,
    padding: 24
  }
}));
function ButtonDrawer({
  label,
  component,
  children,
  icon,
  buttonStyles,
  variant,
  keepDrawerMounted = true,
  ...rest
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  return (
    <>
      {(component &&
        component({ onClick: e => setAnchorEl(e.currentTarget) })) || (
        <Button
          {...rest}
          variant={variant || "outlined"}
          style={buttonStyles}
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          {icon}
          {label}
        </Button>
      )}
      <Drawer
        variant="temporary"
        anchor="right"
        ModalProps={{
          keepMounted: keepDrawerMounted // Better open performance on mobile.
        }}
        classes={{
          paper: classes.drawerPaper
        }}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {typeof children === "function"
          ? children({ onClose: e => setAnchorEl(null) })
          : children}
      </Drawer>
    </>
  );
}

ButtonDrawer.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element
};

export default ButtonDrawer;
