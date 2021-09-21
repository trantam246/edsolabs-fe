import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
  } from "@material-ui/core";
  import LocalOfferIcon from "@mui/icons-material/LocalOffer";
  import { useTagContext } from "../contexts/TagContext";
  import React, { useState } from "react";
  
  const Tag = ({ getTagsDoing }) => {
    const { tags } = useTagContext();
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const [checked, setChecked] = useState([]);
  
    const handleClose = () => {
      setAnchorEl(null);
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
        <IconButton color="primary" onClick={handleClick}>
          <LocalOfferIcon />
        </IconButton>
  
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
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
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