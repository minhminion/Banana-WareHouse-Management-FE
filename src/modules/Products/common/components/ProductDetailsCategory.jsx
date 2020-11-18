import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  makeStyles,
  InputLabel,
  Menu,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AddIcon from "@material-ui/icons/Add";
import useConfirm from "../../../../common/hooks/useConfirm/useConfirm";
import { useDispatch } from "react-redux";
import handler from "../../constants/handler";
import { notifyError } from "../../../../common/helper";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: 300,
    background: "white",
    border: "1px solid rgba(0,0,0,.1)",
    borderRadius: 8,
    padding: theme.spacing(1.5),
    boxShadow: theme.boxShadows.main,
    "&:focus": {
      borderRadius: 8,
      background: "white",
    },
  },
  icon: {
    right: 12,
    position: "absolute",
    userSelect: "none",
    pointerEvents: "none",
  },
}));

const ProductDetailsCategory = (props) => {
  const { classes: classesStyle, isEdit, style, value, onChange } = props;
  const selectRef = useRef(null);
  const classes = useStyles();
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [contextPos, setContextPos] = useState({
    category: null,
    mouseX: null,
    mouseY: null,
  });
  const [categories, setCategories] = useState();

  const {
    getProductCategories,
    addProductCategory,
    editProductCategory,
    deleteProductCategory,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  useEffect(() => {
    const fetchAllProductCategories = async () => {
      const result = await getProductCategories();
      if (result.data) {
        setCategories(result.data);
      }
    };
    fetchAllProductCategories();
  }, []);

  const menuProps = {
    classes: {
      paper: classes.paper,
      list: classes.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  const handleAddCategory = () => {
    confirm({
      title: "Tạo loại sản phẩm mới",
      confirmationText: "Tạo loại mới",
      cancellationText: "Hủy",
      input: true,
      inputLabel: "Tên loại sản phẩm",
      inputMultiline: false,
    })
      .then(async (inputValue) => {
        const result = await addProductCategory(inputValue);
        if (result.id) {
          enqueueSnackbar("Đã thêm loại sản phẩm mới", {
            variant: "success",
          });
          onChange({
            target: "productCategoryId",
            value: result.id,
          });
          setCategories((prev) => [result, ...prev]);
        } else {
          notifyError(enqueueSnackbar, result);
        }
      })
      .catch(() => {
        /* ... */
      });
  };

  const handleEditCategory = () => {
    if (!contextPos || !contextPos.category) return;
    confirm({
      title: "Chỉnh sủa loại sản phẩm",
      confirmationText: "Cập nhật",
      cancellationText: "Hủy",
      input: true,
      inputLabel: "Tên loại sản phẩm",
      inputValue: contextPos?.category?.name,
      inputMultiline: false,
    })
      .then(async (inputValue) => {
        const result = await editProductCategory({
          id: contextPos.category.id,
          name: inputValue,
        });
        if (result === true) {
          const index = categories?.indexOf(contextPos.category);
          let newCategories = categories;
          newCategories[index].name = inputValue;
          enqueueSnackbar("Đã sửa loại sản phẩm", {
            variant: "success",
          });
          setCategories(newCategories);
          onChange({
            target: "productCategoryId",
            value: contextPos.category.id,
          });
        } else {
          notifyError(enqueueSnackbar, result);
        }
      })
      .catch(() => {
        /* ... */
      });
  };

  const handleDeleteCategory = () => {
    confirm({
      title: "Xóa loại sản phẩm",
      confirmationText: "Xác nhận",
      cancellationText: "Hủy",
    }).then(async () => {
      const result = await deleteProductCategory(contextPos.category.id);
      if (result === true) {
        const newCategories = categories.filter(
          (category) => category.id !== contextPos.category.id
        );
        enqueueSnackbar("Đã xóa loại sản phẩm", {
          variant: "success",
        });
        if (contextPos.category.id === selectRef.current.value) {
          onChange({
            target: "productCategoryId",
            value: 2,
          });
        }
        setCategories(newCategories);
      } else {
        notifyError(enqueueSnackbar, result);
      }
    });

    handleCloseContext();
  };

  const handleClickContext = (e, category) => {
    e.preventDefault();
    setContextPos({
      category: category,
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
  };

  const handleCloseContext = () => {
    setContextPos({
      category: null,
      mouseX: null,
      mouseY: null,
    });
  };

  const renderMenuItem = (categories) => {
    return categories.map((item) => (
      <MenuItem
        component={ListItem}
        ContainerComponent="div"
        button
        key={item.id}
        value={item.id}
        onContextMenu={(e) => handleClickContext(e, item)}
        style={{
          justifyContent: "space-between",
          cursor: "context-menu",
        }}
      >
        {item.name}
        <ListItemSecondaryAction>
          <IconButton onClick={(e) => handleClickContext(e, item)}>
            <MoreHorizIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </MenuItem>
    ));
  };

  const iconSelectComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };

  return (
    <Box style={{ ...style }} className={classesStyle.productDescription}>
      <Menu
        style={{ zIndex: 9999 }}
        keepMounted
        open={contextPos.mouseY !== null}
        onClose={handleCloseContext}
        anchorReference="anchorPosition"
        anchorPosition={
          contextPos.mouseY !== null && contextPos.mouseX !== null
            ? { top: contextPos.mouseY, left: contextPos.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleDeleteCategory}>Xóa</MenuItem>
        <MenuItem onClick={handleEditCategory}>Chỉnh sửa</MenuItem>
      </Menu>
      <InputLabel className={classesStyle.label} style={{ marginBottom: 8 }}>
        Danh mục sản phẩm
        {isEdit && (
          <Box ml={1} clone>
            <IconButton size="small" onClick={handleAddCategory}>
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </InputLabel>
      <Select
        displayEmpty
        style={{ width: "100%" }}
        placeholder="Vui lòng chọn loại sản phẩm"
        inputRef={selectRef}
        disabled={!isEdit}
        disableUnderline
        name="productCategoryId"
        renderValue={(value) =>
          categories?.find((category) => category.id === value)?.name
        }
        classes={{ root: classes.select }}
        MenuProps={menuProps}
        IconComponent={iconSelectComponent}
        value={value}
        onChange={onChange}
      >
        {categories && renderMenuItem(categories)}
      </Select>
    </Box>
  );
};

export default ProductDetailsCategory;
