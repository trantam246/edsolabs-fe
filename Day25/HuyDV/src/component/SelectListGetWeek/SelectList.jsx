import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
// import PropTypes from 'prop-types'
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Popper,
} from '@material-ui/core';
import { ButtonIcon, FlexDateRange } from './style';
import { IoMdArrowDropdown } from 'react-icons/io';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
  popper: {
    border: '1px solid #000',
    width: '132px',
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: '4px',
    paddingTop: '4px',
    '& .MuiTypography-body1': {
      fontSize: '16px',
    },
    '& .MuiListItem-root': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
}));

const SelectList = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorDR, setAnchorDR] = useState(null);
  const handleClickDR = (event) => {
    setAnchorDR(event.currentTarget);
  };
  const handleCloseDR = (event) => {
    setAnchorDR(null);
  };
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleGetSelecter = (value) => {
    props.handleChangeSelecter(value);
  };

  const handleChangeDateRanges = (value) => {
    props.handleChangeDateRange(value);
  };

  const openDateRange = Boolean(anchorDR);
  const idDR = openDateRange ? 'simple-popper' : undefined;
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <ButtonIcon onClick={handleClick}>
        {props.listSelect} <IoMdArrowDropdown />
      </ButtonIcon>
      <Popper
        className={classes.popper}
        id={id}
        open={open}
        anchorEl={anchorEl}
      >
        <List component="nav" className={classes.list} aria-label="contacts">
          {props.arrList.map((item, index) => {
            if (item === 'Date range') {
              return (
                <ListItem onClick={handleClickDR} button key={index + 1}>
                  {<ListItemText primary={item} />}
                </ListItem>
              );
            } else {
              return (
                <ListItem
                  onClick={() => {
                    handleClick();
                    handleGetSelecter(item);
                  }}
                  button
                  key={index + 1}
                >
                  {<ListItemText primary={item} />}
                </ListItem>
              );
            }
          })}
        </List>
      </Popper>
      <FlexDateRange>
        <Popover
          id={idDR}
          open={openDateRange}
          anchorEl={anchorDR}
          onClose={handleCloseDR}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <DateRange
            showDateDisplay={true}
            showSelectionPreview={true}
            editableDateInputs={true}
            onChange={(item) => handleChangeDateRanges([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={props.state}
          />
        </Popover>
      </FlexDateRange>
    </>
  );
};

export default SelectList;
