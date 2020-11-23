import React, { useMemo } from "react";
import {
  TableRow,
  TableCell,
  Box,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core";

import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import DeleteIcon from "@material-ui/icons/Delete";

import { Link, useHistory } from "react-router-dom";
import { MODULE_NAME as MODULE_AUTHOR } from "../../Author/constants/models";
import UserRole from "./components/UserRole";
import handler from "../constants/handler";
import { notifyError } from "../../../common/helper";
import { useSnackbar } from "notistack";
import useConfirm from "../../../common/hooks/useConfirm/useConfirm";
import { USER_ROLE } from "../../../common/constants/enums";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  chip: {
    width: 120,
    "&.new": {
      color: theme.palette.common.white,
      background: theme.palette.success.light,
    },
    "&.processing": {
      color: theme.palette.common.white,
      background: theme.palette.warning.main,
    },
    "&.done": {
      color: theme.palette.common.white,
      background: theme.palette.info.main,
    },
    "&.delete": {
      color: theme.palette.common.white,
      background: theme.palette.error.main,
    },
    "&.force__done": {
      color: theme.palette.common.white,
      background: "#b19cd9",
    },
  },
  expandTable: {
    "& tr": {
      boxShadow: "none !important",
    },
    "& th": {
      border: "none",
    },
    "& td": {
      border: "none",
    },
  },
  expandCell: {
    // padding: theme.spacing(2),
    transition: "0.3s padding ease-in",
    "&.collapsed": {
      padding: 0,
      border: "none",
    },
  },
}));

const ListUsersItem = (props) => {
  const { row, onCancel, refetch } = props;
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { updateUser, banUser, deleteUser } = useMemo(
    () => handler(dispatch, props),
    [dispatch, props]
  );
  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);
  const isAuth = [USER_ROLE.Boss, USER_ROLE.Admin].indexOf(roleName) !== -1;

  const handleChangeRoleName = async (e, row) => {
    const { name, value } = e.target;
    confirm({
      title: "Thay đổi quyền của user này ?",
      description: "Hành động này sẽ không thể hoàn tác",
      confirmationText: "Xác nhận",
      cancellationText: "Hủy",
    })
      .then(async () => {
        const result = await updateUser({
          ...row,
          userId: row.id,
          [name]: value,
        });
        if (result !== true) {
          notifyError(enqueueSnackbar, result);
        } else {
          refetch && refetch();
        }
      })
      .catch(() => {
        /* ... */
      });
  };

  const handleBanUser = async (row, status) => {
    confirm({
      title: "Bạn muốn chặn user này ?",
      description: "Hành động này sẽ không thể hoàn tác",
      confirmationText: "Xác nhận",
      cancellationText: "Hủy",
    })
      .then(async () => {
        const result = await banUser({
          userId: row.id,
          status: status,
        });
        if (result !== true) {
          notifyError(enqueueSnackbar, result);
        } else {
          refetch && refetch();
        }
      })
      .catch(() => {
        /* ... */
      });
  };

  const handleDeleteUser = async (row) => {
    confirm({
      title: "Bạn muốn xóa user này ?",
      description: "Hành động này sẽ không thể hoàn tác",
      confirmationText: "Xác nhận",
      cancellationText: "Hủy",
    })
      .then(async () => {
        const result = await deleteUser({
          userId: row.id,
        });
        if (result !== true) {
          notifyError(enqueueSnackbar, result);
        } else {
          refetch && refetch();
        }
      })
      .catch(() => {
        /* ... */
      });
  };

  const isAbleToDelete = (rowStatus) => {
    return isAuth;
  };
  const isAbleToBan = (rowStatus) => {
    return isAuth;
  };

  return (
    <TableRow style={{ marginBottom: 0 }}>
      <TableCell component="th" scope="row">
        <strong>{`${row.lastName} ${row.firstName}` || "Lưu Bảo Minh"}</strong>
      </TableCell>
      <TableCell align="left">{row.email}</TableCell>
      <TableCell align="left">
        <strong>{row.phoneNumber || "Không có"}</strong>
      </TableCell>
      <TableCell align="center">
        <UserRole
          value={row.roleName}
          onChange={(e) => handleChangeRoleName(e, row)}
        />
      </TableCell>
      {/* Action on row */}
      <TableCell align="center">
        {isAbleToBan() && (
          <Box clone>
            <Tooltip title="Chặn người dùng">
              <IconButton
                color="secondary"
                onClick={() => handleBanUser(row, !row.status)}
              >
                {row.status ? <LockOpenIcon /> : <LockIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {isAbleToDelete() && (
          <Box clone>
            <Tooltip title="Xóa người dùng">
              <IconButton
                color="secondary"
                onClick={() => handleDeleteUser(row)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ListUsersItem;
