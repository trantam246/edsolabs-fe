import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { useDeleteContext } from "../../pages/Timer";

export default function DeleteDialog(props) {
  const { open, setOpen, onDeleteTask } = useDeleteContext();

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    onDeleteTask();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete this item ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
