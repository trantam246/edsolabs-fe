import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useStyles } from "./style";
import FormatTime from "./formatTime";
import { StyledMenu } from "../common/common";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTaskContext } from "../common/taskContext";

export default function HeaderTimer() {
  const classes = useStyles();
  const [anchorMenu, setanchorMenu] = useState(null);
  const {
    isActive,
    handleStart,
    handleReset,
    state,
    timer,
    setState,
    setDescription,
  } = useTaskContext();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClose = () => {
    setanchorMenu(null);
  };
  return (
    <header className={classes.header}>
      <InputBase
        className={classes.input}
        placeholder="What are you working on?"
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className={classes.countTimer}>
        <span>
          <LocalOfferIcon
            className={classes.selectTag}
            onClick={(e) => setanchorMenu(e.currentTarget)}
          />
          <StyledMenu
            id="simple-menu"
            anchorEl={anchorMenu}
            keepMounted
            open={Boolean(anchorMenu)}
            onClose={handleClose}
            className={classes.menu}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  value="1"
                />
              }
              label="Online"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  value="2"
                />
              }
              label="Meeting"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedC}
                  onChange={handleChange}
                  name="checkedC"
                  value="3"
                />
              }
              label="Traning"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedD}
                  onChange={handleChange}
                  name="checkedD"
                  value="4"
                />
              }
              label="Coding"
            />
          </StyledMenu>
        </span>
        <p className={classes.formatTime}>{FormatTime(timer)}</p>
        <div>
          {" "}
          {!isActive ? (
            <PlayCircleFilledIcon onClick={handleStart} fontSize="large" />
          ) : (
            <StopCircleIcon onClick={handleReset} fontSize="large" />
          )}
        </div>
      </div>
    </header>
  );
}
