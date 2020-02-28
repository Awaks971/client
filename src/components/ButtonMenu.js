import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

function ButtonMenu({
  label,
  component,
  children,
  icon,
  buttonStyles,
  ...rest
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  return (
    <>
      {(component &&
        component({ onClick: e => setAnchorEl(e.currentTarget) })) || (
        <Button
          {...rest}
          variant="outlined"
          style={buttonStyles}
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          {label}
          {icon}
        </Button>
      )}
      <Menu
        elevation={1}
        id="menu-appbar"
        anchorEl={anchorEl}
        style={{ marginTop: 30 }}
        keepMounted
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {typeof children === "function"
          ? children({ onClose: e => setAnchorEl(null) })
          : children}
      </Menu>
    </>
  );
}

ButtonMenu.propTypes = {
  label: PropTypes.string,
  component: PropTypes.element,
  icon: PropTypes.element
};

export default ButtonMenu;
