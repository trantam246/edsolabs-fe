import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  FormControlLabel,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { useGlobalContext } from "../ContextProvider";

export default function TagsMenu(props) {
  const { tags } = useGlobalContext();
  const { curTags, onTagChange } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <LocalOfferIcon />
      </IconButton>
      <Menu
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        MenuListProps={{}}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {tags.map((tag) => {
          return (
            <MenuItem key={tag.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      curTags.find((item) => item === tag.id) ? true : false
                    }
                    onChange={() => {
                      onTagChange(tag.id);
                    }}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={tag.name}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
