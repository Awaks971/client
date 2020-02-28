import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#F79F66",
      main: "#ff6f00",
      contrastText: "#fff"
    },
    secondary: {
      light: "#0D7E83",
      main: "#076570",
      dark: "#064d55",
      contrastText: "#fff"
    }
  },
  mixins: {
    toolbar: {
      minHeight: 52
    }
  },
  typography: {
    fontFamily: "'Quicksand', sans-serif"
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: "0px 5px 10px -2px  #00000025"
      }
    },
    MuiListItem: {
      gutters: {
        paddingLeft: 24,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4
      }
    },
    MuiListItemText: {
      root: {
        fontSize: "0.875rem"
      }
    },
    MuiIconButton: {
      sizeSmall: {
        width: 38,
        height: 38
      }
    }
  }
});

export default theme;
