import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

const ConfirmationDialog = ({
  open,
  options,
  onCancel,
  onConfirm,
  onClose,
}) => {
  const {
    title,
    description,
    input,
    inputLabel,
    inputValue = "",
    inputMultiline = true,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  } = options;

  const inputRef = useRef(null);

  const handleOnEnter = (e) => {
    if (e.key === "Enter") {
      onConfirm(inputRef.current?.value);
    }
  };

  return (
    <Dialog fullWidth {...dialogProps} open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {(description || input) && (
        <DialogContent>
          {description && <DialogContentText>{description}</DialogContentText>}
          {input && (
            <TextField
              onKeyPress={handleOnEnter}
              autoFocus
              defaultValue={inputValue}
              inputRef={inputRef}
              style={{ width: "100%" }}
              label={inputLabel}
              multiline={inputMultiline}
              rows={4}
              variant="outlined"
            />
          )}
        </DialogContent>
      )}
      <DialogActions>
        <Button {...cancellationButtonProps} onClick={onCancel}>
          {cancellationText}
        </Button>
        <Button
          color="primary"
          {...confirmationButtonProps}
          onClick={() => onConfirm(inputRef.current?.value)}
        >
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
