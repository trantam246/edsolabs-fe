import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FaTags } from 'react-icons/fa';
import useStyles from './styleofTimer';

export default function Tags(props) {
  const classes = useStyles();
  const [listTags, setListTags] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getTags = (item) => {
    props.valueTags(item);
  };
  const url = process.env.REACT_APP_URL;
  useEffect(() => {
    fetch(`${url}tags`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        setListTags(result);
      });
  }, []);

  const renderTag = listTags.map((item, index) => {
    return (
      <MenuItem
        key={item.id}
        className={classes.listoption}
        onClick={handleClose}
      >
        <div className={classes.tagspickbox} onClick={() => getTags(item.id)}>
          <div className={classes.tagspick}>{item.name}</div>
        </div>
      </MenuItem>
    );
  });

  return (
    <div>
      <Button
        className={classes.icon}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FaTags />
      </Button>
      <Menu
        className={classes.menu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderTag}
      </Menu>
    </div>
  );
}
