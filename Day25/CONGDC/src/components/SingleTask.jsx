import {
    Box,
    Button,
    Dialog,
    DialogActions,
    
    DialogTitle,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Typography,
  } from "@material-ui/core";
  import LocalOfferIcon from "@mui/icons-material/LocalOffer";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
  import { useTagContext } from "../contexts/TagContext";
  import { useTaskContext } from "../contexts/TaskContext";
  import moment from "moment";
  import React from "react";
  
  const SingleTask = ({ task }) => {
    const { tags, callSnackbar } = useTagContext();
    const { handleDeleteTask } = useTaskContext();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseAn = () => {
      setAnchorEl(null);
    };
  
    const handleClickOpen = () => {
      setOpenDialog(true);
    };
  
    const handleClose = () => {
      setOpenDialog(false);
    };
  
    const strTag = () => {
      const strTag = [];
      tags.map((tag_c) => {
        if (task.tags.includes(tag_c.id)) {
          strTag.push(tag_c.name);
        }
        return true;
      });
  
      return strTag.join(", ");
    };
  
    const deleteTask = () => {
      handleDeleteTask(task).then((res) => {
        if (res >= 200 && res < 400) {
          callSnackbar("Delete success!", "success");
          handleClose()
        } else {
          callSnackbar("Delete fail!", "error");
        }
      });
    };
  
    return (
      <Paper>
        <Box px={3} mb={2}>
          <Grid
            container
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <Box>{task.description}</Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <LocalOfferIcon color="primary" />
  
                <Typography variant="subtitle2" align="left" gutterBottom>
                  {strTag()}
                </Typography>
  
                <Typography variant="subtitle2" justifyContent="center">
                  {task.start_time ? moment(task.start_time).format("LT") : null}-{" "}
                  {task.end_time ? moment(task.endt_time).format("LT") : null}
                </Typography>
  
                <Typography variant="subtitle2" gutterBottom>
                  {task.time_spent
                    ? task.time_spent >= 60
                      ? `${Math.round(task.time_spent / 60)} min`
                      : `${0} min`
                    : null}
                </Typography>
  
                <Grid>
                  {/* <IconButton
                    aria-label="MoreVertIcon"
                    onClick={handleClickOpen}
                    aria-expanded={open ? "true" : undefined}
                  ></IconButton> */}
  
                  <IconButton
                    aria-label="MoreVertIcon"
                    onClick={handleClick}
                    aria-expanded={open ? "true" : undefined}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseAn}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClickOpen}>Delete</MenuItem>
                    <Dialog
                      open={openDialog}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure to delete the task ? "}
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={deleteTask} autoFocus>
                          YES
                        </Button>
                        <Button onClick={handleClose}>NO</Button>
                      </DialogActions>
                    </Dialog>
                  </Menu>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  };
  
  export default SingleTask;