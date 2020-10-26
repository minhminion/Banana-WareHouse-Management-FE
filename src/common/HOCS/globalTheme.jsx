import { createMuiTheme } from "@material-ui/core";

let theme = createMuiTheme({
  palette: {
    primary: {
      // light: "#63ccff",
      // main: "#009be5",
      // dark: "#006db3",
      light: "#FADA5e",
      main: "#FFD300",
      dark: "#F9A602",
    },
    background: {
      default: "#fffff",
    },
  },
  border: ["1px solid rgba(0,0,0,.1)"],
  boxShadows: {
    main: "0 4px 10px 0 rgba(20,19,34,.03), 0 0 10px 0 rgba(20,19,34,.02)",
    inset:
      "inset 0 4px 10px 0 rgba(20,19,34,.03), inset 0 0 10px 0 rgba(20,19,34,.02)",
    // inset: "inset 35px 35px 33px #f7f7f7, inset -35px -35px 33px #ffffff",
    // hover: "0 4px 17px 0 rgba(20,19,34,.1), 0 0 17px 0 rgba(20,19,34,.09)",
    hover:
      "rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px",
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: `${theme.boxShadows.main} !important`,
      },
      root: {
        border: theme.border[0],
        boxShadow: theme.boxShadows.main,
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

export default theme;
