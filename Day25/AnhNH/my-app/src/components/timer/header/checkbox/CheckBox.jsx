import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FaTags } from "react-icons/fa";

export default function CheckBox(props) {
  const listTags = props.tags
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({
    Online: false,
    Meeting: false,
    Training: false,
    Coding: false
  });
  const handlePushTag=()=>{
    let arrDataTag = []
    let a = [Object.entries(state)]
    a.map(tag => {
      tag.map(el => {
        if (el[1]) {
          arrDataTag.push(el[0])
        }
      })
    })
    props.takeDateHeaderTag(arrDataTag)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    handlePushTag()
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    handlePushTag()
  };


  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FaTags size="36" color="black"></FaTags>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <FormGroup>
          {listTags.map((item) => {
            return <FormControlLabel key={item.id}
              control={
                <Checkbox
                  checked={state[item.name]}
                  onChange={handleChange}
                  name={item.name}
                  color="primary"
                />
              }
              label={item.name}
            />
          })}
        </FormGroup>
      </Menu>
    </div>
  );
}
