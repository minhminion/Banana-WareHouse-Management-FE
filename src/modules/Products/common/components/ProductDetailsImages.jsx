import React, { useState, useCallback } from "react";
import {
  Box,
  Paper,
  InputLabel,
  IconButton,
  Button,
  makeStyles,
  Dialog,
  DialogContent,
  Badge,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";

const useStyles = makeStyles((theme) => ({
  moreImage: {
    position: "absolute",
    color: "white",
    width: "100%",
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.action.active,
    "&:hover": {
      backgroundColor: theme.palette.action.active,
    },
  },
  iconButtonDelete: {
    "& .MuiBadge-badge": {
      top: 10,
      right: 24,
    },
    "& .MuiIconButton-sizeSmall": {
      backgroundColor: theme.palette.background.paper,
      border: theme.border[0],
    },
  },
}));

const MAX_FILE_SIZE = 10; //Mb
const ProductDetailsImages = ({
  classes: classesStyle,
  isEdit,
  onChange,
  value: files,
}) => {
  const classes = useStyles();
  // const [files, setFiles] = useState([]);
  const [selectFile, setSelectFile] = useState();
  const [openShowAllFiles, setOpenShowAllFiles] = useState();
  const { enqueueSnackbar } = useSnackbar();

  // Show image on dialog
  const handleOpenShowFile = (fileURL) => {
    console.log("======== Bao Minh: handleOpenShowFile -> fileURL", fileURL);
    setSelectFile(fileURL);
  };
  // Close dialog
  const handleCloseShowFile = () => {
    setSelectFile();
  };
  // Show all image on dialog
  const handleOpenShowAllFiles = () => {
    setOpenShowAllFiles(true);
  };
  // Close dialog
  const handleCloseShowAllFiles = () => {
    setOpenShowAllFiles(false);
  };
  // ================= File extension =================
  // Get file extension helloWorld.jgp => jpg
  const getFileExtension = (file) => {
    const extension = file.name.split(".");
    return extension[file.name.split(".").length - 1].toLowerCase();
  };
  // File => Object { id, src, name, type, extension, file }
  const formatFileToObj = useCallback((file) => {
    const src = URL.createObjectURL(file);
    const extension = getFileExtension(file);
    const newFile = {
      id: src.split("/")[src.split("/").length - 1],
      src: src,
      name: file.name,
      type: file.type,
      extension: extension,
      file: file,
    };
    return newFile;
  }, []);
  // Check validate file type, size
  const validateFile = useCallback(
    (file) => {
      const validExtension = ["jpg", "jpeg", "bmp", "gif", "png"];
      const fileSize = Math.floor(file.size / Math.pow(1024, 2));
      const extension = getFileExtension(file);
      if (fileSize > MAX_FILE_SIZE) {
        enqueueSnackbar(`Dung lượng mỗi file tối đa là ${MAX_FILE_SIZE}MB`, {
          variant: "error",
        });
        return false;
      }

      if (!validExtension.find((value) => value === extension)) {
        enqueueSnackbar("Định dạng file không hợp lên", { variant: "error" });
        return false;
      }

      return true;
    },
    [enqueueSnackbar]
  );
  // Add file to state
  const handleAddFile = (e) => {
    const listFiles = e.target.files;
    let updateFiles = [];
    if (listFiles && listFiles.length > 0) {
      [...listFiles].forEach((file) => {
        if (validateFile(file)) updateFiles.push(formatFileToObj(file));
      });
      onChange({
        target: {
          name: "images",
          value: [...files, ...updateFiles],
        },
      });
      // setFiles((prev) => [...prev, ...updateFiles]);
    }
    e.target.value = "";
  };
  // Delete file on state
  const handleDeleteFile = (fileId) => {
    const newValue = files.filter((file) => file.id !== fileId);
    onChange({
      target: {
        name: "images",
        value: [...newValue],
      },
    });
    // setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };
  // Open input file
  const handleSelectFile = () => {
    const input = document.getElementById("input-files");
    if (input) input.click();
  };

  const renderAttachment = (file) => {
    return (
      <Box clone>
        <Button
          onClick={() => handleOpenShowFile(file.src)}
          component={Paper}
          style={{
            marginRight: 16,
            marginBottom: 16,
            width: 100,
            height: 100,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          }}
        >
          <img src={file.src} alt={file.name} style={{ width: "110%" }} />
        </Button>
      </Box>
    );
  };
  const renderImage = (file) => {
    if (isEdit) {
      return (
        <Badge
          className={classes.iconButtonDelete}
          key={file.id}
          component="div"
          badgeContent={
            <IconButton size="small" onClick={() => handleDeleteFile(file.id)}>
              <ClearSharpIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {renderAttachment(file)}
        </Badge>
      );
    }
    return <Box clone>{renderAttachment(file)}</Box>;
  };

  return (
    <Box className={classesStyle.productDescription} style={{ height: 150 }}>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/gif, image/bmp"
        hidden
        id="input-files"
        multiple
        onChange={handleAddFile}
      />
      <div
        style={{
          marginBottom: isEdit ? 8 : 16,
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputLabel className={classesStyle.label} style={{ marginRight: 16 }}>
          Hình ảnh
        </InputLabel>
        {isEdit && (
          <IconButton className={classesStyle.label} onClick={handleSelectFile}>
            <AddPhotoAlternateIcon />
          </IconButton>
        )}
      </div>
      <Box display="flex">
        {files.length < 7 ? (
          files.map((file) => renderImage(file))
        ) : (
          <>
            {files.slice(0, 5).map((file) => renderImage(file))}
            <Box
              component={Paper}
              style={{
                marginRight: 16,
                width: 100,
                height: 100,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Button
                className={classes.moreImage}
                onClick={handleOpenShowAllFiles}
              >
                + {files.length - 6}
              </Button>
              <img
                src={files[6].src}
                alt={files[6].id}
                style={{ width: "110%" }}
              />
            </Box>
          </>
        )}
      </Box>
      {/* Dialogs */}
      <Dialog
        open={selectFile && selectFile.length > 0 ? true : false}
        onClose={handleCloseShowFile}
        scroll="body"
        fullWidth={false}
      >
        <img
          src={selectFile}
          alt={selectFile}
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        />
      </Dialog>
      <Dialog
        open={files.length > 6 && openShowAllFiles}
        onClose={handleCloseShowAllFiles}
        scroll="body"
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent
          style={{ display: "flex", flexWrap: "wrap", width: 512 }}
        >
          {files.map((file) => renderImage(file))}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductDetailsImages;
