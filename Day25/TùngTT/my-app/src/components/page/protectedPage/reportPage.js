import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import dataFunction from '../func/dataFunction';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DateFnsUtils from '@date-io/date-fns';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Chart } from './barChart';
const useStyles = makeStyles((theme) => ({
  modGrid: {
    backgroundColor: 'none',
    alignItems: 'center'
  },
  btnPos: {
    textAlign: 'end'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const ReportPage = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  
  useEffect(() => {
    retrieveTutorials();
  }, );
  const retrieveTutorials = () => {
    dataFunction.getAll()
      .then(response => {
        setData(response.data.reverse());
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  // Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPicker, setPicker] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handelClickDateRange = e => {
    setPicker(e.currentTarget);
  }
  const handleCloseDateRange = () => {
    setPicker(null)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  //-------------
  //Open Date Range
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
       <Grid container spacing={4}>
        <Grid item xs={6} className={classes.modGrid}>
          <Typography variant="h4">
              <Button>
                Click me
              </Button>
          </Typography>
        </Grid>
        <Grid item xs={6}  className={classes.modGrid} className={classes.btnPos}>
          <Button variant="contained" 
                  color="primary" 
                  aria-controls="simple-menu" 
                  aria-haspopup="true" 
                  onClick={handleClick}
                  endIcon={<ArrowDropDownIcon/>}>
            <Typography variant="h5">
              This week
            </Typography>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
          <MenuItem onClick={handleClose}>Today</MenuItem>
          <MenuItem onClick={handleClose}>Yesterday</MenuItem>
          <MenuItem onClick={handleClose}>This week</MenuItem>
          <MenuItem onClick={handleClose}>Last week</MenuItem>
          <MenuItem onClick={handleClose}>This month</MenuItem>
          <MenuItem onClick={handleClose}>Last month</MenuItem>
          <MenuItem onClick={handleOpenModal}>
            Date Range
          </MenuItem>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>
            <Fade in={open}>
              <div className={classes.paper}>
                <DateRange
                  editableDateInputs={true}
                  onChange={item => {
                    setState([item.selection])
                    console.log(state)
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  />
              </div>
            </Fade>
          </Modal>
          </Menu>
        </Grid>
      </Grid>
      <Chart/>
    </React.Fragment>
  )
}