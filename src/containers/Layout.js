import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import PersonIcon from "@material-ui/icons/Person";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import CompaniesButtonMenu from "./CompaniesButtonMenu";

import { useMutation } from "@apollo/react-hooks";
import { LOCAL_LOGOUT } from "../apollo/user/mutations";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    boxShadow: "none"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    backgroundColor: "#f6f6f6",
    overflowY: "auto"
  },
  activeMenuItem: {
    "& div": {
      "& span": { fontWeight: 900, color: "#ff6f00" }
    }
  },
  menuItem: {
    "&:hover": {
      backgroundColor: "#ff6f0014"
    }
  }
}));

const roles = {
  client: [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Journal de caisses", path: "/cash-journals" },
    { label: "Statistiques", path: "/statistics" },
    { label: "Paramètres", path: "/settings" }
  ],
  admin: [
    { label: "Technicien", path: "/technician" },
    { label: "Utilisateurs", path: "/users" }
  ]
};

function ResponsiveDrawer({ children, container, context, role }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(null);
  const [logout] = useMutation(LOCAL_LOGOUT);

  useEffect(() => setAuth(context), [auth, context]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <div
        className={classes.toolbar}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ff6f00",
          fontWeight: 900
        }}
      >
        <Typography variant="h6" noWrap>
          AWAKS 360
        </Typography>
      </div>
      <Divider />
      <List>
        {roles[role].map(({ label, path }) => (
          <ListItem
            button
            key={label}
            component={NavLink}
            to={path}
            classes={{ button: classes.menuItem }}
            className={classes.menuItem}
            activeClassName={classes.activeMenuItem}
          >
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              {role !== "admin" && (
                <CompaniesButtonMenu
                  currentLoggedCompany={company => setAuth(company)}
                />
              )}
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                {role !== "admin" && (
                  <Grid item>
                    <IconButton size="small" color="inherit">
                      <PersonIcon />
                    </IconButton>
                  </Grid>
                )}
                <Grid item>
                  <IconButton
                    size="small"
                    onClick={() => logout()}
                    color="inherit"
                  >
                    <PowerSettingsNewIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {context && auth && context.token === auth.token ? children : "toto"}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  role: PropTypes.string.isRequired,
  context: PropTypes.shape({
    token: PropTypes.string.isRequired,
    loggedAs: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

export default ResponsiveDrawer;
