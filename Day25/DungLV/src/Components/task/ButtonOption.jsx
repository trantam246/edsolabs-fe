import { Box, makeStyles, Modal, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
const useStyles = makeStyles((theme) => ({
  boxOption: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  threedot: {
    marginBottom: 28,
    fontSize: 20,
  },
  titleDEL: {
    fontFamily: 'Glory',
    fontSize: 27,
    fontWeight: 600,
    textAlign: 'center',
    color: 'red',
    marginBottom: 30,
  },
  boxWarning: {
    display: 'flex',
    justifyContent: 'center',
  },
  no: {
    fontWeight: 600,
    fontSize: 20,
    padding: 20,
    color: 'blue',
  },
  yes: { fontWeight: 600, fontSize: 20, color: 'red' },
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '3px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 40,
};

export default function ButtonOption(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const getIdTaskDel = () => {
    setAnchorEl(null);
    setOpen(false);
    const _URL = process.env.REACT_APP_URL;
    fetch(`${_URL}tasks/` + props.valueTaskDel.id, {
      method: 'DELETE',
    }).then(() => {
      fetch(`${_URL}tasks`)
        .then((res) => res.json())
        .then((result) => props.reListDel(result));
    });
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.threedot}
      >
        <BsThreeDotsVertical />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.boxOption}>
          <Button className={classes.boxOption} onClick={handleClose}>
            Start
          </Button>
          <Button className={classes.boxOption} onClick={handleOpen}>
            Delete
          </Button>
        </div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-description"
              className={classes.titleDEL}
              sx={{ mt: 2 }}
            >
              Are you sure you want to delete the task?
            </Typography>
            <div className={classes.boxWarning}>
              <Button className={classes.yes} onClick={getIdTaskDel}>
                Yes
              </Button>
              <Button className={classes.no} onClick={handleClose}>
                No
              </Button>
            </div>
          </Box>
        </Modal>
        {/* </MenuItem> */}
      </Menu>
    </div>
  );
}
