import React, { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import taskApi from "../../api/taskApi"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  actions__list: {
    position: "absolute !important",
    top: "100%",
    right: "3rem",
    background: "white",
    zIndex: 2,
    boxShadow: "rgb(100 100 111 / 40%) 0 0.7rem 2.9rem 0",
    [`& ul`]: {
      padding: 0,
    },
    [`& li`]: {
      fontSize: "1.6rem",
    },
  },
  dialog: {
    [`& p`]: {
      fontSize: "1.4rem",
    },
  },
  dialog__title: {
    textAlign: "center",
  },
}))
const Actions = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
const [tasks, setTasks] = useState(props.tasks)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  // const [tasks, setTasks] = useState(props.tasks)

  const handleClickOpen = () => {
    setOpen(true)
  }

  // const fetchTask = () => {
  //   try {
  //     taskApi.getTask().then((res) => {
  //       setId(res.length)
  //     })
  //   } catch (error) {
  //     throw error
  //   }
  // }
  const deleteTask = async (id) => {
    try {
      await taskApi.deleteTask(id)
    } catch (error) {
      throw error
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    setOpen(false)
    deleteTask(props.id)
    const newTasks = tasks.filter((task) => task.id !== props.id)
    setTasks(newTasks)
    props.onDeleted(newTasks)
    props.tasks?.splice(props.id - 1, 1)
    // fetchTask()
  }

  return (
    <MenuList className={classes.actions__list}>
      <MenuItem>{props.status === 1 ? "Start" : "Stop"}</MenuItem>
      <MenuItem onClick={handleClickOpen}>Delete</MenuItem>
      {open && (
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            className={classes.dialog}
          >
            <DialogTitle
              id="responsive-dialog-title"
              className={classes.dialog__title}
            >
              {"Confirmation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure to delete this item?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                No
              </Button>
              <Button onClick={handleDelete} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </MenuList>
  )
}
export default Actions
