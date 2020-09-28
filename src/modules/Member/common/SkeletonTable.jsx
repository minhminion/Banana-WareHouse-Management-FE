import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { TableBody, TableRow, TableCell } from "@material-ui/core";

const SkeletonTable = () => {
  return (
    <TableBody>
      {[1, 2, 3, 4, 5].map((item) => (
        <TableRow
          hover
          onClick={(event) => console.log("Clicked Row")}
          role="checkbox"
          tabIndex={-1}
          key={item}
        >
          <TableCell padding="checkbox"></TableCell>
          <TableCell component="th" scope="row" padding="none">
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SkeletonTable;
