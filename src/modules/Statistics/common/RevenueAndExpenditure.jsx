import React, { useEffect, useMemo } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import { Box, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import handler from "../constants/handler";
import { MODULE_NAME } from "../constants/models";
import { formatNumberToVND } from "../../../common/helper";

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: ({ bgColor = "primary.main", offset = "-40px", ...styles }) => ({
    backgroundColor: "rgb(63, 81, 181)",
    borderRadius: spacing(2),
    // margin: `${offset} auto 0`,
    width: "calc(50% - 8px)",
    ...styles,
  }),
  title: {
    color: palette.common.white,
    fontWeight: "bold",
  },
  subheader: {
    color: "rgba(255, 255, 255, 0.76)",
  },
}));

const target = "revenueAndExpenditure";

const RevenueAndExpenditure = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { getRevenueAndExpenditure } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const { data, isLoading } = useSelector(
    (state) => state[MODULE_NAME][target]
  );
  console.log("======== Bao Minh: RevenueAndExpenditure -> data", data);

  useEffect(() => {
    getRevenueAndExpenditure({
      fromDate: new Date(0, 0, 0),
      toDate: new Date(),
    });
  }, []);

  return (
    <Box display="flex" justifyContent="space-between">
      <CardHeader
        classes={classes}
        title={`${formatNumberToVND(data?.revenue || 0)}đ`}
        subheader="Doanh thu"
      />
      <CardHeader
        classes={classes}
        title={`${formatNumberToVND(data?.expediture || 0)}đ`}
        subheader="Chi tiêu"
      />
    </Box>
  );
};

export default RevenueAndExpenditure;
