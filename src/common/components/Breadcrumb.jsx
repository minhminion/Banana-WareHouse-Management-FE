import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, useHistory } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Box, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(3),
  },
}));

const CustomBreadcrumbs = (props) => {
  const { title = "Breadcrumbs", root, disableGoBack = false } = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!disableGoBack && (
        <Box mr={2} clone>
          <IconButton onClick={() => history.go(-1)}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
      )}
      <Typography component="span" color="textPrimary" variant="h6">
        {title}
      </Typography>
      <Typography
        component="span"
        color="textPrimary"
        variant="h6"
        style={{ margin: "0px 8px" }}
      >
        |
      </Typography>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" component={RouterLink} to="/">
          Thống kê
        </Link>
        {root &&
          root.map((item) => (
            <Link
              key={item.link}
              color="inherit"
              component={RouterLink}
              to={item.link}
            >
              {item.title}
            </Link>
          ))}
        <Typography color="inherit">{title}</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default CustomBreadcrumbs;
