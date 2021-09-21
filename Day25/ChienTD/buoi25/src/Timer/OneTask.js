import React, { useContext, useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Box } from "@mui/system";
import ListIcon from "@mui/icons-material/List";
import { DataContext } from "../context/dataContent";
import moment from "moment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TasksApi from "../API/tasksApi";


const OneTask = (props) => {
  const {getReload} = useContext(DataContext);
  const { valueTask } = props;
  const dataComon = useContext(DataContext);
  const { listTags } = dataComon;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setOpen(false);
    const fetchDeleteTask = async () => {
      try {
        await TasksApi.deleteTask(valueTask.id);
        getReload();
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeleteTask();
  };
  return (
    <Box
      display="flex"
      width="100%"
      bgcolor="lightgray"
      border={1}
      alignItems="center"
      p={1}
    >
      <Box component="h4" m={0} width="55%" textAlign="left">
        {valueTask.description}
      </Box>
      <Box display="flex" width="20%">
        <LocalOfferIcon />
        <Box component="h5" m={0} display="flex" alignItems="center">
          {valueTask.tags.map((x) => {
            return listTags.map((o) => {
              if (x == o.id) {
                return (
                  <Box component="span" key={o.id}>
                    {" "}
                    {o.name},{" "}
                  </Box>
                );
              }
            });
          })}
        </Box>
      </Box>
      <Box component="h5" m={0} width="15%" textAlign="left" display="flex">
        <Box m={0}>{moment(valueTask.start_time).format("HH:mm")}</Box>
        <Box> &nbsp; - &nbsp;</Box>
        <Box m={0}>
          {valueTask.end_time
            ? moment(valueTask.end_time).format("HH:mm")
            : "--:--"}
        </Box>
      </Box>
      <Box component="h5" m={0} width="5%" textAlign="left">
        {valueTask.time_spent}
      </Box>
      <Box component="h5" m={0} width="5%" textAlign="right">
        <ListIcon onClick={handleClickOpen} />
        <Dialog
          open={open}
          onClose={handleNo}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn chắc chắn muốn xóa task này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNo}>Không</Button>
            <Button onClick={handleYes} autoFocus>
              Có
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default OneTask;
