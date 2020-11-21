import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import clsx from "clsx";
import BestSellingProducts from "./common/BestSellingProducts";
import RevenueAndExpenditure from "./common/RevenueAndExpenditure";

const useStyles = makeStyles((theme) => ({
  leftSide: {
    width: "calc(100% - 400px)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  rightSide: {
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  label: {
    color: `#18202c !important `,
    fontWeight: 500,
    fontSize: 20,
    "&:focus:not($disabled)": {
      color: blueGrey[500],
    },
    "&.MuiInputLabel-shrink": {
      transform: "scale(1)",
    },
  },
}));

const Statistics = (props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item className={clsx(classes.root, classes.leftSide)}>
        <RevenueAndExpenditure />
      </Grid>
      <Grid item className={clsx(classes.root, classes.rightSide)}>
        <BestSellingProducts
          classes={{
            label: classes.label,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Statistics;
