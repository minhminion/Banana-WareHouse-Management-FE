import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";

import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { formatNumberToVND } from "../../../../common/helper";
import { useHistory } from "react-router-dom";
import { MODULE_NAME as MODULE_PRODUCTS } from "../../../Products/constants/models";

const useStyles = makeStyles(({ palette }) => ({
  avatar: {
    backgroundColor: palette.primary.main,
  },
  action: {
    marginLeft: 8,
  },
}));

const BestSellingProductsItem = (props) => {
  const history = useHistory();

  const {
    product: {
      productSKU,
      numberOfProducts,
      productId,
      productName,
      totalPrice,
      totalQuantitySold,
    },
  } = props;

  const classes = useStyles();

  return (
    <CardHeader
      classes={{
        action: classes.action,
      }}
      avatar={
        <img
          alt=""
          src={
            process.env.PUBLIC_URL +
            "/images/products/delicious-banana-blue-background.jpg"
          }
          style={{
            width: 48,
            borderRadius: 8,
          }}
        />
      }
      action={
        <IconButton
          aria-label="goto-products"
          onClick={() => history.push(`/${MODULE_PRODUCTS}/${productSKU}`)}
        >
          <ArrowForwardIcon />
        </IconButton>
      }
      title={
        <span>
          <strong>
            {productName} - #{productId}
          </strong>
        </span>
      }
      subheader={
        <span>
          Số lượng đã bán: {totalQuantitySold} <br />
          Tổng tiền: {formatNumberToVND(totalPrice)}đ
        </span>
      }
    />
  );
};

export default BestSellingProductsItem;
