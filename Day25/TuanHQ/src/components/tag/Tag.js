import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
} from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { useTagContext } from 'contexts/TagContext';
import { useTaskContext } from 'contexts/TaskContext';
import React, { useEffect, useState } from 'react';

const Tag = ({ getTagsDoing, tagsDoing }) => {
  const { playing } = useTaskContext();

  // tag lất từ db
  const { tags } = useTagContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [checked, setChecked] = useState([]);

  // useEffect(() => {
  //   console.log(checked);
  // }, [tagsDoing]);

  const handleClose = () => {
    setAnchorEl(null);
    // Khi thoát khỏi chọn tag
    getTagsDoing(checked);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        onClick={handleClick}
      >
        <LocalOfferIcon />
      </IconButton>

      {/* list tag */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
          {tags.map((value, index) => {
            const labelId = `checkbox-list-label-${value.id}`;
            return (
              <ListItem
                key={index}
                role={undefined}
                dense
                button
                disabled={playing}
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItem>
            );
          })}
        </List>
      </Menu>
    </div>
  );
};

export default Tag;
