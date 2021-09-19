import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import dataFunction from '../func/dataFunction';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { Chart } from './barChart';
const useStyles = makeStyles((theme) => ({
  modGrid: {
    backgroundColor: 'none',
    alignItems: 'center'
  },
  btnPos: {
    textAlign: 'end'
  }
}));

export const ReportPage = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //-------------
  return (
    <React.Fragment>
       <Grid container spacing={4}>
        <Grid item xs={6} className={classes.modGrid}>
          <Typography variant="h4">
              This week:
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
          <MenuItem onClick={handleClose} label="Today">
          </MenuItem>
          <MenuItem onClick={handleClose}>Yesterday</MenuItem>
          <MenuItem onClick={handleClose}>This week</MenuItem>
          <MenuItem onClick={handleClose}>Last week</MenuItem>
          <MenuItem onClick={handleClose}>This month</MenuItem>
          <MenuItem onClick={handleClose}>Last month</MenuItem>
          <MenuItem onClick={handleClose}>Date range</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Chart/>
    </React.Fragment>
  )
}
