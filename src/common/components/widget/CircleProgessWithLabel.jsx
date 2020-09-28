import React from "react";
import { CircularProgress, Box, Typography } from "@material-ui/core";

const CircularProgressWithLabel = (props) => {
  const { textColor, textStyle, value } = props;
  return (
    <Box position="relative" display="inline-flex">
      {typeof value === "number" ? (
        <>
          <CircularProgress variant="static" {...props} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              component="div"
              style={textStyle}
              color={textColor || "textSecondary"}
            >{`${Math.round(props.value)}%`}</Typography>
          </Box>{" "}
        </>
      ) : (
        <CircularProgress style={props.style} />
      )}
    </Box>
  );
};

export default CircularProgressWithLabel;
