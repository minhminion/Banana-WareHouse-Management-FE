import { Box, CircularProgress, InputLabel, Paper } from "@material-ui/core";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import handler from "../constants/handler";
import { MODULE_NAME } from "../constants/models";
import BestSellingProductsItem from "./components/BestSellingProductsItem";

const target = "bestSellingProducts";

const BestSellingProducts = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();

  const { getBestSellingProduct } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const { data, isLoading } = useSelector(
    (state) => state[MODULE_NAME][target]
  );

  useEffect(() => {
    getBestSellingProduct({
      fromDate: new Date(0, 0, 0),
      toDate: new Date(),
    });
  }, []);

  return (
    <Box component={Paper} p={2}>
      <InputLabel className={classes.label} style={{ marginBottom: 8 }}>
        Top 10 sản phẩm bán nhiều nhất
      </InputLabel>
      <Box
        style={{ minHeight: "100vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {!isLoading && data?.length > 0 ? (
          <div style={{ width: "100%" }}>
            {data.map((product) => (
              <BestSellingProductsItem
                key={product.productId}
                product={product}
              />
            ))}
          </div>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
};

export default BestSellingProducts;
