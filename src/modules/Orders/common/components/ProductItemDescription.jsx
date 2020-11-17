import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useRef } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import Editor from "../../../../common/components/widget/Editor";
import parse from "html-react-parser";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .ck-editor": {
      boxShadow: theme.boxShadows.main,
    },
    "& .ck-toolbar": {
      border: theme.border[0],
      borderTopRightRadius: `${theme.spacing(1)}px !important`,
      borderTopLeftRadius: `${theme.spacing(1)}px !important`,
    },
    "& .ck-editor__editable.ck-editor__editable_inline": {
      borderBottomRightRadius: `${theme.spacing(1)}px !important`,
      borderBottomLeftRadius: `${theme.spacing(1)}px !important`,
      minHeight: 200,
      maxHeight: 300,
      "&:not(.ck-focused)": {
        border: theme.border[0],
      },
    },
    "& .product__description": {
      minHeight: 200,
      boxShadow: theme.boxShadows.inset,
      overflow: "auto",
      maxHeight: 300,
    },
  },
  pos: {
    marginBottom: 12,
  },
}));

const ProductItemDescription = ({
  onSubmit,
  onClose,
  isEdit = false,
  proposalProduct,
}) => {
  const { product = {} } = proposalProduct;
  const editorRef = useRef(null);
  const classes = useStyles();

  const handleSubmit = () => {
    if (editorRef.current && onSubmit) {
      const value = editorRef.current.getData();
      onSubmit(
        {
          target: {
            name: `description_${product.id}`,
            value: value,
          },
        },
        product.id
      );
      onClose && onClose();
    }
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={product && product.id ? true : false}
      onClose={onClose}
    >
      <DialogTitle>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Thông tin sản phẩm
        </Typography>
        <Typography variant="h6" component="p">
          {product.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Mã SKU: {product.sku}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.root}>
        <Typography className={classes.pos} color="textSecondary">
          Mô tả sản phẩm trong phiếu:
        </Typography>
        {isEdit ? (
          <CKEditor
            editor={Editor}
            data={proposalProduct.description || ""}
            onInit={(editor) => {
              editorRef.current = editor;
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        ) : (
          <Box p={2} className="product__description" component={Paper}>
            {parse(proposalProduct.description || "")}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {isEdit && (
          <>
            <Button onClick={handleSubmit} color="primary">
              Chọn
            </Button>
            <Button onClick={onClose} color="primary">
              Hủy
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProductItemDescription;
